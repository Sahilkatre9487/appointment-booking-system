package com.appointment.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.appointment.security.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config)
            throws Exception {

        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            .cors(cors -> {})
            .csrf(csrf -> csrf.disable())

            .sessionManagement(session ->
                    session.sessionCreationPolicy(
                            SessionCreationPolicy.STATELESS))

            .authorizeHttpRequests(auth -> auth
                    .requestMatchers(
                            "/auth/**")
                    .permitAll()

                    .requestMatchers(
                            "/swagger-ui/**",
                            "/v3/api-docs/**",
                            "/v3/api-docs")
                    .permitAll()

                    .requestMatchers("/users/**")
                    .hasRole("ADMIN")
                    
                    .requestMatchers("/services/public")
                    .permitAll()
                    .requestMatchers("/services")
                    .hasAnyRole("USER", "ADMIN")

                    .requestMatchers("/services/**")
                    .hasRole("ADMIN")
                    
                 // Provider Registration (Public)
                    .requestMatchers("/providers/register")
                    .permitAll()

                    // Public Provider List
                    .requestMatchers("/providers/approved")
                    .permitAll()

                    // Provider Dashboard
                    .requestMatchers("/providers/dashboard/**")
                    .hasRole("PROVIDER")

                    // Admin manages providers
                    .requestMatchers(
                            "/providers/pending",
                            "/providers/*/approve",
                            "/providers/*/reject"
                    )
                    .hasRole("ADMIN")

                    // Provider APIs
                    .requestMatchers("/providers/**")
                    .hasAnyRole("PROVIDER", "ADMIN")

                    .requestMatchers(
                            "/appointments",
                            "/appointments/my"
                    )
                    .hasRole("USER")

                    .requestMatchers(
                            "/appointments/provider/**"
                    )
                    .hasRole("PROVIDER")

                    .requestMatchers(
                            "/appointments/dashboard"
                    )
                    .hasRole("ADMIN")
                    
                    
                    .requestMatchers(
                            "/appointments/admin/**",
                            "/appointments/export/**",
                            "/appointments/search/**",
                            "/appointments/status/**",
                            "/appointments/date/**",
                            "/appointments/page",
                            "/appointments/service/**",
                            "/appointments/{id}",
                            "/appointments/{id}/approve",
                            "/appointments/{id}/cancel"
                    )
                    .hasRole("ADMIN")
//                    .requestMatchers("/appointments")
//                    .hasAnyRole("USER", "ADMIN")
//
//                    .requestMatchers("/appointments/my")
//                    .hasAnyRole("USER", "ADMIN")
//
//                    .requestMatchers("/appointments/**")
//                    .hasRole("ADMIN")

                    .anyRequest()
                    .authenticated())

            .addFilterBefore(
                    jwtAuthenticationFilter,
                    UsernamePasswordAuthenticationFilter.class)

            ;

        return http.build();
    }
}