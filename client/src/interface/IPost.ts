
export interface IPost {
  id: string;
  content: string;
  image?: string;
  like:  [];
  repost?:  [];
  share?:  [];
  userId?: string;
  userPic?: string;
  userName?: string;
  createdAt?: string;
  updatedAt?: Date;
}