// Note: Can be used to setup services for different databases,
//       such as one for PostgreSQL and one for MongoDB.
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
