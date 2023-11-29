package com.newproject.app.student.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newproject.app.student.models.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
    
    boolean existsByIsbnNum(String isbnNum);

}