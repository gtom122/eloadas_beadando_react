import { useState, useEffect } from 'react';
import './MetronomStopper.css'; // Ugyanazt a CSS-t használjuk!

function Stopper() {
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [timerSet, setTimerSet] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [timerMessage, setTimerMessage] = useState('');

  useEffect(() => {
    let timer;
    let millisecondTimer;

    if (running) {
      timer = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
      millisecondTimer = setInterval(() => {
        setMilliseconds(prev => (prev + 1) % 10);
      }, 100);
    } else {
      clearInterval(timer);
      clearInterval(millisecondTimer);
    }

    if (timerSet && !timerActive) {
      if (seconds >= timerSet) {
        setTimerMessage('Lejárt az idő!');
        setTimerActive(true);
      }
    }

    return () => {
      clearInterval(timer);
      clearInterval(millisecondTimer);
    };
  }, [running, seconds, timerSet, timerActive]);

  const addLap = () => {
    setLaps(prevLaps => [...prevLaps, `${seconds}.${milliseconds}s`]);
  };

  const reset = () => {
    setSeconds(0);
    setMilliseconds(0);
    setRunning(false);
    setLaps([]);
    setTimerMessage('');
    setTimerSet(null);
    setTimerActive(false);
  };

  const setTimer = (time) => {
    setTimerSet(time);
    setTimerActive(false);
    setTimerMessage('');
  };

  return (
    <div className="container">
      <h2>⏱ Stopper</h2>
      <h1 className="timer">
        {seconds}.{milliseconds}s
      </h1>

      {/* Gombok */}
      <div className="controls">
        <button onClick={() => setRunning(true)} className="start">Start</button>
        <button onClick={() => setRunning(false)} className="stop">Stop</button>
        <button onClick={reset} className="reset">Reset</button>
        {running && <button onClick={addLap} className="lap">Köridő rögzítése</button>}
      </div>

      {/* Köridők */}
      <div className="laps">
        <h3>Köridők:</h3>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>Kör {index + 1}: {lap}</li>
          ))}
        </ul>
      </div>

      {/* Időzítő */}
      <div className="timer-settings">
        <h3>Időzítő:</h3>
        <input
          type="number"
          min="1"
          placeholder="Állíts be időt (mp)"
          onChange={(e) => setTimer(Number(e.target.value))}
        />
        <p>{timerMessage}</p>
      </div>
    </div>
  );
}

export default Stopper;
