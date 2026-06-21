package com.appointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appointment.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long>{

}
