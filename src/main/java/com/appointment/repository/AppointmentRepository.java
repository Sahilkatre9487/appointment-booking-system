package com.appointment.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appointment.model.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // User Appointments
    List<Appointment> findByUser_Email(String email);

    // Status
    List<Appointment> findByStatus(String status);

    // Date
    List<Appointment> findByAppointmentDate(LocalDate appointmentDate);

    // Service
    List<Appointment> findByServiceServiceName(String serviceName);

    // Dashboard Count
    long countByStatus(String status);

    // Prevent duplicate booking
    boolean existsByServiceIdAndAppointmentDateAndAppointmentTime(
            Long serviceId,
            LocalDate appointmentDate,
            LocalTime appointmentTime);

    // Provider Dashboard
    List<Appointment> findByProvider_User_Email(String email);

    // Provider + Status
    List<Appointment> findByProvider_User_EmailAndStatus(
            String email,
            String status);

    // Provider + Date
    List<Appointment> findByProvider_User_EmailAndAppointmentDate(
            String email,
            LocalDate appointmentDate);

}