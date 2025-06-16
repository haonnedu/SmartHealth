import { PartialType } from '@nestjs/swagger';
import { CreateMasterDataDto } from './create-master-data.dto';

export class UpdateMasterDataDto extends PartialType(CreateMasterDataDto) {}
