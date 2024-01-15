import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('races')
export class RacesEntity {
  @PrimaryGeneratedColumn('identity', {
    type: 'bigint',
  })
  id: string;

  @Column({
    type: 'int',
    nullable: true,
    default: 0,
  })
  round: number;

  @Column({
    type: 'int',
    nullable: true,
    default: 3,
  })
  numberOfLaps: number;

  @Column({
    type: 'int',
    nullable: true,
    default: 0,
  })
  semiFinal: number;

  @Column({
    type: String,
    nullable: true,
    default: [],
  })
  members: string[];
}
