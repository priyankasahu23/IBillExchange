package com.example.transactionapi.service;


import com.example.transactionapi.model.Transaction;
import com.example.transactionapi.service.TransactionService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.kafka.common.message.FetchResponseData.AbortedTransaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private ObjectMapper objectMapper;

    @KafkaListener(topics = "transactions-topic", groupId = "my-group")
    public void consume(String message) {
        try {
            Transaction transaction = objectMapper.readValue(message, Transaction.class);
            transactionService.createTransaction(transaction);
            System.out.println("Received and saved transaction: " + transaction);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
