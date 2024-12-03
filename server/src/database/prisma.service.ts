import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { prisma as globalPrisma } from 'src/lib/prisma';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly prisma: PrismaClient = globalPrisma;

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }

  get user() {
    return this.prisma.user;
  }

  async queryRaw<T = unknown>(query: string, ...parameters: any[]): Promise<T> {
    return this.prisma.$queryRawUnsafe<T>(query, ...parameters);
  }

  // Add a method for parameterized queries
  async queryRawSafe<T = unknown>(
    query: Prisma.Sql,
    ...parameters: any[]
  ): Promise<T> {
    return this.prisma.$queryRaw<T>(query, ...parameters);
  }

  // Can add a soft delete, logging, errorhandling methods here
}
