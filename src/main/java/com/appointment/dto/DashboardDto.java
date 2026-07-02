package com.appointment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDto {

	private long totalAppointments;

	private long pendingAppointments;

	private long approvedAppointments;

	private long cancelledAppointments;



}
