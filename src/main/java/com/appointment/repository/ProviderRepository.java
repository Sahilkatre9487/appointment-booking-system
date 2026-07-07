package com.appointment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appointment.model.Provider;

@Repository
public interface ProviderRepository extends JpaRepository<Provider, Long> {

    // Find provider by login user ID
    Optional<Provider> findByUserId(Long userId);

    // Find provider by user email
    Optional<Provider> findByUserEmail(String email);

    // Get all providers by status
    List<Provider> findByStatus(String status);

    // Get providers by city
    List<Provider> findByCity(String city);

    // Get providers for a service
    List<Provider> findByServiceId(Long serviceId);
    
    Optional<Provider> findFirstByServiceIdAndStatus(Long serviceId, String status);

    List<Provider> findByServiceIdAndStatus(
            Long serviceId,
            String status);
}
