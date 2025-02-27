package com.example.transactionapi.model;

public class BexTransactionResponse {
    private String bexToken;
    private String status;

    public BexTransactionResponse(String bexToken, String status) {
        this.bexToken = bexToken;
        this.status = status;
    }

    public String getBexToken() {
        return bexToken;
    }

    public void setBexToken(String bexToken) {
        this.bexToken = bexToken;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
