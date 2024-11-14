package com.mycompany.example;

import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Random;

class MetricsGenerator {
    private final String siteId;
    private final String geoLocation;
    private int tickCounter;
    private final Random random = new Random();

    private String timestamp;
    private int LTEPower;
    private int fiveGPower;
    private double packetLoss;
    private double latency;
    private int tempC;
    private int upsBatteryPct;
    private int gridPowerVolts;

    public MetricsGenerator(String siteId, String geoLocation) {
        this.siteId = siteId;
        this.geoLocation = geoLocation;
    }

    public void updateTickCounter(int tickCounter) {
        this.tickCounter = tickCounter;
        updateMetrics();
    }

    private void updateMetrics() {
        //this.timestamp = Instant.now().toString();
        this.timestamp = DateTimeFormatter.ISO_INSTANT.format(Instant.now().truncatedTo(ChronoUnit.SECONDS));
        this.LTEPower = generateSineWaveValue(tickCounter + 10 , 30, 100); // Offset by 10 for variation
        this.fiveGPower = generateSineWaveValue(tickCounter, 0, 100);
        // Generate packet loss with occasional spikes
        this.packetLoss = generateSpikeValue(0.0, 20.0, 20); // Spikes to 20.0 with a 5% chance
        this.latency = generateHoverAndSpikeValue(10.0, 2.0, 150.0, 30); // Slightly varies around 10, with a 1 in 30 chance to spike
        this.tempC = generateSineWaveValue(tickCounter, 15, 19);
        this.upsBatteryPct = generateSineWaveValue(tickCounter, 98, 100);
        this.gridPowerVolts = generateSineWaveValue(tickCounter, 214, 224); // Grid power voltage with sine wave variation
    }

    private int generateSineWaveValue(int tick, int lowerBound, int upperBound) {
        double amplitude = (upperBound - lowerBound) / 2.0;
        double midpoint = (upperBound + lowerBound) / 2.0;
        int wavePeriod = 90;

        // Map tick (0 to WAVE_PERIOD) to angle (0 to 2π) for full sine wave cycle
        double angle = 2 * Math.PI * (tick % wavePeriod) / wavePeriod;

        // Calculate sine wave value and scale to specified bounds
        return (int) (amplitude * Math.sin(angle) + midpoint);
    }

    private double generateSpikeValue(double baseline, double spikeValue, int spikeFrequency) {
        // Returns spikeValue approximately 1 in every spikeFrequency calls; otherwise returns baseline
        return (random.nextInt(spikeFrequency) == 0) ? spikeValue : baseline;
    }

    private double generateHoverAndSpikeValue(double baseline, double variation, double spikeValue, int spikeFrequency) {
        // Generate a random value around the baseline with some variation
        double normalValue = baseline + (random.nextDouble() * 2 - 1) * variation; // Slight variation around the baseline
        // Occasionally spike
        return (random.nextInt(spikeFrequency) == 0) ? spikeValue : normalValue;
    }

    public String getJsonMetrics() {
        StringBuilder jsonBuilder = new StringBuilder();
        jsonBuilder.append("{")
                .append("\"timestamp\":\"").append(timestamp).append("\",")
                .append("\"site_id\":\"").append(siteId).append("\",")
                .append("\"site_info\":{")
                .append("\"geo_loc\":{")
                .append("\"type\":\"Point\",")
                .append("\"coordinates\":[").append("-73.935242").append(",").append("40.73061").append("]")
                .append("}")
                .append("},")
                .append("\"signal_strength\":{")
                .append("\"LTE_power\":").append(LTEPower).append(",")
                .append("\"5G_power\":").append(fiveGPower)
                .append("},")
                .append("\"backhaul\":{")
                .append("\"packet_loss_pct\":").append(String.format("%.1f", packetLoss)).append(",")
                .append("\"latency_ms\":").append(latency).append(",")
                .append("\"interface_speed\":").append(10000)
                .append("},")
                .append("\"Equipment_status\":{")
                .append("\"temp_c\":").append(tempC).append(",")
                .append("\"ups_battery_pct\":").append(upsBatteryPct).append(",")
                .append("\"grid_power_volts\":").append(gridPowerVolts)
                .append("}")
                .append("}");
        return jsonBuilder.toString();
    }

}