import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './entity/appointment.entity';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

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

  async update(id: number, dto: UpdateAppointmentDto) {
    const appointment = await this.repo.preload({ id: id, ...dto });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} is not found`);
    }
    return this.repo.save(appointment);
  }

  findAll() {
    return this.repo.find();
  }

  async findByFilterWithPaging(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{
    data: Appointment[];
    totalItems: number;
    page: number;
    limit: number;
  }> {
    if (!page) page = 1;
    if (!limit) limit = 20;

    const [data, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { appointmentDate: 'DESC' },
      where: {
        userId: userId,
      },
    });

    return {
      data,
      totalItems: total,
      page,
      limit,
    };
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
}
