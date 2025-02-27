package com.example.transactionapi.service;

import com.example.transactionapi.model.BexTransactionRequest;
import com.example.transactionapi.model.BexTransactionResponse;
import java.util.List;

public interface BexTransactionService {
    List<BexTransactionResponse> processTransaction(BexTransactionRequest request);
}
