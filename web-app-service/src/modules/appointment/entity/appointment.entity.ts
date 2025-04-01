import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  appointmentNo!: string;

  @Column({ type: 'timestamptz' })
  appointmentDate!: Date;

  @Column()
  priority!: 'Normal' | 'Urgent';

  @Column('text', { array: true })
  specialist!: string[]; // VD: ['Cardiologists', 'Gastroenterologists']

  @Column()
  doctor!: string; // VD: 'Amit Singh (9009)'

  @Column()
  status!: 'Approved' | 'Pending' | 'Rejected';

  @Column({ nullable: true })
  message?: string;

  @Column({ name: 'alternate_address', nullable: true })
  alternateAddress?: string;
}
