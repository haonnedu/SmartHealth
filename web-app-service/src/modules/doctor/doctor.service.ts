import { Injectable } from "@nestjs/common";
import { Doctor } from "./entity/doctor.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(Doctor)
        private readonly repo: Repository<Doctor>,
    ) {}

    // async createDoctor(createDoctorDto: CreateDoctorDto) {
    //     const doctor = this.repo.create(createDoctorDto);
    //     return this.repo.save(doctor);
    // }
    findBySpecialization(specialization: string) {
        return this.repo.find({ where: { specialization } });
    }
}