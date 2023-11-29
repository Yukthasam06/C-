package com.newproject.app.student.services;

import java.util.List;

import com.newproject.app.student.models.Book;

public interface BookService {
    
    List<Book> getAllBooks();

    Book getBookById(Long id);

    Book createBook(Book book);

    Book updateBook(Long id, Book updatedBook);

    void deleteBook(Long id);
}
