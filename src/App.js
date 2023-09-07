import React from 'react';
import './App.css';
import BarcodeScanner from './components/BarcodeScanner';

function App() {
  return (
    <div className="App">
        <h1>Barcode Scanner</h1>
      <main>
        <BarcodeScanner />
      </main>
    </div>
  );
}

export default App;
