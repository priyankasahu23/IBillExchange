package com.example.transactionapi.model;

import java.util.List;

public class BexTransactionRequest {
    private String clientRequestId;
    private String flowClassName;
    private RequestBody requestBody;

    // Getters and Setters
    public String getClientRequestId() {
        return clientRequestId;
    }

    public void setClientRequestId(String clientRequestId) {
        this.clientRequestId = clientRequestId;
    }

    public String getFlowClassName() {
        return flowClassName;
    }

    public void setFlowClassName(String flowClassName) {
        this.flowClassName = flowClassName;
    }

    public RequestBody getRequestBody() {
        return requestBody;
    }

    public void setRequestBody(RequestBody requestBody) {
        this.requestBody = requestBody;
    }

    // Inner Class for RequestBody
    public static class RequestBody {
        private double amount;
        private String currency;
        private String seller;
        private String buyerBank;
        private String buyer;
        private String issueDate;
        private String dueDate;
        private String acceptance;
        private String avalisation;
        private List<String> endorsements;
        private String boeDocs;
        private String termsAndConditions;
        private String iso20022Message;

        // Getters and Setters
        public double getAmount() {
            return amount;
        }

        public void setAmount(double amount) {
            this.amount = amount;
        }

        public String getCurrency() {
            return currency;
        }

        public void setCurrency(String currency) {
            this.currency = currency;
        }

        public String getSeller() {
            return seller;
        }

        public void setSeller(String seller) {
            this.seller = seller;
        }

        public String getBuyerBank() {
            return buyerBank;
        }

        public void setBuyerBank(String buyerBank) {
            this.buyerBank = buyerBank;
        }

        public String getBuyer() {
            return buyer;
        }

        public void setBuyer(String buyer) {
            this.buyer = buyer;
        }

        public String getIssueDate() {
            return issueDate;
        }

        public void setIssueDate(String issueDate) {
            this.issueDate = issueDate;
        }

        public String getDueDate() {
            return dueDate;
        }

        public void setDueDate(String dueDate) {
            this.dueDate = dueDate;
        }

        public String getAcceptance() {
            return acceptance;
        }

        public void setAcceptance(String acceptance) {
            this.acceptance = acceptance;
        }

        public String getAvalisation() {
            return avalisation;
        }

        public void setAvalisation(String avalisation) {
            this.avalisation = avalisation;
        }

        public List<String> getEndorsements() {
            return endorsements;
        }

        public void setEndorsements(List<String> endorsements) {
            this.endorsements = endorsements;
        }

        public String getBoeDocs() {
            return boeDocs;
        }

        public void setBoeDocs(String boeDocs) {
            this.boeDocs = boeDocs;
        }

        public String getTermsAndConditions() {
            return termsAndConditions;
        }

        public void setTermsAndConditions(String termsAndConditions) {
            this.termsAndConditions = termsAndConditions;
        }

        public String getIso20022Message() {
            return iso20022Message;
        }

        public void setIso20022Message(String iso20022Message) {
            this.iso20022Message = iso20022Message;
        }
    }
}
