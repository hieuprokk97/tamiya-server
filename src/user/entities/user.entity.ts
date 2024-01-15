import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Entity('user')
export class UserEntity {
  @PrimaryColumn({
    type: 'bigint',
  })
  id: number;

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

  @Column({
    type: 'smallint',
    nullable: true,
    default: 0,
  })
  isChecked: number;

  @Column({
    type: 'smallint',
    nullable: true,
    default: 0,
  })
  isInFinal: number;

  @Column({
    type: 'varchar',
  })
  lowerName: string;
}
