import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  appointmentNo!: string;

  @ApiProperty()
  @IsDateString()
  appointmentDate!: string;

  @ApiProperty({ enum: ['Normal', 'Urgent'] })
  @IsEnum(['Normal', 'Urgent'])
  priority!: 'Normal' | 'Urgent';

  @ApiProperty({ type: [String] })
  @IsArray()
  specialist!: string[];

  @ApiProperty()
  @IsString()
  doctor!: string;

  @ApiProperty({ enum: ['Approved', 'Pending', 'Rejected'] })
  @IsEnum(['Approved', 'Pending', 'Rejected'])
  status!: 'Approved' | 'Pending' | 'Rejected';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  alternateAddress?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  userId?: string;
}
