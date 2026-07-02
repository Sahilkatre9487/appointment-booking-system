package com.appointment.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private static final SecretKey SECRET_KEY=
			Keys.hmacShaKeyFor(
					"mysecretkeymysecretkeymysecretkey12345"
					.getBytes());
	public String generateToken(String email) {

		return Jwts.builder()
			    .subject(email)
			    .issuedAt(new Date())
			    .expiration(
			    		new Date(System.currentTimeMillis()
			    				+1000 * 60 * 60 ))
			    .signWith(SECRET_KEY)
			    .compact();
	}
	public String extractEmail(String token) {
		return Jwts.parser()
				.verifyWith(SECRET_KEY)
				.build()
				.parseSignedClaims(token)
				.getPayload()
				.getSubject();
	}

}
