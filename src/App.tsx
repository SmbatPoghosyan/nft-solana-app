import React, {useEffect, useRef, useState} from 'react';
import {createQR} from "@solana/pay";
import QRCodeStyling from '@solana/qr-code-styling';

const App: React.FC = () => {
  const beUrl = process.env.REACT_APP_BE_URL || 'http://localhost:8080';
  const [qr, setQr]= useState<QRCodeStyling | null>(null);

  console.log(beUrl)
  const divRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const initialQr = createQR(beUrl, 256)
    setQr(initialQr)
  }, [])

  useEffect(() => {
    if(qr && divRef.current) {
      qr.append(divRef.current)
    }

  }, [qr])
  return (<div ref={divRef} />);
}

export default App;
