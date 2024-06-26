import { router } from "expo-router";
import { userRepository } from "../../Data Access/Repository/userRepository";
import { GetOnStorage } from "../../Data Access/Storage/GetOnStorage";
import { User } from "../Entities/userEntities";

class UserPersistence {
  private static instance: UserPersistence;
  private uRepository: userRepository;
  public user: User | null = null;

  private constructor(){
    this.uRepository = new userRepository()
  }

  public static getInstance(): UserPersistence {
    if (!UserPersistence.instance) {
      UserPersistence.instance = new UserPersistence();
    }
    return UserPersistence.instance;
  }

  public setUser(user: User): void {
    this.user = user;
  }

  public async getUser(): Promise<User | null>{
    if(this.user === null){
      const email = await GetOnStorage('email');
      if(email.val === false){
        router.push('/')
      }
        const req = await this.uRepository.getUser(email.info, '');
        if (req.val === false){
          this.user = new User({})
        } else {
        const userData = req.data as User;
        const displayName = req.data.displayName as string;
        const GottenInfo = new User({ 
          displayName: displayName, 
          email: userData.email, 
          uid: userData.uid, 
          postID: userData.postID, 
          chatID: userData.chatID, 
          course: userData.course, 
          shift: userData.shift, 
          description: userData.description 
        });
        this.setUser(GottenInfo);  
      }    
      }
    return this.user;
  }

  public clearUser(): void {
    this.user = null;
  }
  public isLogged(): boolean{
    if(this.user = null){
      return false
    } else if(typeof this.user === "object"){
      return true
    }
    return false
  }
}

export default UserPersistence;
