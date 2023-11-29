import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/interfaces/Book';
import { BookService } from 'src/app/services/book.service';
import { BookDetailFormComponent } from '../book-detail-form/book-detail-form.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  displayedColumns: string[] = ['serialNumber', 'title', 'author', 'isbnNum', 'genre', 'pubYear', 'publisher','copies', 'description','actions'];
  dataSource!: MatTableDataSource<Book>;
  book: any;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement)?.value;
    if (filterValue !== undefined) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
  constructor(private bookService: BookService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBookDetails();
  }

  getBookDetails() {
    this.bookService.getAllBooks().subscribe(
      (data) => {
        console.log("Books: ", data);
        this.books = data;
        
      },
      (error) => {
        console.error('Error fetching book details:', error);
      }
    );
  }
  editBook(book: Book): void {
    // Create a copy of the student data to avoid modifying the original object

    const bookCopy: Book = {
      id: book.id,
      title: book.title,
      author: book.author,
      isbnNum: book.isbnNum,
      genre: book.genre,
      pubYear: book.pubYear,
      publisher: book.publisher,
      copies: book.copies,
      description: book.description    };
    console.log(bookCopy);
    this.book=bookCopy;
    const dialogRef = this.dialog.open(BookDetailFormComponent, {
      data: {
      book: bookCopy,
       // itemActionTitle: 'Edit Student',
        buttonName: 'Update',
        readonlyFields: {
      title: false,
      author: false,
      isbnNum: false,
      genre: false,
      pubYear: false,
      publisher: false,
      copies: false,
      description: false,// Set readonly fields as needed
        },
   } });
  
    dialogRef.afterClosed().subscribe((result: Book) => {
      if (result) {
        this.updateBook(result);
        console.log(result);
       }
    });
  }

  deleteBook(book: Book): void {
    const confirmDelete = confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      this.bookService.deleteBook(book.id).subscribe(() => {
        // Reload student details after deleting a student
        this.getBookDetails();
      });
    }
  }

  private updateBook(updatedBook: Book): void {
    this.bookService.updateBook(this.book.id, updatedBook).subscribe(() => {
      // Reload student details after updating a student
      this.getBookDetails();
    });
  }


}
