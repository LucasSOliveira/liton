import { Injectable, NotFoundException } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { OpenLibraryService } from '../openlibrary/openlibrary.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    private openLibraryService: OpenLibraryService,
  ) {}

  async createBooksFromOpenLibrary(
    query: string,
    language: string,
    limit: number = 20,
  ): Promise<Book[]> {
    const docs = await this.openLibraryService.getBooks(query, language, limit);
    const savedBooks: Book[] = [];

    for (const doc of docs) {
      // Verifica se existe cover_i ou cover_edition_key; se nenhum existir, ignora o livro.
      if (!doc.cover_i && !doc.cover_edition_key) continue;

      // Usa cover_i se disponível; caso contrário, utiliza cover_edition_key.
      const coverid = doc.cover_i || doc.cover_edition_key;

      // Procura se o livro já existe no banco, usando o coverid obtido.
      const existingBook = await this.bookRepository.findOne({
        where: { coverid },
      });

      if (existingBook) {
        savedBooks.push(existingBook);
      } else {
        // Cria a URL da capa usando coverid
        const coverUrl = coverid
          ? `https://covers.openlibrary.org/b/id/${coverid}-L.jpg`
          : null;

        const bookData: Partial<Book> = {
          title: doc.title,
          coverUrl: coverUrl,
          author: doc.author_name ? doc.author_name.join(', ') : null,
          publishYear: doc.first_publish_year || null,
          coverid: coverid,
          rentalValue: Math.round((Math.random() * (15 - 3) + 3) * 100) / 100,
          saleValue: Math.round((Math.random() * (150 - 20) + 20) * 100) / 100,
        };

        const book = this.bookRepository.create(bookData);
        const saved = await this.bookRepository.save(book);
        savedBooks.push(Array.isArray(saved) ? saved[0] : saved);
      }
    }

    return savedBooks;
  }

  async createBooksFromCategory(
    category: string,
    limit: number = 20,
  ): Promise<Book[]> {
    const docs = await this.openLibraryService.getBooksByCategory(
      category,
      limit,
    );
    const savedBooks: Book[] = [];

    for (const doc of docs) {
      // Altera para aceitar cover_id ou cover_edition_key, se necessário
      if (!doc.cover_id && !doc.cover_edition_key) continue;

      const coverid = doc.cover_id || doc.cover_edition_key;

      const existingBook = await this.bookRepository.findOne({
        where: { coverid },
      });
      if (existingBook) {
        savedBooks.push(existingBook);
      } else {
        const coverUrl = coverid
          ? `https://covers.openlibrary.org/b/id/${coverid}-L.jpg`
          : null;
        const bookData: Partial<Book> = {
          title: doc.title,
          coverUrl: coverUrl,
          author: doc.authors
            ? doc.authors.map((a: any) => a.name).join(', ')
            : null,
          publishYear: doc.first_publish_year || null,
          coverid: coverid,
          rentalValue: Math.round((Math.random() * (15 - 3) + 3) * 100) / 100,
          saleValue: Math.round((Math.random() * (150 - 20) + 20) * 100) / 100,
        };

        const book = this.bookRepository.create(bookData);
        const saved = await this.bookRepository.save(book);
        savedBooks.push(Array.isArray(saved) ? saved[0] : saved);
      }
    }

    return savedBooks;
  }

  async findPaginatedAdvanced(
    search: string,
    page: number = 1,
    limit: number = 10,
    orderBy: keyof Book = 'id',
    order: 'ASC' | 'DESC' = 'ASC',
    language: string = 'en',
  ): Promise<{ data: Book[]; total: number }> {
    // Converte '+' para espaço (caso a string venha codificada)
    const decodedSearch = search.replace(/\+/g, ' ');
    const skip = (page - 1) * limit;

    // Define a condição de busca com a string decodificada
    let whereCondition: Record<string, any> = {};
    if (decodedSearch && decodedSearch.trim() !== '') {
      whereCondition = { title: ILike(`%${decodedSearch}%`) };
    }

    // Restante do código igual...
    const fetchResults = async () =>
      await this.bookRepository.findAndCount({
        where: whereCondition,
        order: { [orderBy]: order },
        skip,
        take: limit,
      });

    let [data, total] = await fetchResults();

    const maxAttempts = 1;
    let attempts = 0;
    while (data.length < limit && attempts < maxAttempts) {
      const required = limit - data.length;
      if (decodedSearch && decodedSearch.trim() !== '') {
        const queryForApi = decodedSearch.replace(/\s+/g, '+');
        const factor = attempts === 0 ? 4 : 2;
        await this.createBooksFromOpenLibrary(
          queryForApi,
          language,
          required * factor,
        );
      } else {
        const categories = ['fiction', 'romance', 'mystery', 'thriller'];
        const randomCategory =
          categories[Math.floor(Math.random() * categories.length)];
        await this.createBooksFromCategory(randomCategory, required);
      }
      [data, total] = await fetchResults();
      attempts++;
    }

    data.sort((a: any, b: any) => {
      if (a[orderBy] < b[orderBy]) return order === 'ASC' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === 'ASC' ? 1 : -1;
      return 0;
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }
}
