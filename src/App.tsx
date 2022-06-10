import React, {useEffect, useRef, useState} from 'react';
import {createQR} from "@solana/pay";
import QRCodeStyling from '@solana/qr-code-styling';

const App: React.FC = () => {
  const beUrl = process.env.REACT_APP_BE_URL || 'https://solana-nft-server.herokuapp.com/donate';
  const recipient = encodeURIComponent('recipient=BHmPGsD73MtK1XzFwNTuFYXoSsTcig7HWbwbq9MufBLv');
  const amount = encodeURIComponent('amount=0.1');
  const message = encodeURIComponent('message=send');

  const [qr, setQr]= useState<QRCodeStyling | null>(null);

  const divRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const fullURL = 'solana:' + beUrl + '?' + recipient + '&' + amount + '&' + message;
    console.log(fullURL)
    const initialQr = createQR(fullURL, 256)
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
