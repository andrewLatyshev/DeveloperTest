package com.test.developertest.repository;

import com.test.developertest.models.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    Purchase findPurchaseByName(String name);
}
