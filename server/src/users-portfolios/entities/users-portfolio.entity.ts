import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users_portfolios',
})
export class UsersPortfolios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'integer',
  })
  userId: number;
}
