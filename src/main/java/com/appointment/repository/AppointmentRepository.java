package com.appointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appointment.model.Appointment;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long>{
	List<Appointment> findByUserEmail(String email);
}
