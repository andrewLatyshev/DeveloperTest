package com.test.developertest.service;

import com.test.developertest.dao.DaoProduct;
import com.test.developertest.dao.DaoPurchase;
import com.test.developertest.models.Purchase;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;


@Service
public class PurchaseServiceImpl implements PurchaseService {

    private final DaoPurchase daoPurchase;
    private final DaoProduct daoProduct;

    public PurchaseServiceImpl(DaoPurchase daoPurchase, DaoProduct daoProduct) {
        this.daoPurchase = daoPurchase;
        this.daoProduct = daoProduct;
    }

    @Override
    public List<Purchase> getAllPurchases() {
        return daoPurchase.getAllPurchases();
    }

    @Override
    public Purchase showPurchase(Long id) {
        return daoPurchase.showPurchase(id);
    }

    @Transactional
    @Override
    public void deletePurchase(Long id) {
        daoPurchase.deletePurchase(id);
    }

    @Transactional
    @Override
    public void addPurchase(Purchase purchase) {
        daoPurchase.addPurchase(purchase);
    }

    @Transactional
    @Override
    public void editPurchase(Purchase purchase) {
        daoPurchase.editPurchase(purchase);
    }

    public List<Purchase> bestSellsOfWeek() {
        Period period = Period.between(LocalDate.now().minusWeeks(1), LocalDate.now());
        List<Purchase> product = new ArrayList<>();
        for (Purchase purchase : daoPurchase.getAllPurchases()) {
            Period currenPeriod = Period.between(LocalDate.parse(purchase.getPurchaseDate()), LocalDate.now());
            if (currenPeriod.getDays() <= period.getDays()) {
                product.add(purchase);
                System.out.println("текущий: " + purchase.getPurchaseItem() + " " + currenPeriod.getDays());
            }
        }
        return product;
    }

    @Override
    public List<String> bestProductOfMonth() {
        Period period = Period.between(LocalDate.now().minusMonths(1), LocalDate.now());
        Map<String, Long> maps = new HashMap<>();
        for (Purchase purchase : daoPurchase.getAllPurchases()) {
            Period currenPeriod = Period.between(LocalDate.parse(purchase.getPurchaseDate()), LocalDate.now());
            if (currenPeriod.getMonths() <= period.getMonths()) {
                maps.merge(purchase.getPurchaseItem(), purchase.getCount(), Long::sum);
            }
        }
        Long maxCount = maps.values().stream().mapToLong(Math::toIntExact).max().orElseThrow();
        return maps.entrySet().stream().filter(entry -> maxCount.equals(entry.getValue())).map(Map.Entry::getKey).collect(Collectors.toList());
    }

    public List<String> nameOfHalfAYear() {
        Period period = Period.between(LocalDate.now().minusMonths(6), LocalDate.now());
        Map<String, Long> result = new HashMap<>();
        for (Purchase purchase : daoPurchase.getAllPurchases()) {
            Period currenPeriod = Period.between(LocalDate.parse(purchase.getPurchaseDate()), LocalDate.now());
            if (currenPeriod.getMonths() <= period.getMonths()) {
                if (result.containsKey(purchase.getName())) {
                    result.put(purchase.getName() + " " + purchase.getLastname(), result.get(purchase.getName()) + 1);
                } else {
                    result.put(purchase.getName(), 1L);
                }
            }
        }
        Long maxPurchases = result.values().stream().mapToLong(Math::toIntExact).max().orElseThrow();
        return result.entrySet().stream().filter(entry -> maxPurchases.equals(entry.getValue())).map(Map.Entry::getKey).collect(Collectors.toList());
    }

    public List<String> productFor18() {
        Map<String, Long> products = new HashMap<>();
        for (Purchase purchase : daoPurchase.getAllPurchases()) {
            if (purchase.getAge() == 18) {
                if (products.containsKey(purchase.getPurchaseItem())) {
                    products.put(purchase.getPurchaseItem(), products.get(purchase.getPurchaseItem()) + 1);
                } else {
                    products.put(purchase.getPurchaseItem(), 1L);
                }
            }
        }
        Long popular = products.values().stream().mapToLong(Math::toIntExact).max().orElseThrow();
        return products.entrySet().stream().filter(entry -> popular.equals(entry.getValue())).map(Map.Entry::getKey).collect(Collectors.toList());
    }
}
