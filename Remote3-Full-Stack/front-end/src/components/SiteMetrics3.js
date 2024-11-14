import React, { Component } from 'react';

class SiteMetrics3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metrics: {
        "timestamp": "",
        "site_id": "",
        "signal_strength": {
          "LTE_power": "",
          "5G_power": ""
        },
        "site_info": {
          "geo_loc": {
            "type": "",
            "coordinates": [
              "",
              ""
            ]
          }
        },
        "_stream_meta": {
          "source": {
            "type": "",
            "topic": "",
            "partition": 0,
            "offset": 21437
          }
        },
        "backhaul": {
          "packet_loss_pct": "",
          "latency_ms": "",
          "interface_speed": "10000"
        },
        "Equipment_status": {
          "temp_c": "17",
          "ups_battery_pct": "",
          "grid_power_volts": ""
        },
        "_ts": ""
      },
      error: null,
    };
  }

  componentDidMount() {
    this.fetchMetrics();
    this.intervalId = setInterval(this.fetchMetrics, 100); // Fetch every second
  }

  componentWillUnmount() {
    clearInterval(this.intervalId); // Clear interval when component unmounts
  }
  fetchMetrics = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/metrics?siteid=chcreek', {
        method: 'GET',
        mode: 'cors', // Enable CORS
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch metrics data');
      }
      const data = await response.json();
      console.log(data);
      this.setState({ metrics: data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  render() {
    const { metrics, error } = this.state;

    const styles = {
      body: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#1c1c1c',
        color: '#d1d1d1',
        margin: 0,
        padding: '20px',
      },
      container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#2b2b2b',
        borderRadius: '8px',
      },
      heading: {
        color: '#8fbc8f',
        fontSize: '24px',
        textAlign: 'center',
      },
      section: {
        borderBottom: '1px solid #3c3c3c',
        padding: '10px 0',
      },
      label: {
        fontWeight: 'bold',
        color: '#8fbc8f',
      },
      value: {
        color: '#d1d1d1',
      },
    };

    if (error) {
      return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    if (!metrics) {
      return <p>Loading...</p>;
    }

    return (
      <div style={styles.body}>
        <div style={styles.container}>
          <h1 style={styles.heading}>Site Metrics - Ch Creek</h1>

          <div style={styles.section}>
            <div style={styles.label}>Timestamp:</div>
            <div style={styles.value}>{this.state.metrics.timestamp}</div>
          </div>

          <div style={styles.section}>
            <div style={styles.label}>Site ID:</div>
            <div style={styles.value}>{this.state.metrics.site_id}</div>
          </div>

          <div style={styles.section}>
            <div style={styles.label}>Site Location:</div>
            <div style={styles.value}>Coordinates: ({this.state.metrics.site_info.geo_loc.coordinates[0]}, {metrics.site_info.geo_loc.coordinates[1]})</div>
          </div>

          <div style={styles.section}>
            <div style={styles.label}>Signal Strength</div>
            <div style={styles.value}>LTE Power: {this.state.metrics.signal_strength.LTE_power}</div>
            <div style={styles.value}>5G Power: {metrics.signal_strength["5G_power"]}</div>
          </div>

          <div style={styles.section}>
            <div style={styles.label}>Backhaul</div>
            <div style={styles.value}>Packet Loss %: {metrics.backhaul.packet_loss_pct}</div>
            <div style={styles.value}>Latency ms: {metrics.backhaul.latency_ms}</div>
            <div style={styles.value}>Interface Speed: {metrics.backhaul.interface_speed} Mbps</div>
          </div>

          <div style={styles.section}>
            <div style={styles.label}>Equipment Status</div>
            <div style={styles.value}>Temperature °C: {metrics.Equipment_status.temp_c}</div>
            <div style={styles.value}>UPS Battery %: {metrics.Equipment_status.ups_battery_pct}</div>
            <div style={styles.value}>Grid Power Volts: {metrics.Equipment_status.grid_power_volts}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default SiteMetrics3;