import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthToken } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validate a user's password
   *
   * @param auth username or email
   * @param password account password
   * @return was the password valid for the user
   */
  async validateUser(auth: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      $or: [{ username: { $eq: auth } }, { email: { $eq: auth } }],
    });

    if (!user) return;
    if (await argon2.verify(user.password, password)) return user;
  }

  async login(user: User) {
    return new AuthToken(this.jwtService.sign({ sub: user.id }));
  }

  /**
   * Get database User object by ID.
   *
   * @param id of the user
   * @returns user object
   */
  async getUser(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }
}
