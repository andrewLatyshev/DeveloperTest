package com.test.developertest.dao;

import com.test.developertest.models.Purchase;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class DaoPurchaseImpl implements DaoPurchase{

    @PersistenceContext
    EntityManager entityManager;


    @Override
    public List<Purchase> getAllPurchases() {
        return entityManager.createQuery("SELECT p FROM Purchase p", Purchase.class).getResultList();
    }

    @Override
    public Purchase showPurchase(Long id) {
        return entityManager.find(Purchase.class, id);
    }

    @Override
    public void deletePurchase(Long id) {
        entityManager.remove(showPurchase(id));
    }

    @Override
    public void addPurchase(Purchase purchase) {
        entityManager.persist(purchase);
    }

    @Override
    public void editPurchase(Purchase purchase) {
        entityManager.merge(purchase);
    }

}
