import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@ApiTags('Appointment')
@ApiBearerAuth()
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() dto: CreateAppointmentDto) {
    return this.appointmentService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAppointmentDto) {
    return this.appointmentService.update(+id, dto);
  }

  @Get()
  findAll(
    @Query('userId') userId: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.appointmentService.findByFilterWithPaging(
      userId,
      +page,
      +limit,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }
}
