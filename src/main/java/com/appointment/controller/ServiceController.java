package com.appointment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.appointment.model.ServiceEntity;
import com.appointment.service.ServiceEntityService;

@RestController
@RequestMapping("/services")
public class ServiceController {

    @Autowired
    private ServiceEntityService service;

    @PostMapping
    public ServiceEntity saveService(@RequestBody ServiceEntity serviceEntity) {
        return service.saveService(serviceEntity);
    }

    @GetMapping
    public List<ServiceEntity> getAllServices() {
        return service.getAllServices();
    }
}
