import { Entity, Property, Unique } from '@mikro-orm/core';
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
  passwordHash!: string;

  @Property({ default: false })
  verified!: boolean;
}
