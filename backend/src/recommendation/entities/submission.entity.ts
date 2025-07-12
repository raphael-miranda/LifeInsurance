import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  age: number;

  @Column('float')
  income: number;

  @Column()
  dependents: number;

  @Column()
  riskTolerance: string;

  @Column()
  recommendation: string;

  @Column()
  explanation: string;

  @CreateDateColumn()
  createdAt: Date;
}
