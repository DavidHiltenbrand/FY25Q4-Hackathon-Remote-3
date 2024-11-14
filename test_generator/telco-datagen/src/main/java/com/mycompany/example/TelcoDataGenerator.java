package com.mycompany.example;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class TelcoDataGenerator {
    public static KafkaProducer producer;
    public static KafkaConsumer consumer;
    public static MetricsGeneratorManager metricsGenMgr;

    public static void main(String[] args) {
        try {

            String topic = "telco_metrics";
            final Properties config = readConfig("client.properties");

            System.out.println("Creating producer...");
            producer = new KafkaProducer(config, topic);
            // producer.produce(null,"test"); // DEBUG ONLY

            System.out.println("Creating consumer...");
            consumer = new KafkaConsumer(config, topic);
            // consumer.consume();

            System.out.println("Starting Metrics Generator Manager...");
            metricsGenMgr = new MetricsGeneratorManager(producer);
            System.out.println("Calling run()");
            metricsGenMgr.run();


        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public static Properties readConfig(final String configFile) throws IOException {
        final Properties config = new Properties();
        try (InputStream inputStream = TelcoDataGenerator.class.getClassLoader().getResourceAsStream(configFile)) {
            if (inputStream == null) {
                throw new IOException(configFile + " not found in resources.");
            }
            config.load(inputStream);
        }
        return config;
    }

}
