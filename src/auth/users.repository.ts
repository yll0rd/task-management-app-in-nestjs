/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-creds.dto';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(authCredsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredsDto;
    const user = this.create({ username, password });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        //  duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
