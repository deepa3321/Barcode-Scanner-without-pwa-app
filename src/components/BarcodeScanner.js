import React, { useState } from 'react';
import Quagga from 'quagga';
import './BarcodeScanner.css';

function BarcodeScanner() {
  const [scannedCode, setScannedCode] = useState('');
  const [scanning, setScanning] = useState(false);

  const startScanner = () => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#barcode-scanner'),
        },
        decoder: {
          readers: ['code_128_reader'],
        },
      },
      function (err) {
        if (err) {
          console.error('Error initializing Quagga:', err);
          return;
        }
        Quagga.start();
        Quagga.onDetected(handleScan);
        setScanning(true); 
      }
    );
  };

  const handleScan = (result) => {
    const scannedValue = result.codeResult.code;
    setScannedCode(scannedValue);
    Quagga.stop();
    setScanning(false);
  };

  return (
    <div className="container">
      <div className={`scanner ${scanning ? 'scanning' : ''}`}>
        <div id="barcode-scanner"></div>
      </div>
      {scannedCode && (
        <div className="input-container">
          <input
            type="text"
            placeholder="Scanned Value"
            value={`Scanned Value: ${scannedCode}`}
            readOnly
            className="input-box"
          />
        </div>
      )}
      <button onClick={startScanner} disabled={scanning}>
        {scanning ? 'Scanning...' : 'Start Scanner'}
      </button>
    </div>
  );
}

export default BarcodeScanner;
