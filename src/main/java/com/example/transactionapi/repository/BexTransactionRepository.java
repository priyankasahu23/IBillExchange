package com.example.transactionapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.transactionapi.entity.BexTransaction;

@Repository
public interface BexTransactionRepository extends JpaRepository<BexTransaction, Long> {
    // You can add custom query methods if needed
}

