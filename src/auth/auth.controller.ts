import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import CreateAuthDto from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: CreateAuthDto) {
    return await this.authService.signUp(body);
  }

  @Post('signin')
  async signin(@Body() body: CreateAuthDto) {
    return await this.authService.signIn(body);
  }
}
