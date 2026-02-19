import { useState } from "react";
import "./App.css";

function App() {
  const [premium, setPremium] = useState("");
  const [mv, setMv] = useState(null);
  const [entry, setEntry] = useState("");
  const [targets, setTargets] = useState(null);

  const calculateMV = () => {
    const value = parseFloat(premium);
    if (!value) return;

    let buffer = 0;

    if (value < 50) {
      buffer = 0.20;
    } else if (value >= 51 && value <= 100) {
      buffer = 0.15;
    } else if (value >= 101) {
      buffer = 0.10;
    }

    const calculatedMV = value + value * buffer;
    setMv(calculatedMV.toFixed(2));
    setTargets(null);
  };

  const calculateTargets = () => {
    const price = parseFloat(entry);
    if (!price) return;

    const t15 = price + price * 0.15;
    const t30 = price + price * 0.3;
    const t45 = price + price * 0.45;

    setTargets({
      t15: t15.toFixed(2),
      t30: t30.toFixed(2),
      t45: t45.toFixed(2),
    });
  };

  // ✅ CLEAR FUNCTION
  const clearAll = () => {
    setPremium("");
    setMv(null);
    setEntry("");
    setTargets(null);
  };

  return (
    <div className="app">
      <div className="card">
        <h1>
          NIFTY -
          <span style={{ color: "whitesmoke" }}> MV </span>
          <span style={{ color: "red" }}>SETUP</span>
        </h1>

        {/* Step 1 */}
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

            {/* Step 2 */}
            <input
              type="number"
              placeholder="Enter Entry Price"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />

            <button onClick={calculateTargets}>
              Calculate Targets
            </button>
          </>
        )}

        {targets && (
          <>
            <div className="targets">
              <div>15% Target : ₹ {targets.t15}</div>
              <div>30% Target : ₹ {targets.t30}</div>
              <div>45% Target : ₹ {targets.t45}</div>
            </div>

            {/* ✅ CLEAR BUTTON (only after target calculation) */}
            <button onClick={clearAll} className="clear-btn">
              Clear 
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
