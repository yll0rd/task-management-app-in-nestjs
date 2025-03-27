import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-creds.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  signUp(authCredsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredsDto);
  }

  async signIn(authCredsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredsDto;
    const user = await this.usersRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'Success';
    } else
      throw new UnauthorizedException('Please check your login credentials');
  }
}
