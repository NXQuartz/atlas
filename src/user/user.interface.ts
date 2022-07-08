export interface UserData {
  id: string;
  username: string;
  email: string;
}

export interface UserRO {
  user: UserData;
}
