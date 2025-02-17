import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OpenLibraryService {
  private readonly baseUrl = 'https://openlibrary.org';

  /**
   * Busca livros na Open Library.
   * @param query Termo de pesquisa.
   * @param language Código do idioma (por exemplo, 'en', 'pt', 'es').
   * @param limit Quantidade de resultados
   */
  async getBooks(
    query: string,
    language: string,
    limit?: number,
  ): Promise<any[]> {
    console.log('chamou na openlibrary search');
    const params = new URLSearchParams();

    if (query && query.trim() !== '') {
      // Formata a query para que busque pelo título conforme o formato descoberto:
      // Exemplo: "title:carta+entre+amigos"
      const formattedQuery = `title:${query.replace(/\s+/g, '+')}`;
      params.append('q', formattedQuery);
    }

    if (language && language.trim() !== '') {
      params.append('lang', language);
    }

    if (limit && limit > 0) {
      params.append('limit', limit.toString());
    }

    // Garante que o modo de busca seja "everything"
    params.append('mode', 'everything');

    const url = `${this.baseUrl}/search.json?${params.toString()}`;
    try {
      const response: any = await axios.get(url);
      if (response.status === 200) {
        return response.data.docs;
      } else {
        throw new Error(`Failed to fetch books: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(
        `Error fetching books from Open Library: ${error.message}`,
      );
    }
  }

  async getBooksByCategory(
    category: string,
    limit: number = 20,
  ): Promise<any[]> {
    const encodedCategory = encodeURIComponent(category);
    const url = `${this.baseUrl}/subjects/${encodedCategory}.json?limit=${limit}`;
    console.log('chamou na openlibrary category');
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        return response.data.works;
      } else {
        throw new Error(
          `Failed to fetch books by category: ${response.statusText}`,
        );
      }
    } catch (error) {
      throw new Error(
        `Error fetching books by category from Open Library: ${error.message}`,
      );
    }
  }
}
