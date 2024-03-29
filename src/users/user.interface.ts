export interface UserInfo {
    full_name: string;
    display_name: string;
    friends: number[];
  }
  
  export interface BasicUserInfo {
    full_name: string;
    password: string;
    display_name: string;
    username: string;
    
  }
  
  export interface FriendsInfo {
    friends: number[];
  }