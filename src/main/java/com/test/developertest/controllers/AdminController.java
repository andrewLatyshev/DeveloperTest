package com.test.developertest.controllers;


import com.test.developertest.models.Purchase;
import com.test.developertest.service.ProductService;
import com.test.developertest.service.PurchaseService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/")
public class AdminController {

    private final PurchaseService purchaseService;
    private final ProductService productService;

    public AdminController(PurchaseService purchaseService, ProductService productService) {
        this.purchaseService = purchaseService;
        this.productService = productService;
    }

    @GetMapping("index")
	public String showAllUsers(Model model) {
		model.addAttribute("purchases", purchaseService.getAllPurchases());

		return "/adminPage";
	}

    @GetMapping("week-report")
    public String reportOfWeek(Model model) {
        List<Purchase> purchases = purchaseService.getAllPurchases();
        model.addAttribute("weekReport", purchaseService.bestSellsOfWeek());
        model.addAttribute("product", productService.getProductList());
        return "/week_report";
    }

    @GetMapping("month-report")
    public String reportOfMonth(Model model) {
        model.addAttribute("monthReport", purchaseService.bestProductOfMonth());
        return "/month_report";
    }

    @GetMapping("half-report")
    public String reportOfHalf(Model model) {
        model.addAttribute("halfReport", purchaseService.nameOfHalfAYear());
        return "/half_report";
    }

    @GetMapping("popular18-report")
    public String notTeenProduct(Model model) {
        model.addAttribute("product", purchaseService.productFor18());
        return "/popular18";
    }

}
