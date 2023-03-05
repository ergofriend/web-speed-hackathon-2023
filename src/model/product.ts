import { Column, Entity, OneToMany, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { LimitedTimeOffer } from './limited_time_offer';
import { ProductMedia } from './product_media';
import { Review } from './review';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text', { nullable: false })
  name!: string;

  @Column('integer', { nullable: false })
  price!: number;

  @Column('text', { nullable: false })
  description!: string;

  @OneToMany(() => ProductMedia, (media) => media.product)
  media!: Relation<ProductMedia[]>;

  @OneToMany(() => LimitedTimeOffer, (offer) => offer.product)
  offers!: Relation<LimitedTimeOffer[]>;

  @OneToMany(() => Review, (review) => review.product)
  reviews!: Relation<Review[]>;
}
