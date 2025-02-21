package com.example.transactionapi.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
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
	public String getFlowClassName() {
		return flowClassName;
	}
	public void setFlowClassName(String flowClassName) {
		this.flowClassName = flowClassName;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	public String getDrawee() {
		return drawee;
	}
	public void setDrawee(String drawee) {
		this.drawee = drawee;
	}
	public String getDrawer() {
		return drawer;
	}
	public void setDrawer(String drawer) {
		this.drawer = drawer;
	}
	public String getPayee() {
		return payee;
	}
	public void setPayee(String payee) {
		this.payee = payee;
	}
	public LocalDate getDueDate() {
		return dueDate;
	}
	public void setDueDate(LocalDate dueDate) {
		this.dueDate = dueDate;
	}
	private String clientRequestId;
    private String flowClassName;
    private Double amount;
    private String currency;
    private String drawee;
    private String drawer;
    private String payee;
    private LocalDate dueDate;
}
