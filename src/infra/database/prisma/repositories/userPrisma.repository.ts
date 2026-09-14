import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { User } from 'src/domain/entities/user.entity';
import { UserPrismaMapper } from '../mappers/userPrisma.mapper';

@Injectable()
export class UserPrismaRepository extends UserRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(newUser: User): Promise<User> {
    const user = await this.prisma.user.create({
      data: UserPrismaMapper.toSave(newUser),
    });

    return UserPrismaMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user ? UserPrismaMapper.toDomain(user) : null;
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user ? UserPrismaMapper.toDomain(user) : null;
  }

  async findAll(): Promise<User[]> {
    const registros = await this.prisma.user.findMany();

    return registros.map(UserPrismaMapper.toDomain);
  }

  async update(userUpdate: User): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id: userUpdate.id,
      },
      data: UserPrismaMapper.toSave(userUpdate),
    });

    return UserPrismaMapper.toDomain(user);
  }
}
