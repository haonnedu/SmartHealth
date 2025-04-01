import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './entity/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly repo: Repository<Appointment>,
  ) {}

  create(dto: CreateAppointmentDto) {
    const appointment = this.repo.create(dto);
    return this.repo.save(appointment);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
}
