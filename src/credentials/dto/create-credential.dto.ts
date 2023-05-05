import { IsString } from 'class-validator';

export class CreateCredentialDto {
  @IsString()
  title: string;

  @IsString()
  url: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
