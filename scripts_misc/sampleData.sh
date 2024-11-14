#!/bin/bash

mongosh "mongodb+srv://telcodemo.3ronx.mongodb.net/" --apiVersion 1 --username davidhiltenbrand

use equipment_monitor;

db.events.drop();

db.createCollection(
   "events",
   {
      timeseries: {
         timeField: "timestamp",
         metaField: "site_id",
         granularity: "seconds"
      }
   }
);


db.events.insertMany([
  {
    "timestamp": new Date("2023-10-01T12:00:00Z"),
    "site_id": "site_001",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-73.935242, 40.730610]
    },
    "signal_strength": {
      "LTE_power": -85,
      "5G_power": -70
    },
    "backhaul": {
      "packet_loss_pct": 0.1,
      "latency_ms": 20,
      "interface_speed": 100
    },
    "Equipment_status": {
      "temp_c": 24,
      "ups_battery_pct": 100,
      "grid_power_volts": 230
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:01:00Z"),
    "site_id": "site_001",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-73.935242, 40.730610]
    },
    "signal_strength": {
      "LTE_power": -83,
      "5G_power": -68
    },
    "backhaul": {
      "packet_loss_pct": 0.11,
      "latency_ms": 21,
      "interface_speed": 98
    },
    "Equipment_status": {
      "temp_c": 24.5,
      "ups_battery_pct": 95,
      "grid_power_volts": 228
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:02:00Z"),
    "site_id": "site_001",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-73.935242, 40.730610]
    },
    "signal_strength": {
      "LTE_power": -84,
      "5G_power": -69
    },
    "backhaul": {
      "packet_loss_pct": 0.12,
      "latency_ms": 22,
      "interface_speed": 97
    },
    "Equipment_status": {
      "temp_c": 24.8,
      "ups_battery_pct": 90,
      "grid_power_volts": 229
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:03:00Z"),
    "site_id": "site_001",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-73.935242, 40.730610]
    },
    "signal_strength": {
      "LTE_power": -82,
      "5G_power": -67
    },
    "backhaul": {
      "packet_loss_pct": 0.13,
      "latency_ms": 23,
      "interface_speed": 96
    },
    "Equipment_status": {
      "temp_c": 25,
      "ups_battery_pct": 85,
      "grid_power_volts": 227
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:04:00Z"),
    "site_id": "site_001",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-73.935242, 40.730610]
    },
    "signal_strength": {
      "LTE_power": -81,
      "5G_power": -66
    },
    "backhaul": {
      "packet_loss_pct": 0.14,
      "latency_ms": 24,
      "interface_speed": 95
    },
    "Equipment_status": {
      "temp_c": 25.2,
      "ups_battery_pct": 80,
      "grid_power_volts": 226
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:00:00Z"),
    "site_id": "site_002",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-118.243683, 34.052235]
    },
    "signal_strength": {
      "LTE_power": -80,
      "5G_power": -65
    },
    "backhaul": {
      "packet_loss_pct": 0.2,
      "latency_ms": 25,
      "interface_speed": 150
    },
    "Equipment_status": {
      "temp_c": 26,
      "ups_battery_pct": 100,
      "grid_power_volts": 235
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:01:00Z"),
    "site_id": "site_002",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-118.243683, 34.052235]
    },
    "signal_strength": {
      "LTE_power": -78,
      "5G_power": -63
    },
    "backhaul": {
      "packet_loss_pct": 0.21,
      "latency_ms": 26,
      "interface_speed": 148
    },
    "Equipment_status": {
      "temp_c": 26.5,
      "ups_battery_pct": 95,
      "grid_power_volts": 233
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:02:00Z"),
    "site_id": "site_002",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-118.243683, 34.052235]
    },
    "signal_strength": {
      "LTE_power": -79,
      "5G_power": -64
    },
    "backhaul": {
      "packet_loss_pct": 0.22,
      "latency_ms": 27,
      "interface_speed": 147
    },
    "Equipment_status": {
      "temp_c": 26.8,
      "ups_battery_pct": 90,
      "grid_power_volts": 234
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:03:00Z"),
    "site_id": "site_002",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-118.243683, 34.052235]
    },
    "signal_strength": {
      "LTE_power": -77,
      "5G_power": -62
    },
    "backhaul": {
      "packet_loss_pct": 0.23,
      "latency_ms": 28,
      "interface_speed": 146
    },
    "Equipment_status": {
      "temp_c": 27,
      "ups_battery_pct": 85,
      "grid_power_volts": 232
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:04:00Z"),
    "site_id": "site_002",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-118.243683, 34.052235]
    },
    "signal_strength": {
      "LTE_power": -76,
      "5G_power": -61
    },
    "backhaul": {
      "packet_loss_pct": 0.24,
      "latency_ms": 29,
      "interface_speed": 145
    },
    "Equipment_status": {
      "temp_c": 27.2,
      "ups_battery_pct": 80,
      "grid_power_volts": 231
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:00:00Z"),
    "site_id": "site_003",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-122.419418, 37.774929]
    },
    "signal_strength": {
      "LTE_power": -75,
      "5G_power": -60
    },
    "backhaul": {
      "packet_loss_pct": 0.3,
      "latency_ms": 30,
      "interface_speed": 200
    },
    "Equipment_status": {
      "temp_c": 27,
      "ups_battery_pct": 100,
      "grid_power_volts": 240
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:01:00Z"),
    "site_id": "site_003",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-122.419418, 37.774929]
    },
    "signal_strength": {
      "LTE_power": -73,
      "5G_power": -58
    },
    "backhaul": {
      "packet_loss_pct": 0.31,
      "latency_ms": 31,
      "interface_speed": 198
    },
    "Equipment_status": {
      "temp_c": 27.5,
      "ups_battery_pct": 95,
      "grid_power_volts": 238
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:02:00Z"),
    "site_id": "site_003",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-122.419418, 37.774929]
    },
    "signal_strength": {
      "LTE_power": -74,
      "5G_power": -59
    },
    "backhaul": {
      "packet_loss_pct": 0.32,
      "latency_ms": 32,
      "interface_speed": 197
    },
    "Equipment_status": {
      "temp_c": 27.8,
      "ups_battery_pct": 90,
      "grid_power_volts": 239
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:03:00Z"),
    "site_id": "site_003",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-122.419418, 37.774929]
    },
    "signal_strength": {
      "LTE_power": -72,
      "5G_power": -57
    },
    "backhaul": {
      "packet_loss_pct": 0.33,
      "latency_ms": 33,
      "interface_speed": 196
    },
    "Equipment_status": {
      "temp_c": 28,
      "ups_battery_pct": 85,
      "grid_power_volts": 237
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:04:00Z"),
    "site_id": "site_003",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-122.419418, 37.774929]
    },
    "signal_strength": {
      "LTE_power": -71,
      "5G_power": -56
    },
    "backhaul": {
      "packet_loss_pct": 0.34,
      "latency_ms": 34,
      "interface_speed": 195
    },
    "Equipment_status": {
      "temp_c": 28.2,
      "ups_battery_pct": 80,
      "grid_power_volts": 236
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:00:00Z"),
    "site_id": "site_004",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-87.629798, 41.878113]
    },
    "signal_strength": {
      "LTE_power": -78,
      "5G_power": -63
    },
    "backhaul": {
      "packet_loss_pct": 0.25,
      "latency_ms": 35,
      "interface_speed": 180
    },
    "Equipment_status": {
      "temp_c": 25,
      "ups_battery_pct": 100,
      "grid_power_volts": 230
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:01:00Z"),
    "site_id": "site_004",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-87.629798, 41.878113]
    },
    "signal_strength": {
      "LTE_power": -76,
      "5G_power": -61
    },
    "backhaul": {
      "packet_loss_pct": 0.26,
      "latency_ms": 36,
      "interface_speed": 178
    },
    "Equipment_status": {
      "temp_c": 25.5,
      "ups_battery_pct": 95,
      "grid_power_volts": 228
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:02:00Z"),
    "site_id": "site_004",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-87.629798, 41.878113]
    },
    "signal_strength": {
      "LTE_power": -77,
      "5G_power": -62
    },
    "backhaul": {
      "packet_loss_pct": 0.27,
      "latency_ms": 37,
      "interface_speed": 177
    },
    "Equipment_status": {
      "temp_c": 25.8,
      "ups_battery_pct": 90,
      "grid_power_volts": 229
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:03:00Z"),
    "site_id": "site_004",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-87.629798, 41.878113]
    },
    "signal_strength": {
      "LTE_power": -75,
      "5G_power": -60
    },
    "backhaul": {
      "packet_loss_pct": 0.28,
      "latency_ms": 38,
      "interface_speed": 176
    },
    "Equipment_status": {
      "temp_c": 26,
      "ups_battery_pct": 85,
      "grid_power_volts": 227
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:04:00Z"),
    "site_id": "site_004",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-87.629798, 41.878113]
    },
    "signal_strength": {
      "LTE_power": -74,
      "5G_power": -59
    },
    "backhaul": {
      "packet_loss_pct": 0.29,
      "latency_ms": 39,
      "interface_speed": 175
    },
    "Equipment_status": {
      "temp_c": 26.2,
      "ups_battery_pct": 80,
      "grid_power_volts": 226
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:00:00Z"),
    "site_id": "site_005",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-95.369804, 29.760427]
    },
    "signal_strength": {
      "LTE_power": -82,
      "5G_power": -67
    },
    "backhaul": {
      "packet_loss_pct": 0.15,
      "latency_ms": 40,
      "interface_speed": 160
    },
    "Equipment_status": {
      "temp_c": 28,
      "ups_battery_pct": 100,
      "grid_power_volts": 230
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:01:00Z"),
    "site_id": "site_005",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-95.369804, 29.760427]
    },
    "signal_strength": {
      "LTE_power": -80,
      "5G_power": -65
    },
    "backhaul": {
      "packet_loss_pct": 0.16,
      "latency_ms": 41,
      "interface_speed": 158
    },
    "Equipment_status": {
      "temp_c": 28.5,
      "ups_battery_pct": 95,
      "grid_power_volts": 228
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:02:00Z"),
    "site_id": "site_005",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-95.369804, 29.760427]
    },
    "signal_strength": {
      "LTE_power": -81,
      "5G_power": -66
    },
    "backhaul": {
      "packet_loss_pct": 0.17,
      "latency_ms": 42,
      "interface_speed": 157
    },
    "Equipment_status": {
      "temp_c": 28.8,
      "ups_battery_pct": 90,
      "grid_power_volts": 229
    }
  },
  {
    "timestamp": new Date("2023-10-01T12:03:00Z"),
    "site_id": "site_005",
    "geo_loc": {
      "type": "Point",
      "coordinates": [-95.369804, 29.760427]
    },
    "signal_strength": {
      "LTE_power": -79,
      "5G_power": -64
    },
    "backhaul": {
      "packet_loss_pct": 0.18,
      "latency_ms": 43,
      "interface_speed": 156
    },
    "Equipment_status": {
      "temp_c": 29,
      "ups_battery_pct": 85,
      "grid_power_volts": 227
    }
  }
]);