export interface Student {
  PID: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  role: "student" | "instructor" | "admin";
  email?: string;
  postId?: string;
}

export const students: Student[] = [
  {
    PID: "1",
    name: "John Doe",
    age: 40,
    role: "instructor",
    gender: "male",
    email: "JohnDoe@example.com",
  },
  {
    PID: "2",
    name: "Vincent Li",
    age: 21,
    role: "student",
    gender: "male",
    email: "vinceli@unc.edu",
  },
  {
    PID: "3",
    name: "Kyle Liu",
    age: 19,
    role: "admin",
    gender: "male",
    email: "yuzheliu@example.com",
  },
  {
    PID: "4",
    name: "Haoran Yang",
    role: "student",
    age: 22,
    gender: "male",
  },
  {
    PID: "5",
    name: "Emily Chen",
    age: 25,
    role: "student",
    gender: "female",
    email: "emchen@example.edu",
  },
  {
    PID: "6",
    name: "Michael Zhang",
    age: 35,
    role: "instructor",
    gender: "male",
    email: "mzhang@university.edu",
  },
  {
    PID: "7",
    name: "Sophia Wang",
    age: 20,
    role: "student",
    gender: "female",
    email: "swang@student.com",
  },
  {
    PID: "8",
    name: "Benjamin Lee",
    age: 28,
    role: "admin",
    gender: "male",
    email: "benjamin.lee@example.com",
  },
  {
    PID: "9",
    name: "Anna Taylor",
    age: 22,
    role: "student",
    gender: "female",
    email: "annataylor@example.com",
  },
  {
    PID: "10",
    name: "David Smith",
    age: 30,
    role: "instructor",
    gender: "male",
    email: "davidsmith@university.com",
  },
  {
    PID: "10",
    name: "David Smith",
    age: 30,
    role: "instructor",
    gender: "male",
    email: "davidsmith@university.com",
  },
  {
    PID: "10",
    name: "David Smith",
    age: 30,
    role: "instructor",
    gender: "male",
    email: "davidsmith@university.com",
  },
  {
    PID: "10",
    name: "David Smith",
    age: 30,
    role: "instructor",
    gender: "male",
    email: "davidsmith@university.com",
  },
  {
    PID: "10",
    name: "David Smith",
    age: 30,
    role: "instructor",
    gender: "male",
    email: "davidsmith@university.com",
  },
];
