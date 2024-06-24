import { router } from "expo-router";
import { Chat } from "../Entities/chatEntities";
import { Message } from "../Entities/messageEntities";
import { chatRepository } from "../../Data Access/Repository/chatRepository";
import { GetOnStorage } from "../../Data Access/Storage/GetOnStorage";
import { removeItemFromStorage } from "../../Data Access/Storage/removeItemFromStorage";
import SetOnStorage from "../../Data Access/Storage/SetOnStorage";

class ChatPersistence {
  private static instance: ChatPersistence;
  private ChatRepository: chatRepository;
  public chat: Chat | null = null;

  private constructor() {
    this.ChatRepository = new chatRepository();
  }

  public static getInstance(): ChatPersistence {
    if (!ChatPersistence.instance) {
      ChatPersistence.instance = new ChatPersistence();
    }
    return ChatPersistence.instance;
  }

  public setchat(chat: Chat): void {
    this.chat = chat;
  }
  public setChatID(chatID: string): void{
    removeItemFromStorage('chatID')
    SetOnStorage('chatID', chatID as string)
  }
  public async getChat(): Promise<Chat | null> {
    if (this.chat === null) {
      const chatid = await GetOnStorage("chatID");
      if (chatid.val === false) {
        router.push("/");
      }
      if (chatid.info === "") {
        const uid = await GetOnStorage("uid");
        const settingChat = await this.ChatRepository.setchat(uid.info);
        if (settingChat.val === false) {
          throw new Error(settingChat.erro as string);
        }
        const displayName = await GetOnStorage("displayName");
        const newMessage = new Message(
          uid.info,
          displayName.info,
          "",
          chatid.info
        );
        const chatData = new Chat(
          uid.info,
          settingChat.data as string,
          [newMessage],

        );
        removeItemFromStorage('chatID')
        SetOnStorage('chatID', settingChat.data as string)
        this.chat = chatData;
      }
      const req = await this.ChatRepository.getMessages(chatid.info);
      if (req.val === false) {
        throw new Error(req.erro as string);
      }
      const chatData = req.data as Chat;
      const GottenInfo = new Chat(
        chatData.uid,
        chatData.chatid,
        chatData.messages,

      );
      this.setchat(GottenInfo);
    }
    return this.chat;
  }

  public sendMessages(msg: Message){
    this.chat?.messages?.push(msg)
  }

  public clearChat(): void {
    this.chat = null;
  }
  public isLogged(): boolean {
    if ((this.chat = null)) {
      return false;
    } else if (typeof this.chat === "object") {
      return true;
    }
    return false;
  }
}

export default ChatPersistence;
