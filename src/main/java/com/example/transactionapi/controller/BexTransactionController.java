package com.example.transactionapi.controller;

import com.example.transactionapi.service.BexTransactionService;
import com.example.transactionapi.model.BexTransactionRequest;
import com.example.transactionapi.model.BexTransactionResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class BexTransactionController {

    @Autowired
    private BexTransactionService transactionService;

    @PostMapping("/process")
    public List<BexTransactionResponse> processTransaction(@RequestBody BexTransactionRequest request) {
        return transactionService.processTransaction(request);
    }
}
