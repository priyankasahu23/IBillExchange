package com.example.transactionapi.service;


import com.example.transactionapi.model.Transaction;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {
    private static final String TOPIC = "transactions-topic";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private ObjectMapper objectMapper; // For JSON conversion

    public void sendTransaction(Transaction transaction) {
        try {
            String transactionJson = objectMapper.writeValueAsString(transaction);
            kafkaTemplate.send(TOPIC, transactionJson);
            System.out.println("Sent transaction: " + transactionJson);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}
