import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import { ValidationException } from './exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[]) => {
        // Convert the errors to show errors per field.
        const errors = {};
        for (const e of validationErrors) {
          errors[e.property]
            ? errors[e.property].push(...Object.values(e.constraints))
            : (errors[e.property] = [...Object.values(e.constraints)]);
        }

        return new ValidationException(errors);
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Quartz Atlas')
    .setDescription('The quartz save storage server.')
    .setVersion('1.0')
    .addTag('atlas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  await app.listen(port);
  console.log(`Application is running on port: ${port}`);
}

bootstrap();
