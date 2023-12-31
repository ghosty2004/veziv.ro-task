import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Portfolio } from './portfolio.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  hashedPassword: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  personalWebsite: string | null;

  @OneToMany(() => Portfolio, ({ user }) => user)
  portfolios: Portfolio[];
}
