import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/interfaces/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-detail-form',
  templateUrl: './book-detail-form.component.html',
  styleUrls: ['./book-detail-form.component.css']
})
export class BookDetailFormComponent {
  
      constructor(
        private formBuilder: FormBuilder,
        private bookService: BookService,
        @Inject(MAT_DIALOG_DATA) public data: {
          book: Book,
          buttonName: string,
          readonlyFields: {
            title?: boolean;
            author?: boolean;
            isbnNum?: boolean;
            genre?: boolean;
            pubYear?: boolean;
            publisher?: boolean;
            copies?: boolean;
            description?: boolean;
        
          }
        }
      ) { }
  
      textInputValidators = [Validators.required, Validators.maxLength(100)];
  
      bookForm = this.formBuilder.group({
        title: [this.data.book.title, this.textInputValidators],
        author: [this.data.book.author, this.textInputValidators],
        isbnNum: [this.data.book.isbnNum, Validators.required],
        genre: [this.data.book.genre, Validators.required],
        pubYear: [this.data.book.pubYear, Validators.required],
        publisher: [this.data.book.publisher, this.textInputValidators],
        copies: [this.data.book.copies, Validators.required],
        description: [this.data.book.description, Validators.required],
        
      });
  
      ngOnInit(): void {
      }
      
      onSubmit(): void {
  
        //const copiesControl = this.bookForm.get('copies') as AbstractControl<number | null, number | null>;

        const bookToAdd: Book = {
          id: this.data.book.id,
          title: this.bookForm.get('title')?.value || '',
          author: this.bookForm.get('author')?.value || '',
          isbnNum: this.bookForm.get('isbnNum')?.value || '',
          genre: this.bookForm.get('genre')?.value || '',
          pubYear: this.bookForm.get('pubYear')?.value || '',
          publisher: this.bookForm.get('publisher')?.value || '',
          copies: this.bookForm.get('copies')?.value || 0,
           description: this.bookForm.get('description')?.value || ''
        };
  
        console.log(bookToAdd);
  
        this.bookForm.reset();
      }
  }
  
  
  
