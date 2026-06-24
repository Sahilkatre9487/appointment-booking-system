package com.appointment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.appointment.dto.AppointmentRequestDto;
import com.appointment.model.Appointment;
import com.appointment.service.AppointmentService;
import org.springframework.web.bind.annotation.GetMapping;
@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping
    public Appointment saveAppointment(
            @RequestBody AppointmentRequestDto dto) {

        return appointmentService.saveAppointment(dto);
    }

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }
    
    @PutMapping("/{id}/approve")
    public Appointment approveAppointment(@PathVariable Long id) {
        return appointmentService.approveAppointment(id);
    }

    @PutMapping("/{id}/cancel")
    public Appointment cancelAppointment(@PathVariable Long id) {
        return appointmentService.cancelAppointment(id);
    }
    
    @GetMapping("/my")
    public List<Appointment>getMyAppointments(){
    	return appointmentService.getMyAppointment();
    }
   
}