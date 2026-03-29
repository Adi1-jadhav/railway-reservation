package com.railway.auth.service;

import com.railway.auth.entity.User;
import com.railway.auth.repository.UserRepository;
import com.railway.auth.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtils jwtUtils;

    public String saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null) {
            user.setRole("ROLE_USER");
        }
        repository.save(user);
        return "user added to the system";
    }

    public String generateToken(String username) {
        return jwtUtils.generateToken(username);
    }

    public void validateToken(String token) {
        jwtUtils.validateToken(token);
    }
}
