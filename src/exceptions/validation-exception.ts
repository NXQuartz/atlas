import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(errors: Record<string, string[]>) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Input data validation failed.',
        errors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
