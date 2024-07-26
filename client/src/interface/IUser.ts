
export interface IUser {
  email: string;
  username: string;
  password: string;
  profilpicture: string | null;
  bgpicture?: string | null;
  description?: string;
  followers?: [];
  following?: [];
  createdAt?: Date;
  updatedAt?: Date;
  token? : string;
  _id  : string;
}