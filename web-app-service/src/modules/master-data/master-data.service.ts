import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMasterDataDto } from './dto/create-master-data.dto';
import { UpdateMasterDataDto } from './dto/update-master-data.dto';
import { ILike, Repository } from 'typeorm';
import { MasterData } from './entities/master-data.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SubData } from './entities/sub-data.entity';
import { CreateSubDataDto } from './dto/create-sub-data.dto';
import { UpdateSubDataDto } from './dto/update-sub-master-data.dto';

@Injectable()
export class MasterDataService {
  constructor(
    @InjectRepository(MasterData)
    private readonly masterDataRespository: Repository<MasterData>,
    @InjectRepository(SubData)
    private readonly subDataRespository: Repository<SubData>,
  ) {}

  async createMasterData(createMasterDatumDto: CreateMasterDataDto) {
    // Check if master data with the same code already exists
    const existingMasterData = await this.masterDataRespository.findOne({
      where: { masterDataCode: createMasterDatumDto.masterDataCode },
    });
    if (existingMasterData) {
      throw new BadRequestException(
        `Mã loại dữ liệu ${createMasterDatumDto.masterDataCode} đã tồn tại.`,
      );
    }
    const masterData = this.masterDataRespository.create(createMasterDatumDto);
    return this.masterDataRespository.save(masterData);
  }

  createSubData(createSubDataDto: CreateSubDataDto) {
    const subMasterData = this.subDataRespository.create(createSubDataDto);
    return this.subDataRespository.save(subMasterData);
  }

  async findMasterDataByFilterWithPaging(
    code: string,
    name: string,
    page: number,
    limit: number,
  ): Promise<{
    items: MasterData[];
    totalItems: number;
    page: number;
    limit: number;
  }> {
    if (!page) page = 1;
    if (!limit) limit = 20;
    if (!code) code = '';
    if (!name) name = '';

    const [data, total] = await this.masterDataRespository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { sortNo: 'ASC' },
      where: {
        masterDataCode: ILike(`%${code}%`),
        masterDataName: ILike(`%${name}%`),
      },
    });

    return {
      items: data,
      totalItems: total,
      page,
      limit,
    };
  }

  async findSubMasterDataByFilterWithPaging(
    masterCode: string,
    code: string,
    name: string,
    page: number,
    limit: number,
  ): Promise<{
    items: SubData[];
    totalItems: number;
    page: number;
    limit: number;
  }> {
    if (!masterCode) {
      throw new BadRequestException(`Master Code is Required.`);
    }

    if (!page) page = 1;
    if (!limit) limit = 20;
    if (!code) code = '';
    if (!name) name = '';

    const [data, total] = await this.subDataRespository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { sortNo: 'ASC' },
      where: {
        masterDataCode: masterCode,
        subDataCode: ILike(`%${code}%`),
        subDataName: ILike(`%${name}%`),
      },
    });

    return {
      items: data,
      totalItems: total,
      page,
      limit,
    };
  }

  findMasterDataByCode(code: string) {
    return this.masterDataRespository.findOne({
      where: { masterDataCode: code },
    });
  }

  findSubDataByCode(masterCode: string, subCode: string) {
    return this.subDataRespository.findOne({
      where: { masterDataCode: masterCode, subDataCode: subCode },
    });
  }

  async updateMasterDataByCode(
    code: string,
    updateMasterDatumDto: UpdateMasterDataDto,
  ) {
    const masterData = await this.masterDataRespository.preload({
      masterDataCode: code,
      ...updateMasterDatumDto,
    });
    if (!masterData) {
      throw new NotFoundException(`Master Data with code ${code} is not found`);
    }
    return this.masterDataRespository.save(masterData);
  }

  async updateSubDataByCode(
    masterCode: string,
    subCode: string,
    updateSubDataDto: UpdateSubDataDto,
  ) {
    const subData = await this.subDataRespository.preload({
      masterDataCode: masterCode,
      subDataCode: subCode,
      ...updateSubDataDto,
    });
    if (!subData) {
      throw new NotFoundException(
        `Sub Data with Master Code ${masterCode} and Sub Code ${subCode} is not found`,
      );
    }
    return this.subDataRespository.save(subData);
  }
}
