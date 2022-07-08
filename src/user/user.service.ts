import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { User } from 'src/entities/user';
import { CreateUserDto } from './dto';
import { UserRO } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserRO> {
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
      const errors = {
        ...(usernameFound && { username: 'Username is in use.' }),
        ...(emailFound && { email: 'Email is in use.' }),
      };

      throw new BadRequestException({
        message: 'Input data validation failed.',
        errors,
      });
    }

    const user = new User({
      username,
      email,
      password,
    });

    await this.userRepository.persistAndFlush(user);
    return this.buildUserRO(user);
  }

  /**
   * Build a public user response object
   *
   * @param user to build an object for
   * @param publicView is this being viewed publicly?
   * @returns user response object
   */
  private buildUserRO(user: User, publicView = false) {
    const userRO = {
      id: user.uuid,
      username: user.username,
      ...(!publicView && {
        email: user.email,
      }),
    };

    return { user: userRO };
  }
}
