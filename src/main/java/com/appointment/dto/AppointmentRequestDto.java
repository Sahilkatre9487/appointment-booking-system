package com.appointment.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentRequestDto {

    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private Long userId;
    private Long serviceId;
}
