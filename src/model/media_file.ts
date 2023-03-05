import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['filename'])
export class MediaFile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text', { nullable: false })
  filename!: string;
}
