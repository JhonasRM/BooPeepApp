import { useState } from "react";
import { chatValidator } from "../../Service/Validators/chatValidator";
import { Chat } from "../../Service/Entities/chatEntities";
import { Message } from "../../Service/Entities/messageEntities";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import ChatPersistence from "../../Service/Persistence/chatPersistence";
import { GetOnStorage } from "../../Data Access/Storage/GetOnStorage";
import { chatRepository } from "../../Data Access/Repository/chatRepository";
import { router } from "expo-router";
import { ChatMessageHelper } from "../../utils/Helpers/ChatMessagesHelper";
import { removeItemFromStorage } from "../../Data Access/Storage/removeItemFromStorage";
import SetOnStorage from "../../Data Access/Storage/SetOnStorage";

const ChatStateController = () => {
  const ChatRepository = new chatRepository();
  const chatPersistence = ChatPersistence.getInstance();
  const getchat = async (): Promise<IReturnAdapter> => {
    console.log('entrou no getChat')
    try {
      const chatid = await GetOnStorage("chatID");
      const uid = await GetOnStorage("uid");
      if (chatid.val === false || chatid.info === "") {
        const settingChat = await ChatRepository.setchat(uid.info);
        if (settingChat.val === false) {
          throw new Error(settingChat.erro as string);
        }
        const chatData = new Chat(uid.info, settingChat.data.chatID as string);
        await chatPersistence.setchat(chatData)
        return { val: true, data: chatData };
      } else {
      const MyChat = new Chat(uid.info, chatid.info)
      const req = await ChatRepository.getMessages(MyChat.chatid as string);
      if (req.val === false) {
        throw new Error(req.erro as string);
      }
      const chatData = req.data as Chat;
      const GottenInfo = new Chat(
        chatData.uid,
        chatData.chatid,
        chatData.messages
      );
      return { val: true, data: GottenInfo };
    }
    } catch (error) {
      console.log("setchat respondeu com ERRO!");
      if (error instanceof Error) {
        if (error.message === "Unauthorized") {
          return { val: false, erro: error };
        } else if (error.message === "Bad Request") {
          return { val: false, erro: error };
        }
      }
      return { val: false, erro: "Internal Server Error" };
    }
  };

  const sendMessage = async (lastmsg: string): Promise<IReturnAdapter> => {
    try {
      const chatID = await GetOnStorage("chatID");
      const displayName = await GetOnStorage("name");
      const uid = await GetOnStorage("uid");
      if (
        chatID.val === false ||
        displayName.val === false ||
        uid.val === false
      ) {
        router.push("/");
      } 
      // if(chatID.info === ''){ 
      //   getchat()
      // }
      const newMessage = new Message(
        uid.info,
        displayName.info,
        lastmsg,
        chatID.info
      );
      chatPersistence.sendMessages(newMessage);
      const req = await ChatRepository.createmessage(newMessage);
      if (req.val === false) {
        throw new Error(req.erro as string);
      }
      return { val: true, data: "Mensagem Enviada com sucesso" };
    } catch (error) {
      console.log(error);
      return { val: false, erro: error as string };
    }
  };

  const readMessages = async (): Promise<IReturnAdapter> => {
    try {
      const chatID = await GetOnStorage("chatID");
      const uid = await GetOnStorage("uid");
      if (chatID.val === false || uid.val === false) {
        router.push("/");
      }
      const req = await ChatRepository.getMessages(chatID.info);
      if (req.val === false) {
        throw new Error(req.erro as string);
      }
      let MessagesUpdated: Message[] = [];
      const Messages = req.data as Message[];
      Messages.forEach((message: Message) => {
        const newMessage = new Message(
          message.UserID,
          message.displayName,
          message.lastmsg,
          message.chatid
        );
        MessagesUpdated.push(newMessage);
      });
      const chatUpdated = new Chat(uid.info, chatID.info, MessagesUpdated);
      chatPersistence.setchat(chatUpdated);
      return { val: true, data: chatUpdated };
    } catch (error) {
      console.log(error);
      return { val: false, erro: error as string };
    }
  };
  return {
    getchat,
    sendMessage,
    readMessages,
  };
};

export { ChatStateController };
