import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({
  name: 'portfolios',
})
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, ({ portfolios }) => portfolios)
  user: User;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  website: string;

  @Column({
    default: false,
  })
  hidden: boolean;

  @Column({
    type: 'blob',
  })
  file: Buffer;
}
