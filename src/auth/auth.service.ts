import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-creds.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  signUp(authCredsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredsDto);
  }
}
