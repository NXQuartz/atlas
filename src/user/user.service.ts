import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user';
import { ValidationException } from 'src/exceptions';
import { CreateUser, UserData } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async create(dto: CreateUser): Promise<UserData> {
    const { username, email, password } = dto;

    // Check if username exists
    const usernameFound = await this.userRepository.findOne({
      username: { $eq: username },
    });

    // Check if email exists
    const emailFound = await this.userRepository.findOne({
      email: { $eq: email },
    });

    if (usernameFound || emailFound) {
      throw new ValidationException({
        ...(usernameFound && { username: ['username is in use.'] }),
        ...(emailFound && { email: ['email is in use.'] }),
      });
    }

    const user = new User({
      username,
      email,
      password,
    });

    await this.userRepository.persistAndFlush(user);
    return new UserData(user);
  }
}
