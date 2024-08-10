export interface IComment{
  _id: string;
  content: string;
  userName: string | undefined;
  refreshFunc? : () => void
}