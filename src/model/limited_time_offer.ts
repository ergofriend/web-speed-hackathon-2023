import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { Product } from './product';

@Entity()
export class LimitedTimeOffer {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product)
  product!: Relation<Product>;

  @Column('integer', { nullable: false })
  price!: number;

  @Column('text', { nullable: false })
  startDate!: string;

  @Column('text', { nullable: false })
  endDate!: string;
}
