package com.example.transactionapi.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class KafkaProducerService {
    
    private static final String TOPIC = "transactions-topic";
    private static final Logger logger = LoggerFactory.getLogger(KafkaProducerService.class);

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private ObjectMapper objectMapper; // For JSON conversion

    public void sendTransaction(BexTransactionService transaction) {
        try {
            // Convert transaction object to JSON
            String transactionJson = objectMapper.writeValueAsString(transaction);
            
            // Send message to Kafka
            kafkaTemplate.send(TOPIC, transactionJson);
            
            // Log success message
            logger.info("Sent transaction to Kafka: {}", transactionJson);
        } catch (JsonProcessingException e) {
            logger.error("Error converting transaction to JSON", e);
        }
    }
}
