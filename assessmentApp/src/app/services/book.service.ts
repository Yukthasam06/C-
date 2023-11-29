import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly apiUrl: string = 'http://localhost:5002/api/books';

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  createBook(book: Book): Observable<any> {
    return this.http.post(`${this.apiUrl}`, book);
  }

  updateBook(id: number, updatedBook: Book): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedBook);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
