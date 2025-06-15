import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateMasterDataDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  masterDataCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  masterDataName: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(999)
  sortNo?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(20)
  subDataCodeLength: number;
}
