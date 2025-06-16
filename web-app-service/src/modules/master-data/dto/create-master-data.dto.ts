import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMasterDataDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  masterDataCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  masterDataName: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  sortNo?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  subDataCodeLength: number;
}
