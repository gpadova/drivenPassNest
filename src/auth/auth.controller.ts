import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import CreateAuthDto from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: CreateAuthDto): string {
    return this.authService.signUp(body);
  }

  @Post('signin')
  signin(@Body() body: CreateAuthDto): string {
    return this.authService.signIn(body);
  }
}
