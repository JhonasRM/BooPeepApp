import { User } from "../Entities/userEntities";

class MyUserService {
  private static instance: MyUserService;
  public user: User | null = null;

  private constructor() {}

  public static getInstance(): MyUserService {
    if (!MyUserService.instance) {
      MyUserService.instance = new MyUserService();
    }
    return MyUserService.instance;
  }

  public setUser(user: User): void {
    this.user = user;
  }

  public getUser(): User | null {
    return this.user;
  }

  public clearUser(): void {
    this.user = null;
  }
}

export default MyUserService;
