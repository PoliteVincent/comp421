import { Module } from '@nestjs/common';
import { StudentController } from './students.controller';
import { StudentService } from './students.service';
import { DatabaseModule } from 'src/database/database.module';

// Custom Modules

@Module({
  imports: [DatabaseModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
