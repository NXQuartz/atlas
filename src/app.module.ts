import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import configuration from './configuration';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        entities: ['./dist/entities'],
        entitiesTs: ['./src/entities'],
        clientUrl: config.get<string>('databaseUrl'),
        type: 'postgresql',
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
