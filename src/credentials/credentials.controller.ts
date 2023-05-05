import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { LoggedUser } from 'src/decorators/user.decorator';
import { User } from '@prisma/client';

@Controller('credentials')
@UseGuards(AuthGuard)
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  create(@LoggedUser() user: User, @Body() body: CreateCredentialDto) {
    return this.credentialsService.create(user, body);
  }

  @Get()
  findAll(@LoggedUser() user: User) {
    return this.credentialsService.findAll(user);
  }

  @Get(':id')
  findOne(@LoggedUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.credentialsService.findOne(id, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @LoggedUser() user: User) {
    return this.credentialsService.remove(id, user);
  }
}
