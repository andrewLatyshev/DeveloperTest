package com.test.developertest.models;


import javax.persistence.*;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "purchases")
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "age")
    private Long age;

    @Column(name = "purchaseitem")
    private String purchaseItem;

    @Column(name = "count")
    private Long count;

    @Column(name = "amount")
    private Long amount;

    @Column(name = "purchasedate")
    private String purchaseDate;

    public Purchase() {
    }

    public Purchase(String name, String lastname, Long age, String purchaseItem, Long count, Long amount, String purchaseDate) {
        this.name = name;
        this.lastname = lastname;
        this.age = age;
        this.purchaseItem = purchaseItem;
        this.count = count;
        this.amount = amount;
        this.purchaseDate = purchaseDate;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getLastname() {
        return lastname;
    }

    public Long getAge() {
        return age;
    }

    public String getPurchaseItem() {
        return purchaseItem;
    }

    public Long getCount() {
        return count;
    }

    public Long getAmount() {
        return amount;
    }

    public String getPurchaseDate() {
        return purchaseDate;
    }

    @Override
    public String toString() {
        return "Purchase{" +
                "name='" + name + '\'' +
                ", lastname='" + lastname + '\'' +
                ", age=" + age +
                ", purchaseItem='" + purchaseItem + '\'' +
                ", count=" + count +
                ", amount=" + amount +
                ", purchaseDate='" + purchaseDate + '\'' +
                '}';
    }
}
