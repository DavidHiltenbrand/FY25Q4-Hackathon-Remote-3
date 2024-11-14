package com.mycompany.example;
import java.util.Arrays;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.ArrayList;
import java.util.List;


class MetricsGeneratorManager implements Runnable {
    private ScheduledExecutorService scheduler;
    private List<MetricsGenerator> generators = new ArrayList<>();
    KafkaProducer producer;
    private int tickCounter = 1;



    public MetricsGeneratorManager(KafkaProducer producer) {
        scheduler = Executors.newScheduledThreadPool(2);
        this.producer = producer;
        initializeGenerators();
    }

    private void initializeGenerators() {
        List<List<Double>> coordinates = new ArrayList<>();

        // Adding coordinates for each neighborhood
        coordinates.add(Arrays.asList(39.7480, 104.9990));  // LoDo (Lower Downtown)
        coordinates.add(Arrays.asList(39.7385, 104.9810));  // Capitol Hill
        coordinates.add(Arrays.asList(39.7653, 105.0184));  // Highlands
        coordinates.add(Arrays.asList(39.7198, 104.9517));  // Cherry Creek
        coordinates.add(Arrays.asList(39.6843, 104.9671));  // Washington Park (Wash Park)


        generators.add(new MetricsGenerator("lodo", coordinates.get(0).toString()));
        generators.add(new MetricsGenerator("caphill", coordinates.get(1).toString()));
        generators.add(new MetricsGenerator("highlands", coordinates.get(2).toString()));
        generators.add(new MetricsGenerator("chcreek", coordinates.get(3).toString()));
        generators.add(new MetricsGenerator("washpark", coordinates.get(4).toString()));

    }

    @Override
    public void run() {
        if (scheduler.isShutdown()){
            // reset everything if we are starting over after a shutdown
            scheduler = Executors.newScheduledThreadPool(2);
            initializeGenerators();
        }
        scheduler.scheduleAtFixedRate(this::updateTickCounter, 0, 1, TimeUnit.SECONDS);
    }

    private void updateTickCounter() {
        tickCounter = (tickCounter % 90) + 1; // Reset tick counter to 1 after 90
        for (MetricsGenerator generator : generators) {
            generator.updateTickCounter(tickCounter);
            String jsonMetrics = generator.getJsonMetrics();

            // send the message
            producer.produce(null, jsonMetrics);

        }
    }

    public void shutdown() {
        scheduler.shutdown();
    }
}