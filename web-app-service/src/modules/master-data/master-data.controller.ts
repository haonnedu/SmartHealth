import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { MasterDataService } from './master-data.service';
import { UpdateMasterDataDto } from './dto/update-master-data.dto';
import { CreateMasterDataDto } from './dto/create-master-data.dto';
import { CreateSubDataDto } from './dto/create-sub-data.dto';
import { UpdateSubDataDto } from './dto/update-sub-master-data.dto';

@Controller('master-data')
export class MasterDataController {
  constructor(private readonly masterDataService: MasterDataService) {}

  @Post('/createMasterData')
  createMasterData(@Body() createMasterDatumDto: CreateMasterDataDto) {
    return this.masterDataService.createMasterData(createMasterDatumDto);
  }

  @Post('/createSubrData')
  createSubrData(@Body() createSubDataDto: CreateSubDataDto) {
    return this.masterDataService.createSubData(createSubDataDto);
  }

  @Get('/findMasterDataByFilterWithPaging')
  findMasterDataByFilterWithPaging(
    @Query('code') code: string,
    @Query('name') name: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.masterDataService.findMasterDataByFilterWithPaging(
      code,
      name,
      +page,
      +limit,
    );
  }

  @Get('/findSubMasterDataByFilterWithPaging')
  findSubMasterDataByFilterWithPaging(
    @Query('massterCode') massterCode: string,
    @Query('code') code: string,
    @Query('name') name: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.masterDataService.findSubMasterDataByFilterWithPaging(
      massterCode,
      code,
      name,
      +page,
      +limit,
    );
  }

  @Get('/findOneMasterDataByCode/:code')
  findOneMasterDataByCode(@Param('code') code: string) {
    return this.masterDataService.findMasterDataByCode(code);
  }

  @Get('/findSubDataByCode/:masterCode/:subCode')
  findSubDataByCode(
    @Param('masterCode') masterCode: string,
    @Param('subCode') subCode: string,
  ) {
    return this.masterDataService.findSubDataByCode(masterCode, subCode);
  }

  @Patch('/updateMasterDataByCode/:code')
  updateMasterDataByCode(
    @Param('code') code: string,
    @Body() updateMasterDatumDto: UpdateMasterDataDto,
  ) {
    return this.masterDataService.updateMasterDataByCode(
      code,
      updateMasterDatumDto,
    );
  }

  @Patch('/updateSubDataByCode/:code')
  updateSubDataByCode(
    @Param('masterCode') masterCode: string,
    @Param('subCode') subCode: string,
    @Body() updateSubDataCode: UpdateSubDataDto,
  ) {
    return this.masterDataService.updateSubDataByCode(
      masterCode,
      subCode,
      updateSubDataCode,
    );
  }
}
