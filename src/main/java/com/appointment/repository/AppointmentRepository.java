package com.appointment.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appointment.model.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long>{
	List<Appointment> findByUserEmail(String email);

	List<Appointment> findByStatus(String status);

	List<Appointment> findByAppointmentDate(
	        LocalDate appointmentDate);
	List<Appointment> findByServiceServiceName(String serviceName);

	long countByStatus(String status);

	boolean existsByServiceIdAndAppointmentDateAndAppointmentTime(
	        Long serviceId,
	        LocalDate appointmentDate,
	        LocalTime appointmentTime);





}
