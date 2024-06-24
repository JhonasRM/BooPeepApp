import { router } from "expo-router";
import { Chat } from "../Entities/chatEntities";
import { Message } from "../Entities/messageEntities";
import { chatRepository } from "../../Data Access/Repository/chatRepository";
import { GetOnStorage } from "../../Data Access/Storage/GetOnStorage";

class ChatPersistence {
  private static instance: ChatPersistence;
  private ChatRepository: chatRepository;
  public chat: Chat | null = null;

  private constructor(){
    this.ChatRepository = new chatRepository()
  }

  public static getInstance(): ChatPersistence {
    if (!ChatPersistence.instance) {
      ChatPersistence.instance = new ChatPersistence();
    }
    return ChatPersistence.instance;
  }

  public setchat(chat: Chat): void {
    this.chat= chat;
  }

  public async getChat(): Promise<Chat| null>{
    if(this.chat === null){
      const chatid = await GetOnStorage('chatID');
      if(chatid.val === false){
        router.push('/')
      }
        const req = await this.ChatRepository.getMessages(chatid.info);
        if (req.val === false){
          const uid = await GetOnStorage('uid')
          const settingChat = await this.ChatRepository.setchat(uid.info)
          if(settingChat.val === false){
            throw new Error(settingChat.erro as string)
          }
          const message = new Message(uid.info, '', '')
          const chatData = new Chat(uid.info, [message] , settingChat.data as string)
        } else {
        const chatData = req.data as Chat;
       
        const GottenInfo = new Chat(
         chatData.uid,
         chatData.messages,
         chatData.chatid
   );
   
   
        this.setchat(GottenInfo);  
      }    
      }
    return this.chat;
  }

  public clearChat(): void {
    this.chat = null;
  }
  public isLogged(): boolean{
    if(this.chat = null){
      return false
    } else if(typeof this.chat=== "object"){
      return true
    }
    return false
  }
}

export default ChatPersistence;