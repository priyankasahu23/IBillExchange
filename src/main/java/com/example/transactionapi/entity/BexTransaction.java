package com.example.transactionapi.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "bex_transactions")
public class BexTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clientRequestId;
    private String amount;
    private String currency;
    private String status;

    // Default constructor
    public BexTransaction() {}

    // Constructor with fields
    public BexTransaction(String clientRequestId, String amount, String currency, String status) {
        this.clientRequestId = clientRequestId;
        this.amount = amount;
        this.currency = currency;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClientRequestId() {
        return clientRequestId;
    }

    public void setClientRequestId(String clientRequestId) {
        this.clientRequestId = clientRequestId;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
