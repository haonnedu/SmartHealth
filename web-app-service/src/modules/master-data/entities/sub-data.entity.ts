import { Column, Entity } from 'typeorm';

@Entity({ name: 'sub_master_data' })
export class SubData {
  @Column({
    length: 20,
    nullable: false,
    name: 'master_data_code',
  })
  masterDataCode: string;

  @Column({
    length: 20,
    nullable: false,
    name: 'sub_data_code',
  })
  subDataCode: string;

  @Column({
    length: 200,
    nullable: false,
    name: 'sub_data_name',
  })
  subDataName: string;

  @Column({ nullable: true, default: 0, name: 'sort_no' })
  sortNo: number;

  @Column({ nullable: true, name: 'data_type' })
  dataType: string;
}
