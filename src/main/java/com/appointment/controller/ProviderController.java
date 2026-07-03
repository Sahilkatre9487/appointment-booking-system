package com.appointment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.appointment.dto.DashboardDto;
import com.appointment.model.Appointment;
import com.appointment.service.AppointmentService;

@RestController
@RequestMapping("/provider")
public class ProviderController {

    @Autowired
    private AppointmentService appointmentService;

    // GET PROVIDER APPOINTMENTS
    @GetMapping("/appointments")
    public List<Appointment> getProviderAppointments() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        return appointmentService.getProviderAppointments(email);
    }

    // PROVIDER DASHBOARD
    @GetMapping("/dashboard")
    public DashboardDto getProviderDashboard() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        return appointmentService.getProviderDashboard(email);
    }
}
