import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;

  abstract findById(id: number): Promise<User | null>;

  abstract findAll(): Promise<User[]>;

  abstract update(user: User): Promise<User>;

  abstract findByEmail(email: string): Promise<User | null>;
}
