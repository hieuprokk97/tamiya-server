import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('identity', {
    type: 'bigint',
  })
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'int',
    nullable: true,
    default: 0,
  })
  score: number;
}
