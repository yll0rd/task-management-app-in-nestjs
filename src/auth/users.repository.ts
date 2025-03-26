import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
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
    await this.save(user);
  }
}
