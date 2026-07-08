package com.appointment.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentRequestDto {
	
	
    private Long serviceId;
    private Long providerId;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    
}
