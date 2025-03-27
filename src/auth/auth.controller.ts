import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-creds.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredsDto);
  }
}
