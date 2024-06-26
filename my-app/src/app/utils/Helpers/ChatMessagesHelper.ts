import { router } from "expo-router";
import { GetOnStorage } from "../../Data Access/Storage/GetOnStorage";
import { Message } from "../../Service/Entities/messageEntities";

interface Props {
    message?: Message,
    uid?: string,
    text?: string
}
export class ChatMessageHelper {
  public readonly uid?: string;
  public text?: string;
  private message?: Message;
  constructor({message, uid, text}: Props) {
    if (message) {
      this.uid = message.UserID;
      this.text = message.lastmsg;
      this.message = message;
    }
    if (uid) {
      this.uid = uid;
    }
    if (text) {
      this.text = text;
    }
  }

  async getMessage() {
    if (this.message === undefined) {
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
      const newMessage = new Message(uid.info, displayName.info, this.text as string, chatID.info)
    }
    return this.message as Message;
  }
}
