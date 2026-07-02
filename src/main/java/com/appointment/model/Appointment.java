package com.appointment.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="appointments")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Appointment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private LocalDate appointmentDate;

	private LocalTime appointmentTime;

	private String status;

	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;

	@ManyToOne
	@JoinColumn(name="service_id")
	private ServiceEntity service;

}
//hi
//Hell0