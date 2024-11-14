package com.mycompany.example;

import org.apache.kafka.clients.producer.*;
import org.apache.kafka.common.serialization.StringSerializer;

import java.util.Properties;

public class KafkaProducer {
    private final org.apache.kafka.clients.producer.Producer<String, String> producer;
    private final String topic;

    public KafkaProducer(Properties config, String topic) {
        this.topic = topic;

        // Set serializers for the producer
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());

        // Initialize producer instance
        this.producer = new org.apache.kafka.clients.producer.KafkaProducer<>(config);

        System.out.println("Producer initialized.");
    }

    public void produce(String key, String value) {
        producer.send(new ProducerRecord<>(topic, key, value), (metadata, exception) -> {
            if (exception != null) {
                System.out.println("Error producing message: " + exception.getMessage());
            } else {
                // DEBUG OUTPUT
                System.out.println(
                        String.format("Produced message to topic %s: key = %s, value = %s", topic, key, value)
                );
            }
        });
    }

    public void close() {
        // Close the producer when done
        producer.close();
        System.out.println("Producer closed.");
    }
}
