import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  website: string;

  @IsOptional()
  @IsNotEmpty()
  hidden: boolean;

  @IsNotEmpty()
  dataURL: string;
}
