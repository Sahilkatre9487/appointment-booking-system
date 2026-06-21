package com.appointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appointment.model.ServiceEntity;

public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {

}
