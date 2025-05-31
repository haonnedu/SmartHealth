import { Column, Entity } from 'typeorm';

@Entity({ name: 'master_data' })
export class MasterData {
  @Column({
    primary: true,
    length: 20,
    nullable: false,
    name: 'master_data_code',
  })
  masterDataCode: string;

  @Column({ length: 200, nullable: false, name: 'master_data_name' })
  masterDataName: string;

  @Column({ nullable: true, default: 0, name: 'sort_no' })
  sortNo: number;

  @Column({ nullable: true, default: 20, name: 'sub_data_code_length' })
  subDataDataCodeLength: number;
}
