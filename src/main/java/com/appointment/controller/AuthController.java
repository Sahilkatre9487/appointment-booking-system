package com.appointment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.appointment.dto.LoginRequestDto;
import com.appointment.dto.LoginResponseDto;
import com.appointment.dto.RegisterRequestDto;
import com.appointment.model.User;
import com.appointment.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    // ===========================
    // REGISTER (USER / PROVIDER)
    // ===========================
    @PostMapping("/register")
    public User register(@Valid @RequestBody RegisterRequestDto dto) {
        return authService.register(dto);
    }

    // ===========================
    // LOGIN
    // ===========================
    @PostMapping("/login")
    public LoginResponseDto login(@Valid @RequestBody LoginRequestDto dto) {
        return authService.login(dto);
    }
}