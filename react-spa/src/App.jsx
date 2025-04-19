import { useState } from 'react';
import Stopper from './components/Stopper';
import Metronome from './components/Metronome';

function App() {
  const [page, setPage] = useState('stopper');

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <nav style={{ marginBottom: '1rem' }}>
        <button onClick={() => setPage('stopper')}>Stopper</button>
        <button onClick={() => setPage('metronome')}>Metronome</button>
      </nav>

      <hr />

      {page === 'stopper' && <Stopper />}
      {page === 'metronome' && <Metronome />}
    </div>
  );
}

export default App;
