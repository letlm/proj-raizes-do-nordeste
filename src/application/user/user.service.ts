import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserRequestDto } from './dto/userRequest.dto';
import { User } from 'src/domain/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { TypeUser } from 'src/domain/enums/user.enum';
import { UserResponseMapper } from './mappers/userResponse.mapper';
import { UserResponseDto } from './dto/userResponse.dto';
import { UnitRepository } from 'src/domain/repositories/unit.repository';
import { UserUpdateDto } from './dto/userUpdate.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly unitRepository: UnitRepository,
  ) {}

  async create(dto: UserRequestDto): Promise<UserResponseDto> {
    await this.validEmailAvailable(dto.email);

    this.validUnitAndProfileCombination(dto.profile, dto.unitId);

    if (dto.unitId != null) {
      await this.unitExists(dto.unitId);
    }

    const passHash = await this.createHashPassword(dto.password);

    const user = new User({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      profile: dto.profile,
      passHash: passHash,
      unitId: dto.unitId,
    });

    const newUser = await this.repository.create(user);

    return UserResponseMapper.userResponse(newUser);
  }

  async findById(id: number): Promise<UserResponseDto> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return UserResponseMapper.userResponse(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.repository.findAll();

    return users.map((user) => UserResponseMapper.userResponse(user));
  }

  async update(id: number, dto: UserUpdateDto): Promise<UserResponseDto> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (dto.email && dto.email !== user.email) {
      await this.validEmailAvailable(dto.email, user);
    }

    const profile = dto.profile ?? user.profile;
    const unit = dto.unitId !== undefined ? dto.unitId : user.unitId;

    this.validUnitAndProfileCombination(profile, unit);

    if (dto.unitId !== undefined && dto.unitId !== null) {
      await this.unitExists(dto.unitId);
    }

    if (dto.unitId !== undefined) {
      user.unitId = dto.unitId;
    }

    if (dto.name !== undefined) {
      user.name = dto.name;
    }

    if (dto.email !== undefined) {
      user.email = dto.email;
    }

    if (dto.phone !== undefined) {
      user.phone = dto.phone;
    }

    if (dto.profile !== undefined) {
      user.profile = dto.profile;
    }

    if (dto.password) {
      user.passHash = await this.createHashPassword(dto.password);
    }

    const userUpdate = await this.repository.update(user);

    return UserResponseMapper.userResponse(userUpdate);
  }

  private validUnitAndProfileCombination(
    profile: TypeUser,
    unitId?: number | null,
  ): void {
    const profileWithoutUnit = this.isProfileWithoutUnit(profile);

    if (profileWithoutUnit && unitId != null) {
      throw new BadRequestException(
        'Não é possível cadastrar uma unidade para esse tipo de perfil.',
      );
    }

    if (!profileWithoutUnit && unitId == null) {
      throw new BadRequestException('É necessário informar uma unidade!');
    }
  }

  private isProfileWithoutUnit(profile: TypeUser): boolean {
    return profile === TypeUser.ADMIN || profile === TypeUser.CLIENTE;
  }

  private async unitExists(unitId: number): Promise<void> {
    const unit = await this.unitRepository.findById(unitId);

    if (!unit) {
      throw new NotFoundException('Unit não existe no sistema');
    }
  }

  private async createHashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return bcrypt.hash(password, salt);
  }

  private async validEmailAvailable(email: string, user?: User): Promise<void> {
    const userFind = await this.repository.findByEmail(email);

    if (userFind && userFind.id !== user?.id) {
      throw new ConflictException('Email já cadastrado');
    }
  }
}
