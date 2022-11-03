package com.test.developertest.service;

import com.test.developertest.models.Product;

import java.util.List;

public interface ProductService {

    List<Product> getProductList();

    Product getProduct(Long id);
}
