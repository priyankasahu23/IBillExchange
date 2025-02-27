package com.example.transactionapi.service;

import com.example.transactionapi.model.BexTransactionRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @Autowired
    private BexTransactionService transactionService;

    @Autowired
    private ObjectMapper objectMapper;

    @KafkaListener(topics = "transactions-topic", groupId = "my-group")
    public void consume(String message) {
        try {
            // Deserialize message into the correct class
            BexTransactionRequest transactionRequest = objectMapper.readValue(message, BexTransactionRequest.class);
            
            // Process transaction
            transactionService.processTransaction(transactionRequest);
            
            System.out.println("Received and processed transaction: " + transactionRequest);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
