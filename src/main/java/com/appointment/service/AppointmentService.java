package com.appointment.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.appointment.dto.AppointmentRequestDto;
import com.appointment.dto.DashboardDto;
import com.appointment.model.Appointment;
import com.appointment.model.ServiceEntity;
import com.appointment.model.User;
import com.appointment.repository.AppointmentRepository;
import com.appointment.repository.ServiceRepository;
import com.appointment.repository.UserRepository;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;


@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ServiceRepository serviceRepository;
    
    @Autowired
    private EmailService emailService;
    
    public Page<Appointment> getAppointments(
            int page,
            int size,
            String sortBy) {

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by(sortBy));

        return appointmentRepository.findAll(pageable);
    }
    
    public Appointment saveAppointment(AppointmentRequestDto dto) {
    	
    	if (appointmentRepository
                .existsByServiceIdAndAppointmentDateAndAppointmentTime(
                        dto.getServiceId(),
                        dto.getAppointmentDate(),
                        dto.getAppointmentTime())) {

            throw new RuntimeException(
                    "This time slot is already booked.");
        }

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
    public List<Appointment> getAppointmentsByStatus(String status) {
        return appointmentRepository.findByStatus(status);
    }
    
    public Appointment approveAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        emailService.sendEmail(
                appointment.getUser().getEmail(),
                "Appointment Approved",
                "Your appointment has been approved.");
        
        appointment.setStatus("APPROVED");

        return appointmentRepository.save(appointment);
    }

    public Appointment cancelAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        emailService.sendEmail(
                appointment.getUser().getEmail(),
                "Appointment Cancelled",
                "Your appointment has been cancelled.");
        
        appointment.setStatus("CANCELLED");

        return appointmentRepository.save(appointment);
    }
    
    public List<Appointment> getMyAppointment(){
    	Authentication authentication=
    			SecurityContextHolder.getContext()
    			.getAuthentication();
    	
    	String email =authentication.getName();
    	
    	return appointmentRepository
    			.findByUserEmail(email);
    }
    public List<Appointment> getAppointmentsByDate(
            LocalDate appointmentDate) {

        return appointmentRepository
                .findByAppointmentDate(
                        appointmentDate);
    }
    
    public DashboardDto getDashboardStats() {
    	
    	DashboardDto dto=new DashboardDto();
    	dto.setTotalAppointments(
    			appointmentRepository.count());
    	
    	dto.setPendingAppointments(
                appointmentRepository.countByStatus("PENDING"));

        dto.setApprovedAppointments(
                appointmentRepository.countByStatus("APPROVED"));

        dto.setCancelledAppointments(
                appointmentRepository.countByStatus("CANCELLED"));

        return dto;
    }

	public List<Appointment> getByService(String serviceName) {
		// TODO Auto-generated method stub
		return appointmentRepository
	            .findByServiceServiceName(serviceName);
	}
    
}











//hello








