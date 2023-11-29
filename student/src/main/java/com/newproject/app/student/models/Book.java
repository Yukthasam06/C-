package com.newproject.app.student.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Book {
    @Id
    @GeneratedValue
    private Long id;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	private String author;

	@Column(nullable = false)
	private String isbnNum;

	@Column(nullable = false)
	private String genre;

    @Column(nullable = false)
	private String pubYear;

	@Column(nullable = false)
	private String publisher;

	@Column(nullable = false)
	private int copies;

    @Column(nullable = false)
	private String description;
}
