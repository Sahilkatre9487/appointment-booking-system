package com.appointment.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.appointment.dto.LoginRequestDto;
import com.appointment.dto.RegisterRequestDto;
import com.appointment.model.User;
import com.appointment.repository.UserRepository;

@Service
public class AuthService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public User register(RegisterRequestDto dto) {
		User user =new User();
		
		user.setName(dto.getName());
		user.setEmail(dto.getEmail());
		
		user.setPassword(passwordEncoder.encode(dto.getPassword()));
		
		user.setRole("USER");
		
		return userRepository.save(user);
	}
	public String login(LoginRequestDto dto) {

	    User user = userRepository.findByEmail(dto.getEmail())
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    if (!passwordEncoder.matches(dto.getPassword(),
	            user.getPassword())) {

	        throw new RuntimeException("Invalid Password");
	    }

	    return "Login Successful";
	}
	

}
