import { Migration } from '@mikro-orm/migrations';

export class Migration20220707064920 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("uuid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" varchar(20) not null, "email" varchar(254) not null, "password_hash" varchar(128) not null, "verified" boolean not null default false);',
    );
    this.addSql(
      'alter table "user" add constraint "user_username_unique" unique ("username");',
    );
    this.addSql(
      'alter table "user" add constraint "user_email_unique" unique ("email");',
    );
    this.addSql(
      'alter table "user" add constraint "user_pkey" primary key ("uuid");',
    );
  }
}
