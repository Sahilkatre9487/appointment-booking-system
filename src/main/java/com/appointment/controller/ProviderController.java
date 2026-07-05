package com.appointment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.appointment.dto.ProviderRegisterDto;
import com.appointment.model.Provider;
import com.appointment.service.ProviderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/providers")
@CrossOrigin(origins = "http://localhost:5173")
public class ProviderController {

    @Autowired
    private ProviderService providerService;

    // Provider Registration
    @PostMapping("/register")
    public Provider registerProvider(
            @Valid @RequestBody ProviderRegisterDto dto) {

        return providerService.registerProvider(dto);
    }

    // Get All Providers
    @GetMapping
    public List<Provider> getAllProviders() {
        return providerService.getAllProviders();
    }

    // Pending Providers
    @GetMapping("/pending")
    public List<Provider> getPendingProviders() {
        return providerService.getPendingProviders();
    }

    // Approved Providers
    @GetMapping("/approved")
    public List<Provider> getApprovedProviders() {
        return providerService.getApprovedProviders();
    }

    // Approve Provider
    @PutMapping("/{id}/approve")
    public Provider approveProvider(@PathVariable Long id) {
        return providerService.approveProvider(id);
    }

    // Reject Provider
    @PutMapping("/{id}/reject")
    public Provider rejectProvider(@PathVariable Long id) {
        return providerService.rejectProvider(id);
    }
}