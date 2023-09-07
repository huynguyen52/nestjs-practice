import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Post {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column({ nullable: true })
  public week: number;
  @Column({ nullable: true })
  public month: number;
  @Column({ nullable: true })
  public quarter: number;
  @Column({ nullable: true })
  public year: number;
}
