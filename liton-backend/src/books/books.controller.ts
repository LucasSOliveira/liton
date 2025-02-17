// src/books/books.controller.ts
import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findPaginated(
    @Query('search') search: string = '',
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('orderBy') orderBy: keyof Book = 'title',
    @Query('order') order: 'ASC' | 'DESC' = 'ASC',
    @Query('lang') language: string = 'en',
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    return await this.booksService.findPaginatedAdvanced(
      search,
      pageNumber,
      limitNumber,
      orderBy,
      order,
      language,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    return this.booksService.findOne(id);
  }
}
