import { useState, useEffect, useRef } from 'react';
import './MetronomStopper.css'; // 💡 Ne felejtsd el importálni a CSS-t!

export default function Metronom() {
  const [bpm, setBpm] = useState(120); // Ütem per perc
  const [isRunning, setIsRunning] = useState(false); // Fut-e a metronóm
  const [beat, setBeat] = useState(0); // Aktuális ütés
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4); // Hány ütés 1 ciklusban

  const audioRef = useRef(new Audio('/click.ogg')); // A hangfájl
  const intervalIdRef = useRef(null); // Az időzítő az ütésekhez

  const beatInterval = 60000 / bpm; // Egy ütés hossza ms-ben

  // Hang preload
  useEffect(() => {
    audioRef.current.load();
  }, []);

  // Metronóm logika
  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setBeat((prevBeat) => (prevBeat + 1) % beatsPerMeasure);
      }, beatInterval);
    } else {
      clearInterval(intervalIdRef.current);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [isRunning, bpm, beatsPerMeasure]);

  // Start/Stop gomb logikája
  const toggleMetronome = () => {
    if (isRunning) {
      clearInterval(intervalIdRef.current);
      setBeat(0); // reset
    }
    setIsRunning(!isRunning);
  };

  return (
    <div className="container">
      <h2>🎵 Metronóm</h2>

      {/* BPM beállítás */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="bpm">BPM:</label>
        <input
          id="bpm"
          type="number"
          min="40"
          max="300"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
        />
      </div>

      {/* Ütemciklus beállítása */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="measure">Ütem/ciklus:</label>
        <input
          id="measure"
          type="number"
          min="1"
          max="12"
          value={beatsPerMeasure}
          onChange={(e) => setBeatsPerMeasure(Number(e.target.value))}
        />
      </div>

      {/* Vizuális kör */}
      <div className={`circle ${beat === 0 ? 'green' : ''}`}></div>

      {/* Aktuális ütés */}
      <p style={{ fontSize: '1.2rem', fontFamily: 'monospace', marginBottom: '1rem' }}>
        Ütés: {beat + 1}
      </p>

      {/* Start / Stop */}
      <button onClick={toggleMetronome} className={isRunning ? 'stop' : 'start'}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  );
}
