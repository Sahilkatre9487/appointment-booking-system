package com.appointment.security;

import java.io.IOException;


import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.appointment.repository.UserRepository;

import com.appointment.model.User;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;
    
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();

        return path.startsWith("/auth/")
                || path.startsWith("/swagger-ui/")
                || path.startsWith("/v3/api-docs");
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null
                && authHeader.startsWith("Bearer ")) {

            String token = authHeader.substring(7);

            try {
            	String email = jwtUtil.extractEmail(token);

            	User user = userRepository.findByEmail(email)
            	        .orElseThrow(() ->
            	                new RuntimeException("User not found"));

            	UsernamePasswordAuthenticationToken authentication =
            	        new UsernamePasswordAuthenticationToken(
            	                email,
            	                null,
            	                List.of(
            	                        new SimpleGrantedAuthority(
            	                                "ROLE_" + user.getRole())));

            	SecurityContextHolder.getContext()
            	        .setAuthentication(authentication);

            	System.out.println(
            	        "Authenticated User: " + email
            	        +"Role: "+
            	        		user.getRole());

            } catch (Exception e) {
                e.printStackTrace();
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }

        // VERY IMPORTANT
        filterChain.doFilter(request, response);
    }
}