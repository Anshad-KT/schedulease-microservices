export interface UserData {
    email?: string;
    username?: string;

    
  }
  
  export class User {
    email?: string;
    username?: string;

  
    constructor({ email, username }: UserData) {
      this.username = username;
      this.email = email;

    }
  }
  