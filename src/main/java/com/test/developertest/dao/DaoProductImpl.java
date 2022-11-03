package com.test.developertest.dao;

import com.test.developertest.models.Product;
import com.test.developertest.models.Purchase;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class DaoProductImpl implements DaoProduct{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Product> getProductList() {
        return entityManager.createQuery("SELECT p FROM Product p", Product.class).getResultList();
    }

    @Override
    public Product getProduct(Long id) {
        return entityManager.find(Product.class, id);
    }
}
