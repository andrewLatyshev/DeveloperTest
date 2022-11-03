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

//    @GetMapping("index")
//    public String showAllUsers(Model model, Principal principal) {
//        model.addAttribute("purchases", purchaseService.getAllPurchases());
////        model.addAttribute("user", userService.showUserByName(principal.getName()));
//        return "/adminPage";
//    }

    @GetMapping("/index")
    public ResponseEntity<List<Purchase>> showAllPurchases() {
        return new ResponseEntity<>(purchaseService.getAllPurchases(), HttpStatus.OK);
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
        purchaseService.addPurchase(purchase);
        return new ResponseEntity<>(purchase, HttpStatus.OK);
    }


    @DeleteMapping("delete/{id}")
    public ResponseEntity<Purchase> deletePurchase(@PathVariable Long id) {
        purchaseService.deletePurchase(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("update")
    public ResponseEntity<Purchase> updatePurchase(@RequestBody Purchase purchase) {
        purchaseService.editPurchase(purchase);
        return new ResponseEntity<>(purchase, HttpStatus.OK);
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> showAllProducts() {
        HttpHeaders responseHeaders = new HttpHeaders();
        return new ResponseEntity<>(productService.getProductList(), responseHeaders, HttpStatus.OK);
    }

}
