package com.test.developertest.service;

import com.test.developertest.dao.DaoProduct;
import com.test.developertest.models.Product;
import com.test.developertest.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final DaoProduct daoProduct;

    public ProductServiceImpl(DaoProduct daoProduct) {
        this.daoProduct = daoProduct;
    }

    @Override
    public List<Product> getProductList() {
        return daoProduct.getProductList();
    }

    @Override
    public Product getProduct(Long id) {
        return daoProduct.getProduct(id);
    }

}
