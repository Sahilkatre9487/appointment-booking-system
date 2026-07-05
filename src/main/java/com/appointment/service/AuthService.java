package com.appointment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.appointment.dto.LoginRequestDto;
import com.appointment.dto.LoginResponseDto;
import com.appointment.dto.RegisterRequestDto;
import com.appointment.model.User;
import com.appointment.repository.UserRepository;
import com.appointment.security.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ===========================
    // REGISTER
    // ===========================
    public User register(RegisterRequestDto dto) {

        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        // Default role = USER
        if (dto.getRole() == null || dto.getRole().isBlank()) {
            user.setRole("USER");
        } else {
            user.setRole(dto.getRole().toUpperCase());
        }

        return userRepository.save(user);
    }

    // ===========================
    // LOGIN
    // ===========================
    public LoginResponseDto login(LoginRequestDto dto) {

        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(
                dto.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid Password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponseDto(
                token,
                user.getRole()
        );
    }
}