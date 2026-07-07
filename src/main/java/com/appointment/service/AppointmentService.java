package com.appointment.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;


import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;



import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.appointment.security.JwtUtil;
import com.appointment.model.Provider;
import com.appointment.repository.ProviderRepository;

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
    
    @Autowired
    private ProviderRepository providerRepository;

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

    	// Find an approved provider for this service
    	Provider provider =
    			providerRepository.findById(dto.getProviderId())
    			.orElseThrow(() ->
    			new RuntimeException("Provider not found"));
    	
    	
    	Appointment appointment = new Appointment();

    	appointment.setAppointmentDate(dto.getAppointmentDate());
    	appointment.setAppointmentTime(dto.getAppointmentTime());

    	appointment.setStatus("PENDING");

    	appointment.setUser(user);
    	appointment.setService(service);

    	// NEW
    	appointment.setProvider(provider);

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

	public void deleteAppointment(Long id) {

	    appointmentRepository.deleteById(id);

	}

	public Appointment updateAppointment(Long id, Appointment updatedAppointment) {

	    Appointment appointment = appointmentRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Appointment not found"));

	    appointment.setAppointmentDate(updatedAppointment.getAppointmentDate());
	    appointment.setAppointmentTime(updatedAppointment.getAppointmentTime());
	    appointment.setStatus(updatedAppointment.getStatus());
	    appointment.setService(updatedAppointment.getService());

	    return appointmentRepository.save(appointment);
	}
	
	public ByteArrayInputStream exportAppointmentsToExcel() throws IOException {

	    List<Appointment> appointments = appointmentRepository.findAll();

	    XSSFWorkbook workbook = new XSSFWorkbook();
	    XSSFSheet sheet = workbook.createSheet("Appointments");

	    Row header = sheet.createRow(0);

	    header.createCell(0).setCellValue("ID");
	    header.createCell(1).setCellValue("User");
	    header.createCell(2).setCellValue("Email");
	    header.createCell(3).setCellValue("Service");
	    header.createCell(4).setCellValue("Date");
	    header.createCell(5).setCellValue("Time");
	    header.createCell(6).setCellValue("Status");

	    int rowNum = 1;

	    for (Appointment appointment : appointments) {

	        Row row = sheet.createRow(rowNum++);

	        row.createCell(0).setCellValue(appointment.getId());
	        row.createCell(1).setCellValue(appointment.getUser().getName());
	        row.createCell(2).setCellValue(appointment.getUser().getEmail());
	        row.createCell(3).setCellValue(appointment.getService().getServiceName());
	        row.createCell(4).setCellValue(
	        	    appointment.getAppointmentDate() != null
	        	        ? appointment.getAppointmentDate().toString()
	        	        : "N/A");
	        row.createCell(5).setCellValue(
	        	    appointment.getAppointmentTime() != null
	        	        ? appointment.getAppointmentTime().toString()
	        	        : "N/A");
	        row.createCell(6).setCellValue(appointment.getStatus());
	    }

	    ByteArrayOutputStream out = new ByteArrayOutputStream();
	    workbook.write(out);
	    workbook.close();

	    return new ByteArrayInputStream(out.toByteArray());
	}
	
	public ByteArrayInputStream exportAppointmentsToPdf() throws Exception {

	    Document document = new Document();
	    ByteArrayOutputStream out = new ByteArrayOutputStream();

	    PdfWriter.getInstance(document, out);

	    document.open();

	    document.add(new Paragraph("Appointment Report"));
	    document.add(new Paragraph(" "));

	    PdfPTable table = new PdfPTable(7);

	    table.addCell("ID");
	    table.addCell("User");
	    table.addCell("Email");
	    table.addCell("Service");
	    table.addCell("Date");
	    table.addCell("Time");
	    table.addCell("Status");

	    for (Appointment appointment : appointmentRepository.findAll()) {

	        table.addCell(String.valueOf(appointment.getId()));
	        table.addCell(appointment.getUser().getName());
	        table.addCell(appointment.getUser().getEmail());
	        table.addCell(appointment.getService().getServiceName());

	        table.addCell(
	                appointment.getAppointmentDate() != null
	                        ? appointment.getAppointmentDate().toString()
	                        : "N/A");

	        table.addCell(
	                appointment.getAppointmentTime() != null
	                        ? appointment.getAppointmentTime().toString()
	                        : "N/A");

	        table.addCell(appointment.getStatus());
	    }

	    document.add(table);

	    document.close();

	    return new ByteArrayInputStream(out.toByteArray());
	}
	public List<Appointment> getProviderAppointments(String providerEmail) {

	    User provider = userRepository.findByEmail(providerEmail)
	            .orElseThrow(() -> new RuntimeException("Provider not found"));

	    return appointmentRepository.findAll()
	            .stream()
	            .filter(a -> a.getService().getProvider() != null)
	            .filter(a -> a.getService().getProvider().getId().equals(provider.getId()))
	            .toList();
	}
	public DashboardDto getProviderDashboard(String email) {

	    User provider = userRepository.findByEmail(email)
	            .orElseThrow();

	    List<Appointment> list = appointmentRepository.findAll()
	            .stream()
	            .filter(a -> a.getService().getProvider() != null)
	            .filter(a -> a.getService().getProvider().getId().equals(provider.getId()))
	            .toList();

	    DashboardDto dto = new DashboardDto();

	    dto.setTotalAppointments(list.size());

	    dto.setPendingAppointments(
	            list.stream().filter(a -> a.getStatus().equals("PENDING")).count()
	    );

	    dto.setApprovedAppointments(
	            list.stream().filter(a -> a.getStatus().equals("APPROVED")).count()
	    );

	    dto.setCancelledAppointments(
	            list.stream().filter(a -> a.getStatus().equals("CANCELLED")).count()
	    );

	    return dto;
	}
	
	// ===============================
	// Provider Appointments
	// ===============================

	public List<Appointment> getProviderAppointments() {

	    Authentication authentication =
	            SecurityContextHolder.getContext()
	                    .getAuthentication();

	    String email = authentication.getName();

	    return appointmentRepository.findByProviderUserEmail(email);
	}

	public Appointment providerApproveAppointment(Long id) {

	    Authentication authentication =
	            SecurityContextHolder.getContext()
	                    .getAuthentication();

	    String email = authentication.getName();

	    Appointment appointment = appointmentRepository.findById(id)
	            .orElseThrow(() ->
	                    new RuntimeException("Appointment not found"));

	    if (!appointment.getProvider()
	            .getUser()
	            .getEmail()
	            .equals(email)) {

	        throw new RuntimeException(
	                "You are not allowed to approve this appointment");
	    }

	    appointment.setStatus("APPROVED");

	    emailService.sendEmail(
	            appointment.getUser().getEmail(),
	            "Appointment Approved",
	            "Your appointment has been approved.");

	    return appointmentRepository.save(appointment);
	}

	public Appointment providerCancelAppointment(Long id) {

	    Authentication authentication =
	            SecurityContextHolder.getContext()
	                    .getAuthentication();

	    String email = authentication.getName();

	    Appointment appointment = appointmentRepository.findById(id)
	            .orElseThrow(() ->
	                    new RuntimeException("Appointment not found"));

	    if (!appointment.getProvider()
	            .getUser()
	            .getEmail()
	            .equals(email)) {

	        throw new RuntimeException(
	                "You are not allowed to cancel this appointment");
	    }

	    appointment.setStatus("CANCELLED");

	    emailService.sendEmail(
	            appointment.getUser().getEmail(),
	            "Appointment Cancelled",
	            "Your appointment has been cancelled.");

	    return appointmentRepository.save(appointment);
	}

}











//hello








