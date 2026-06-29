package com.appointment.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.appointment.dto.AppointmentRequestDto;
import com.appointment.dto.DashboardDto;
import com.appointment.model.Appointment;
import com.appointment.service.AppointmentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.data.domain.Page;


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
    @GetMapping("/page")
    public Page<Appointment> getAppointments(
            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "5")
            int size,

            @RequestParam(defaultValue = "appointmentDate")
            String sortBy) {

        return appointmentService
                .getAppointments(
                        page,
                        size,
                        sortBy);
    }
    @GetMapping("/status/{status}")
    public List<Appointment> getAppointmentsByStatus(
            @PathVariable String status) {

        return appointmentService.getAppointmentsByStatus(status);
    }
    @GetMapping("/date/{date}")
    public List<Appointment> getAppointmentsByDate(
            @PathVariable LocalDate date) {

        return appointmentService
                .getAppointmentsByDate(date);
    }
    @GetMapping("/dashboard")
    public DashboardDto getDashboardStats() {
        return appointmentService.getDashboardStats();
    }
    //hello
    @GetMapping("/service/{serviceName}")
    public List<Appointment> getByService(
            @PathVariable String serviceName) {
        return appointmentService.getByService(serviceName);
    }
   
}