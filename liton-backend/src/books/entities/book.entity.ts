// src/books/entities/book.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['coverid'])
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  coverUrl: string | null;

  @Column({ type: 'varchar', nullable: true })
  author: string | null;

  @Column({ type: 'varchar', nullable: true })
  publishYear: number | null;

  @Column({ type: 'varchar', nullable: true })
  coverid: string | null;

  @Column({ type: 'double precision', default: 0 })
  rentalValue: number;

  @Column({ type: 'double precision', default: 0 })
  saleValue: number;
}
