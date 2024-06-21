import { router } from "expo-router";
import { chatService } from "../API/chatService";
import { searchOnStorage} from "../../Data Access/Storage/GetOnStorage";
import { Chat } from "../Entities/chatEntities";
import { Message } from "../Entities/messageEntities";

class ChatPersistence {
  private static instance: ChatPersistence;
  private servicechat: chatService;
  public chat: Chat | null = null;

  private constructor(){
    this.servicechat = new chatService()
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
      const chatid = await searchOnStorage('chatID');
      if(chatid.val === false){
        router.push('/')
      }
        const req = await this.servicechat.getMessages(chatid.info);
        if (req.val === false){
          const uid = await searchOnStorage('uid')
          const settingChat = await this.servicechat.setchat(uid.info)
          if(settingChat.val === false){
            throw new Error(settingChat.erro as string)
          }
          const chatData = new Chat(uid.info, '', settingChat.data as string)
        } else {
        const chatData = req.data as Chat;
       
        const GottenInfo = new Chat(
         chatData.uid,
         chatData.chatid,
         chatData.messages
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