import logo from './logo.svg';
import './App.css';
import SiteMetrics from "./components/SiteMetrics.js";
import SiteMetrics2 from "./components/SiteMetrics2.js";
import SiteMetrics3 from "./components/SiteMetrics3.js";


function App() {
  return (
    <div className="App" style={{backgroundColor:"#21313C"}}>
      <h1 style={{color:"white", paddingTop:"3vh"}} >Telcom Sensor Data </h1>
      <div style={{ display: 'flex', paddingLeft: "20vw", paddingRight: "20vw", justifyContent: 'space-between', backgroundColor: "#21313C"}}>
        <div style={{width:"20vw"}}>
          <SiteMetrics />
          <div style={{textAlign:"justify", padding:"30px", border:"solid"}}>
          <text style={{color:"white"}}>
          Caphill AI summary <br></br>
          Status: Yellow <br></br>
            Analysis: <br></br>
- LTE signal strength shows significant fluctuation, with minimum values dropping from 74 to 30. <br></br>
- 5G signal has shown a drastic drop in minimum value down to 0, which is concerning for connectivity. <br></br>
- There is a high latency max value of 150, significantly escalating over the later time intervals. <br></br>
- LTE and 5G average values have decreased over the period, indicating potential degradation in performance.<br></br>
- Packet loss averages and maximums remain consistent, but the continued fluctuation requires monitoring.  </text>
          </div>
        </div>
        <div style={{ width:"20vw" }}>
          <SiteMetrics2 />
          <div style={{textAlign:"justify", padding:"30px", border:"solid"}}>
          <text style={{color:"white"}}>LoDo AI summary <br></br>
Status: Yellow <br></br>
Analysis: <br></br>
- Notable drop in LTE and 5G average signal strength from first to last entry (LTE: 91.3 to 63.24, 5G: 76.23 to 45.73). <br></br>
- Consistently low 5G minimum value of 0 suggests coverage issues or equipment malfunction. <br></br>
- Packet loss average increased from 0.57 to 1.33 over the period, indicating potential network instability. <br></br>
- Latency maximum spike to 150 ms in the last two entries, possibly impacting service quality.</text>
          </div>
        </div>
        <div style={{ width:"20vw" }}>
          <SiteMetrics3 />
          <div style={{textAlign:"justify", padding:"30px", border:"solid"}}>
          <text style={{color:"white"}}>Ch Creek AI summary <br></br>
Status: Yellow  <br></br>
Analysis:  <br></br>
- There is a significant drop in the LTE average from 91.29 to around 63 between the first and second periods, indicating potential issues with LTE performance. <br></br>
- The 5G minimum dropped to 0 in the last two periods, which suggests that there might be intermittent connectivity issues in the 5G network. <br></br>
- There is an observed spike in latency max values reaching 150 during the second and third periods, which could affect service quality, although average latency decreases slightly.</text>
          </div>

        </div>
      </div>
      <div style={{display:"flex", paddingLeft:"30vh"}}>
        <iframe style={{ background: "#21313C", border: "none", "border-radius": "2px", "box-shadow": "0 2px 10px 0 rgba(70, 76, 79, .2)", width: "100vw", height: "100vh", background: "#21313C", theme:"dark" }}  src="https://charts.mongodb.com/charts-sa-hackathon-fy25q4-remot-zjbxnim/embed/dashboards?id=da924d73-490a-4ec8-8cb6-b1cda9b160d0&theme=dark&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe>
      </div>
    </div>

  );
}

export default App;
