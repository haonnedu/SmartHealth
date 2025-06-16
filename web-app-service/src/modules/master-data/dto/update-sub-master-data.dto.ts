import { PartialType } from '@nestjs/swagger';
import { CreateSubDataDto } from './create-sub-data.dto';

export class UpdateSubDataDto extends PartialType(CreateSubDataDto) {}
