import { router } from "expo-router";
import { userRepository } from "../../Data Access/Repository/userRepository";
import { GetOnStorage } from "../../Data Access/Storage/GetOnStorage";
import { User } from "../Entities/userEntities";
import { PostFeed } from "../../utils/types/PostFeed";
import { Post } from "../Entities/postEntities";

class FeedPersistence {
  private static instance: FeedPersistence;
  private uRepository: userRepository;
  public posts: PostFeed[] | null = null

  private constructor(){
    this.uRepository = new userRepository()
  }

  public static getInstance(): FeedPersistence {
    if (!FeedPersistence.instance) {
      FeedPersistence.instance = new FeedPersistence();
    }
    return FeedPersistence.instance;
  }

  public setPosts(posts: PostFeed[]): void {
    this.posts = posts
  }

  public async getPosts(posts: Post[]): Promise<PostFeed[] | null>{
    if(this.posts === null){
      let postsFeed: PostFeed[] = [] 
      posts.forEach(async(post: Post) => {
        const reqUser = await this.uRepository.getUserByUID(post.UserID)
        if(reqUser.val === false){
            throw new Error(reqUser.erro as string)
        }
        const userData = reqUser.data as User
        const newUser = new User({
            displayName: reqUser.data.displayName,
            course: userData.course,
            shift: userData.shift
        })
        const postFeed: PostFeed = {
            name: newUser.name,
            nickname: newUser.nickname,
            course: newUser.course,
            shift: newUser.shift,
            description: post.description,
            local: post.local,
            status: post.status,
            createdAt: post.createdAt
        }
        postsFeed.push(postFeed)
      })
      this.posts = postsFeed
    }

    return this.posts;
}

  public clearUser(): void {
    this.posts = null;
  }
}

export default FeedPersistence;
