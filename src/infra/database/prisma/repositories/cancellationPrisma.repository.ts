import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CancellationRepository } from 'src/domain/repositories/cancellation.repository';
import { Cancellation } from 'src/domain/entities/cancellation.entity';
import { CancellationPrismaMapper } from '../mappers/cancellationPrisma.mapper';

@Injectable()
export class CancellationPrismaRepository extends CancellationRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(newCancel: Cancellation): Promise<Cancellation> {
    const cancel = await this.prisma.cancellation.create({
      data: CancellationPrismaMapper.toSave(newCancel),
    });

    return CancellationPrismaMapper.toDomain(cancel);
  }

  async findById(id: number): Promise<Cancellation | null> {
    const cancel = await this.prisma.cancellation.findUnique({
      where: { id },
    });

    return cancel ? CancellationPrismaMapper.toDomain(cancel) : null;
  }

  async findAll(): Promise<Cancellation[]> {
    const cancels = await this.prisma.cancellation.findMany();

    return cancels.map(CancellationPrismaMapper.toDomain);
  }

  async update(id: number, cancelUpdate: Cancellation): Promise<Cancellation> {
    const cancel = await this.prisma.cancellation.update({
      where: {
        id: id,
      },
      data: CancellationPrismaMapper.toSave(cancelUpdate),
    });

    return CancellationPrismaMapper.toDomain(cancel);
  }
}
