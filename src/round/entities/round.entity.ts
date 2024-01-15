import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('round')
export class RoundEntity {
  @PrimaryGeneratedColumn('identity', {
    type: 'bigint',
  })
  id: string;

  @Column({
    type: String,
  })
  player1: string;

  @Column({
    type: String,
  })
  player2: string;

  @Column({
    type: String,
    nullable: true,
  })
  player3: string;
}
