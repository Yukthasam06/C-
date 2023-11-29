package com.newproject.app.student.security;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetails user() {
        return User.withUsername("user")
                .password(bCryptPasswordEncoder().encode("password"))
                .roles("USER")
                .build();
    }

    @Bean
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                    .requestMatchers("/user/signup").permitAll()
                    .requestMatchers("/api/books").permitAll()
                    .requestMatchers("/api/books/*").permitAll()
            )
            .formLogin(Customizer.withDefaults()) // Enable form-based login

            // Customize login page and login processing URL for user
            .formLogin(login -> login
                .loginPage("/user/login") // URL for custom user login page
                .loginProcessingUrl("/perform_user_login") // URL for handling user login form submission
                .defaultSuccessUrl("/user/dashboard") // URL to redirect to upon successful user login
                .permitAll()
            )

            .logout(logout -> logout
                .permitAll()
            );

        http.csrf(csrf -> csrf.disable()); // Disable CSRF protection for simplicity; consider enabling it in production

        return http.build();
    }
}
