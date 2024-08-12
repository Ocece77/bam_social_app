export interface IComment{
  _id?: string;
  content: string;
  userName: string | undefined;
  userId?: string;
  userPic?: string;
  like?:  [];
  repost?: [];
  commentForId: string;
  createdAt?: string;
  updatedAt?: Date;
  refreshFunc? : () => void
}