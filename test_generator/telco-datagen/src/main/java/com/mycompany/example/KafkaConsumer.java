package com.mycompany.example;

import org.apache.kafka.clients.consumer.*;
import org.apache.kafka.common.serialization.StringDeserializer;

import java.time.Duration;
import java.util.Arrays;
import java.util.Properties;

public class KafkaConsumer {
    private final Properties config;
    private final String topic;

    public KafkaConsumer(Properties config, String topic) {
        this.config = config;
        this.topic = topic;
        config.put(ConsumerConfig.GROUP_ID_CONFIG, "java-group-1");
        config.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
    }

    public void consume() {
        try (org.apache.kafka.clients.consumer.KafkaConsumer<String, String> consumer = new org.apache.kafka.clients.consumer.KafkaConsumer<>(config)) {
            consumer.subscribe(Arrays.asList(topic));
            System.out.println("Consumer subscribed to topic " + topic);

            while (true) {
                ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
                for (ConsumerRecord<String, String> record : records) {
                    System.out.println(
                            String.format("Consumed message from topic %s: key = %s, value = %s",
                                    topic, record.key(), record.value())
                    );
                }
            }
        } catch (Exception e) {
            System.out.println("Consumer encountered an error: " + e.getMessage());
        }
    }
}
