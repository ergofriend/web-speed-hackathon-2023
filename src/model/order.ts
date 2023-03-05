import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { ShoppingCartItem } from './shopping_cart_item';
import { User } from './user';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => ShoppingCartItem, (item) => item.order)
  items!: Relation<ShoppingCartItem>[];

  @ManyToOne(() => User)
  user!: Relation<User>;

  @Column('text', { nullable: false })
  zipCode!: string;

  @Column('text', { nullable: false })
  address!: string;

  @Column('boolean', { nullable: false })
  isOrdered!: boolean;
}
