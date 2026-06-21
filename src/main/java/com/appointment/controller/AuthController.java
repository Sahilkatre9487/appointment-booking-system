package com.appointment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appointment.dto.LoginRequestDto;
import com.appointment.dto.RegisterRequestDto;
import com.appointment.model.User;
import com.appointment.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private AuthService authService;
	
	@PostMapping("/register")
	public User register(
			@RequestBody RegisterRequestDto dto) {
		return authService.register(dto);
	}
	@PostMapping("/login")
	public String login(
	        @RequestBody LoginRequestDto dto) {

	    return authService.login(dto);
	}

}
