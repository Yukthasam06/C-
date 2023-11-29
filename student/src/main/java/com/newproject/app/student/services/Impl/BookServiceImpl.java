package com.newproject.app.student.services.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newproject.app.student.models.Book;
import com.newproject.app.student.repositories.BookRepository;
import com.newproject.app.student.services.BookService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }

    @Override
    public Book createBook(Book book) {
        if (bookRepository.existsByIsbnNum(book.getIsbnNum())) {
            throw new IllegalArgumentException("A student with the same email already exists");
        }
        return bookRepository.save(book);
    }

    @Override
    public Book updateBook(Long id, Book updatedBook) {
        Book existingBook = getBookById(id);

        // Update existingStudent with values from updatedStudent
        existingBook.setTitle(updatedBook.getTitle());
        existingBook.setAuthor(updatedBook.getAuthor());
        existingBook.setIsbnNum(updatedBook.getIsbnNum());
        existingBook.setGenre(updatedBook.getGenre());
        existingBook.setPubYear(updatedBook.getPubYear());
        existingBook.setPublisher(updatedBook.getPublisher());
        existingBook.setCopies(updatedBook.getCopies());
        existingBook.setDescription(updatedBook.getDescription());

        // Save the updated student
        return bookRepository.save(existingBook);
    }

    @Override
    public void deleteBook(Long id) {

        // Check if the student exists before deleting
        getBookById(id);
        bookRepository.deleteById(id);
    }
}