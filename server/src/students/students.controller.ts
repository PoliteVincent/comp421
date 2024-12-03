import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { StudentService } from './students.service';
import { Student } from './interfaces/student';
import { StudentDto } from './dto/student.dto';

@Controller('/students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async getStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  async getStudentById(@Param('id') id: string): Promise<Student> {
    return this.studentService.getStudentById(id);
  }

  @Post()
  async createStudent(@Body() studentDto: StudentDto): Promise<Student> {
    return this.studentService.createStudent(studentDto);
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: string): Promise<Student> {
    return this.studentService.deleteStudent(id);
  }

  @Put()
  async updateStudent(@Body() studentDto: StudentDto): Promise<Student> {
    return this.studentService.updateStudent(studentDto);
  }
}
