import { User } from 'src/domain/entities/user.entity';
import { UserResponseDto } from '../dto/userResponse.dto';

export class UserResponseMapper {
  static userResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      profile: user.profile,
      active: user.active,
      unitId: user.unitId,
    };
  }
}
