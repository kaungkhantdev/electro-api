import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './users.service';
import { USER_REPOSITORY } from './repositories/users.repository.interface';
import { AdminUsersController } from './admin.users.controller';

@Module({
  controllers: [AdminUsersController],
  providers: [
    UsersService,
    {
      provide: USER_REPOSITORY,
      useClass: UsersRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
