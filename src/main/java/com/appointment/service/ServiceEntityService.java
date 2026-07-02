package com.appointment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointment.model.ServiceEntity;
import com.appointment.repository.ServiceRepository;

@Service
public class ServiceEntityService {

	@Autowired
	public ServiceRepository serviceRepository;

	public ServiceEntity saveService(ServiceEntity service) {
		return serviceRepository.save(service);
	}

	public List<ServiceEntity>getAllServices(){
		return serviceRepository.findAll();
	}

}
