export interface User {
  id: string;
  firstname?: string;
  lastname?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  password?: string;
}

export interface Account {}
