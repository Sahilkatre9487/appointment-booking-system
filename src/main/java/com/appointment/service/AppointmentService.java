package com.appointment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointment.dto.AppointmentRequestDto;
import com.appointment.model.Appointment;
import com.appointment.model.ServiceEntity;
import com.appointment.model.User;
import com.appointment.repository.AppointmentRepository;
import com.appointment.repository.ServiceRepository;
import com.appointment.repository.UserRepository;
@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    public Appointment saveAppointment(AppointmentRequestDto dto) {

        User user = userRepository.findById(dto.getUserId()).get();

        ServiceEntity service =
                serviceRepository.findById(dto.getServiceId()).get();

        Appointment appointment = new Appointment();

        appointment.setAppointmentDate(dto.getAppointmentDate());
        appointment.setAppointmentTime(dto.getAppointmentTime());
        appointment.setStatus("PENDING");
        appointment.setUser(user);
        appointment.setService(service);

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }
}