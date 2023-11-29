package com.newproject.app.student.services.Impl;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.newproject.app.student.models.Login;
import com.newproject.app.student.models.Signup;
import com.newproject.app.student.repositories.User_repository;
import com.newproject.app.student.services.User_service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class User_impl implements User_service {

  @Autowired
  private User_repository user_repository;

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  @Override

  public Boolean Register(Signup data) {
    Optional<Signup> userOptional = user_repository.findByEmail(data.getEmail());
    if (userOptional.isPresent()) {
      return false;
    } else {
      String encryptedPassword = passwordEncoder.encode(data.getPassword());
      data.setPassword(encryptedPassword);
      user_repository.save(data);
      return true;
    }
  }

  @Override
  public String Login(Login data) {
    Optional<Signup> userOptional = user_repository.findByEmail(data.getEmail());

    if (userOptional.isPresent()) {
      Signup user = userOptional.get();

      if (passwordEncoder.matches(data.getPassword(), user.getPassword())) {
        String token = generateJWTToken(user);
        return token;
      }
    }
    return null;
  }

//   @Override
//   public Signup findByEmail(String email) {
//     Optional<Signup> User = user_repository.findByEmail(email);
//     if (User != null) {
//       Signup user = User.get();
//       return user;
//     }
//     return null;
//   }

  private String generateJWTToken(Signup user) {
    String secretKey = "husguasuVGU@4r7DTRDcvFTVtbc#$^6^^#cyvc";

    String token = Jwts.builder()
        .setSubject(user.getEmail())
        .claim("userId", user.getId())
        .claim("userName", user.getUserName())
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + 86400000))
        .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256)
        .compact();

    return token;
  }


//   @Override
//   public boolean emailExists(String email) {
//      Optional<Signup> User = user_repository.findByEmail(email);
//     if (User.isPresent()) {
//       return true;
//     }
//     return false;

//   }
}


