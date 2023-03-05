import { Column, Entity, OneToMany, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { FeatureItem } from './feature_item';

@Entity()
export class FeatureSection {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text', { nullable: false })
  title!: string;

  @OneToMany(() => FeatureItem, (item) => item.section)
  items!: Relation<FeatureItem[]>;
}
