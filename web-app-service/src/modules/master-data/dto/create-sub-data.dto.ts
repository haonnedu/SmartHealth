import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSubDataDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  masterDataCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subDataCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subDataName: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  sortNo?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  dataType?: string;
}
