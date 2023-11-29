import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Book } from 'src/app/interfaces/Book';
import { BookService } from 'src/app/services/book.service';
import { BookDetailFormComponent } from '../book-detail-form/book-detail-form.component';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {            
   @Input() book!: Book;
  
    constructor(
      private matDialog: MatDialog,
      private bookService: BookService
    ) { }
  
    ngOnInit(): void {
    }
  
    onAddBook(): void {
      const dialogRef = this.openDialog();
      dialogRef.afterClosed().subscribe((result: Book) => {
        if (result) {
          this.addBook(result);
        }
      });
    }
  
    private openDialog(): MatDialogRef<any> {
      const book: Book = Object.assign({}, this.book);
      return this.matDialog.open(BookDetailFormComponent, {
        data: {
          book,
          buttonName: "Add Book",
          readonlyFields: {
            title: false,
            author: false,
            isbnNum: false,
            genre: false,
            pubYear: false,
            publisher: false,
            copies: false,
            description: false
          }
        }
      });
    }
  
    private addBook(result: Book): void {
      this.bookService.createBook(result)
        .subscribe();
    }
  }
  
