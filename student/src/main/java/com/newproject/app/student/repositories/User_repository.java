package com.newproject.app.student.repositories;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newproject.app.student.models.Signup;

public interface User_repository extends JpaRepository<Signup, Long> {
    //Optional<Signup> findByUserName(String userName);
    Optional<Signup> findByEmail(String email);
}
