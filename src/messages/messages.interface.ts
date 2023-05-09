export interface MessagePayload {
    sender: number;
    receiver: number;
    message: string;
  }
  
  export interface UserId {
    id: number;
  }
  
  export interface PersonId {
    user: number;
  }
  
  export interface MessageSeenPayload {
    userId: number;
    messageId: number;
  }