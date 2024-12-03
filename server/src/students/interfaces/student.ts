export interface Student {
  PID: string;
  name: string;
  age: number;
  gender: string;
  role: string;
  email?: string;
  postId?: Post[];
}
export interface Post {
  postId: string;
  title: string;
  content: string;
  authorId: string;
}
