package com.test.developertest.dao;


import com.test.developertest.models.Product;

import java.util.List;

public interface DaoProduct {

    List<Product> getProductList();

    Product getProduct(Long id);
}
