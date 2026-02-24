import { useState } from "react";
import "./App.css";

function App() {
  const [premium, setPremium] = useState("");
  const [mv, setMv] = useState(null);
  const [targets, setTargets] = useState(null);

  const calculateMV = () => {
    const value = parseFloat(premium);
    if (!value) return;

    let buffer = 0;

    if (value < 50) buffer = 0.2;
    else if (value >= 51 && value <= 100) buffer = 0.15;
    else buffer = 0.1;

    const calculatedMV = value + value * buffer;
    const mvValue = parseFloat(calculatedMV.toFixed(2));

    setMv(mvValue);

    // 🎯 Calculate targets directly from MV
    const t15 = mvValue + mvValue * 0.15;
    const t30 = mvValue + mvValue * 0.30;
    const t50 = mvValue + mvValue * 0.50;
    const t100 = mvValue + mvValue * 1.0;

    setTargets({
      t15: t15.toFixed(2),
      t30: t30.toFixed(2),
      t50: t50.toFixed(2),
      t100: t100.toFixed(2),
    });
  };

  const clearAll = () => {
    setPremium("");
    setMv(null);
    setTargets(null);
  };

  return (
    <div className="app">
      <div className="card">
        <h1>
          NIFTY <span className="highlight">MV SETUP</span>
        </h1>

        <input
          type="number"
          placeholder="Enter Premium Value"
          value={premium}
          onChange={(e) => setPremium(e.target.value)}
        />

        <button onClick={calculateMV}>Calculate MV</button>

        {mv && (
          <>
            <div className="mv-display">MV : ₹ {mv}</div>

            <div className="targets">
              <div>15% Target : ₹ {targets?.t15}</div>
              <div>30% Target : ₹ {targets?.t30}</div>
              <div>50% Target : ₹ {targets?.t50}</div>
              <div>100% Target : ₹ {targets?.t100}</div>
            </div>

            <button className="clear-btn" onClick={clearAll}>
              New Calculation
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;