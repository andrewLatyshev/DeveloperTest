package com.test.developertest.service;

import com.test.developertest.models.Purchase;

import java.util.List;
import java.util.Set;

public interface PurchaseService {

    List<Purchase> getAllPurchases();

    Purchase showPurchase(Long id);

    void deletePurchase(Long id);

    void addPurchase(Purchase purchase);

    void editPurchase(Purchase purchase);

    List<Purchase> bestSellsOfWeek();

    List<String> bestProductOfMonth();
}
