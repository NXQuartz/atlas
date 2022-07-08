import { BeforeCreate, Entity, Property, Unique } from '@mikro-orm/core';
import * as argon2 from 'argon2';
import { BaseEntity } from './base';

@Entity()
export class User extends BaseEntity {
  @Property({ length: 20 })
  @Unique()
  username!: string;

  @Property({ length: 254 })
  @Unique()
  email!: string;

  @Property({ length: 128 })
  password!: string;

  @Property({ default: false })
  verified!: boolean;

  /**
   * Hash the users password before inserting.
   * Don't call this manually.
   */
  @BeforeCreate()
  async hashPassword() {
    // Hash the password before inserting
    this.password = await argon2.hash(this.password);
  }

  public constructor(init: Partial<User>) {
    super();
    Object.assign(this, init);
  }
}
