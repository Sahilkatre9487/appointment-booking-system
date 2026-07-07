package com.appointment.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.appointment.dto.ProviderRegisterDto;
import com.appointment.model.Provider;
import com.appointment.model.ServiceEntity;
import com.appointment.model.User;
import com.appointment.repository.ProviderRepository;
import com.appointment.repository.ServiceRepository;
import com.appointment.repository.UserRepository;

@Service
public class ProviderService {

    @Autowired
    private ProviderRepository providerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register Provider
    public Provider registerProvider(ProviderRegisterDto dto) {

        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Create User Account
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole("PROVIDER");

        user = userRepository.save(user);

        // Get Selected Service
        ServiceEntity service = serviceRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service not found"));

        // Create Provider Profile
        Provider provider = new Provider();

        provider.setUser(user);
        provider.setService(service);

        provider.setPhone(dto.getPhone());
        provider.setAddress(dto.getAddress());
        provider.setCity(dto.getCity());
        provider.setDescription(dto.getDescription());

        provider.setStatus("PENDING");
        provider.setCreatedAt(LocalDateTime.now());

        return providerRepository.save(provider);
    }

    // Get All Providers
    public List<Provider> getAllProviders() {
        return providerRepository.findAll();
    }

    // Pending Providers
    public List<Provider> getPendingProviders() {
        return providerRepository.findByStatus("PENDING");
    }

    // Approved Providers
    public List<Provider> getApprovedProviders() {
        return providerRepository.findByStatus("APPROVED");
    }

    // Approve
    public Provider approveProvider(Long id) {

        Provider provider = providerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        provider.setStatus("APPROVED");

        return providerRepository.save(provider);
    }

    // Reject
    public Provider rejectProvider(Long id) {

        Provider provider = providerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        provider.setStatus("REJECTED");

        return providerRepository.save(provider);
    }

    public List<Provider> getApprovedProvidersByService(Long serviceId){

        return providerRepository
                .findByServiceIdAndStatus(serviceId,"APPROVED");

    }
}