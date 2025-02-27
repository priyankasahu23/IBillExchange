package com.example.transactionapi.service;

import org.springframework.stereotype.Service;

import com.example.transactionapi.model.BexTransactionRequest;
import com.example.transactionapi.model.BexTransactionResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class BexTransactionServiceImpl implements BexTransactionService {

    @Override
    public List<BexTransactionResponse> processTransaction(BexTransactionRequest request) {
        List<BexTransactionResponse> responses = new ArrayList<>();

        if (request == null || request.getRequestBody() == null) {
            responses.add(new BexTransactionResponse("ERROR", "Request or requestBody is null!"));
            return responses;
        }

        // Generate multiple BEX tokens
        for (int i = 0; i < 3; i++) {  // Generate 3 tokens (you can change this number)
            String bexToken = "BEX-" + UUID.randomUUID().toString();
            responses.add(new BexTransactionResponse(bexToken, "DRAWN"));
        }

        return responses;
    }
}
