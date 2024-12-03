import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Student } from './interfaces/student';
import { Prisma } from '@prisma/client';
import { StudentDto } from './dto/student.dto';

@Injectable()
export class StudentService {
  constructor(private prismaService: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getAllStudents(): Promise<Student[]> {
    return await this.prismaService.queryRaw('SELECT * FROM "User";');
  }

  async getStudentById(pid: string): Promise<Student> {
    return await this.prismaService.queryRawSafe(
      Prisma.sql`SELECT * FROM "User" WHERE "PID" = ${pid}`,
    );
  }

  async createStudent(student: StudentDto): Promise<Student> {
    const studentData: Student = {
      PID: student.PID,
      name: student.name,
      gender: student.gender,
      email: student.email,
      age: student.age,
      role: student.role || 'student',
    };

    const query = Prisma.sql`
    INSERT INTO "User" ("PID", "name", "gender", "email", "age", "role")
    VALUES (${studentData.PID}, ${studentData.name}, ${studentData.gender}, ${studentData.email}, ${studentData.age}, ${studentData.role})
  `;

    await this.prismaService.queryRawSafe(query);
    return studentData;
  }

  async updateStudent(student: StudentDto): Promise<Student> {
    const studentData: Student = {
      PID: student.PID,
      name: student.name,
      gender: student.gender,
      email: student.email,
      age: student.age,
      role: student.role || 'student',
    };

    const query = Prisma.sql`
      UPDATE "User"
      SET 
        "name" = ${studentData.name},
        "gender" = ${studentData.gender},
        "email" = ${studentData.email},
        "age" = ${studentData.age},
        "role" = ${studentData.role}
      WHERE 
        "PID" = ${studentData.PID}
    `;

    await this.prismaService.queryRawSafe(query);
    return studentData; // Return the updated student data
  }

  async deleteStudent(pid: string): Promise<Student | null> {
    // Check if the student exists
    const student = await this.getStudentById(pid);
    if (!student) {
      throw new Error(`Student with PID ${pid} not found.`);
    }

    // Delete the student
    const query = Prisma.sql`
      DELETE FROM "User" WHERE "PID" = ${pid}
    `;
    await this.prismaService.queryRawSafe(query);

    // Return the deleted student's details
    return student;
  }
}
