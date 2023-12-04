import { IsEmail, IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  personalWebsite?: string;
}
