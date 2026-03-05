import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponse } from '../interfaces/response.interface';
import { resolveRequestId } from '../utils/request-id.util';
import { Prisma } from 'generated/prisma/client';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const { status, code, message, details } = this.extractErrorInfo(exception);

    const errorResponse: ErrorResponse = {
      success: false,
      error: {
        code,
        message,
        ...(details && { details }),
      },
      meta: {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        requestId: resolveRequestId(
          request.headers['x-request-id'] as string | undefined,
        ),
      },
    };

    response.status(status).json(errorResponse);
  }

  private extractErrorInfo(exception: unknown): {
    status: number;
    code: string;
    message: string;
    details?: Record<string, unknown> | string[];
  } {
    if (exception instanceof Prisma.PrismaClientValidationError) {
      return {
        status: HttpStatus.BAD_REQUEST,
        code: 'VALIDATION_ERROR',
        message: 'Database validation error',
      };
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      let status = HttpStatus.BAD_REQUEST;
      let message = 'Database error';
      let code = 'DB_ERROR';

      switch (exception.code) {
        case 'P2002':
          status = HttpStatus.CONFLICT;
          message = 'Unique constraint failed';
          code = 'UNIQUE_CONSTRAINT_FAILED';
          break;
        case 'P2003':
          status = HttpStatus.BAD_REQUEST;
          message = 'Foreign key constraint failed';
          code = 'FOREIGN_KEY_CONSTRAINT_FAILED';
          break;
        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          message = 'Record not found';
          code = 'NOT_FOUND';
          break;
      }

      return {
        status,
        code,
        message,
        details: {
          prismaCode: exception.code,
          meta: exception.meta as Record<string, unknown>,
        },
      };
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        return {
          status,
          code: this.getErrorCode(status),
          message: exceptionResponse,
        };
      }

      const res = exceptionResponse as Record<string, unknown>;

      return {
        status,
        code: (res.error as string) || this.getErrorCode(status),
        message: this.extractMessage(res.message),
        details: Array.isArray(res.message) ? res.message : undefined,
      };
    }

    // Unhandled exceptions
    this.logger.error(
      'Unhandled exception',
      exception instanceof Error ? exception.stack : String(exception),
    );

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
    };
  }

  private extractMessage(message: unknown): string {
    if (typeof message === 'string') return message;
    if (Array.isArray(message)) {
      return (message[0] as string) || 'Validation failed';
    }
    return 'An error occurred';
  }

  private getErrorCode(status: number): string {
    const codes: Record<number, string> = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
      422: 'UNPROCESSABLE_ENTITY',
      429: 'TOO_MANY_REQUESTS',
      500: 'INTERNAL_SERVER_ERROR',
    };

    return codes[status] || 'ERROR';
  }
}
