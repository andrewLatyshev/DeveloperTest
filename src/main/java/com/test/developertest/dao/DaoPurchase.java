package com.test.developertest.dao;

import com.test.developertest.models.Purchase;
import org.springframework.security.core.parameters.P;

import java.util.List;

public interface DaoPurchase {

    List<Purchase> getAllPurchases();

    Purchase showPurchase(Long id);

    void deletePurchase(Long id);

    void addPurchase(Purchase purchase);

    void editPurchase(Purchase purchase);

}
