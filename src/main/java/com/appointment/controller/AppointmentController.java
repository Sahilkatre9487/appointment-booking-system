package com.appointment.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.appointment.dto.AppointmentRequestDto;
import com.appointment.dto.DashboardDto;
import com.appointment.model.Appointment;
import com.appointment.service.AppointmentService;

@RestController
@RequestMapping("/appointments")
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // ===============================
    // User Booking
    // ===============================

    @PostMapping
    public Appointment saveAppointment(
            @RequestBody AppointmentRequestDto dto) {

        return appointmentService.saveAppointment(dto);
    }

    @GetMapping("/my")
    public List<Appointment> getMyAppointments() {

        return appointmentService.getMyAppointment();
    }

    // ===============================
    // Admin
    // ===============================

    @GetMapping
    public List<Appointment> getAllAppointments() {

        return appointmentService.getAllAppointments();
    }

    @PutMapping("/{id}/approve")
    public Appointment approveAppointment(
            @PathVariable Long id) {

        return appointmentService.approveAppointment(id);
    }

    @PutMapping("/{id}/cancel")
    public Appointment cancelAppointment(
            @PathVariable Long id) {

        return appointmentService.cancelAppointment(id);
    }

    @DeleteMapping("/{id}")
    public String deleteAppointment(
            @PathVariable Long id) {

        appointmentService.deleteAppointment(id);

        return "Appointment Deleted Successfully";
    }

    @PutMapping("/{id}")
    public Appointment updateAppointment(
            @PathVariable Long id,
            @RequestBody Appointment appointment) {

        return appointmentService.updateAppointment(id, appointment);
    }

    // ===============================
    // Provider
    // ===============================

    @GetMapping("/provider")
    public List<Appointment> getProviderAppointments() {

        return appointmentService.getProviderAppointments();
    }

    @PutMapping("/provider/{id}/approve")
    public Appointment providerApproveAppointment(
            @PathVariable Long id) {

        return appointmentService.providerApproveAppointment(id);
    }

    @PutMapping("/provider/{id}/cancel")
    public Appointment providerCancelAppointment(
            @PathVariable Long id) {

        return appointmentService.providerCancelAppointment(id);
    }

    // ===============================
    // Dashboard / Search
    // ===============================

    @GetMapping("/page")
    public Page<Appointment> getAppointments(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "5")
            int size,

            @RequestParam(defaultValue = "appointmentDate")
            String sortBy) {

        return appointmentService.getAppointments(
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

        return appointmentService.getAppointmentsByDate(date);
    }

    @GetMapping("/service/{serviceName}")
    public List<Appointment> getByService(
            @PathVariable String serviceName) {

        return appointmentService.getByService(serviceName);
    }

    @GetMapping("/dashboard")
    public DashboardDto getDashboardStats() {

        return appointmentService.getDashboardStats();
    }

    // ===============================
    // Export
    // ===============================

    @GetMapping("/export/excel")
    public ResponseEntity<InputStreamResource> exportAppointmentsToExcel()
            throws IOException {

        ByteArrayInputStream in =
                appointmentService.exportAppointmentsToExcel();

        HttpHeaders headers = new HttpHeaders();

        headers.add(
                "Content-Disposition",
                "attachment; filename=appointments.xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(new InputStreamResource(in));
    }

    @GetMapping("/export/pdf")
    public ResponseEntity<InputStreamResource> exportAppointmentsToPdf()
            throws Exception {

        ByteArrayInputStream in =
                appointmentService.exportAppointmentsToPdf();

        HttpHeaders headers = new HttpHeaders();

        headers.add(
                "Content-Disposition",
                "attachment; filename=appointments.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(in));
    }

}