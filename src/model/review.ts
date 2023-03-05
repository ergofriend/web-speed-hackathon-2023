import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { Product } from './product';
import { User } from './user';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text', { nullable: false })
  postedAt!: string;

  @ManyToOne(() => Product, (product) => product.reviews)
  product!: Relation<Product>;

  @ManyToOne(() => User, (user) => user.reviews)
  user!: Relation<User>;

  @Column('text', { nullable: false })
  comment!: string;
}
