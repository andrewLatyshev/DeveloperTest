package com.test.developertest.controllers;


import com.test.developertest.models.Product;
import com.test.developertest.models.Purchase;
import com.test.developertest.service.ProductService;
import com.test.developertest.service.PurchaseService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/api")
public class ClientController {

    PurchaseService purchaseService;

    private final ProductService productService;

    public ClientController(PurchaseService purchaseService, ProductService productService) {
        this.purchaseService = purchaseService;
        this.productService = productService;
    }
    @GetMapping("/index")
    public ResponseEntity<List<Purchase>> showAllPurchases() {
        try {
            return new ResponseEntity<>(purchaseService.getAllPurchases(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("aboutThisPurchase/{id}")
    public ResponseEntity<Purchase> showThisPurchase(@PathVariable Long id) {
        try {
        Purchase purchase = purchaseService.showPurchase(id);
        return new ResponseEntity<>(purchase, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/addPurchase")
    public ResponseEntity<Purchase> createPurchaseForm(@RequestBody Purchase purchase) {
        try {
            purchaseService.addPurchase(purchase);
            return new ResponseEntity<>(purchase, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }


    @DeleteMapping("delete/{id}")
    public ResponseEntity<Purchase> deletePurchase(@PathVariable Long id) {
        try {
            purchaseService.deletePurchase(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("update")
    public ResponseEntity<Purchase> updatePurchase(@RequestBody Purchase purchase) {
        try {
            purchaseService.editPurchase(purchase);
            return new ResponseEntity<>(purchase, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> showAllProducts() {
        try {
            HttpHeaders responseHeaders = new HttpHeaders();
            return new ResponseEntity<>(productService.getProductList(), responseHeaders, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
