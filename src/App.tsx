import React, {useEffect, useRef, useState} from 'react';
import {createQR} from "@solana/pay";
import QRCodeStyling from '@solana/qr-code-styling';

const App: React.FC = () => {
  const beUrl = process.env.REACT_APP_BE_URL || 'solana:https://solana-nft-server.herokuapp.com/donate' +
    '?recipient=BHmPGsD73MtK1XzFwNTuFYXoSsTcig7HWbwbq9MufBLv' +
    '&amount=0.1' +
    '&message=send SOL to alex wallet';
  const encodedUrl = encodeURI(beUrl)
  const [qr, setQr]= useState<QRCodeStyling | null>(null);

  console.log(encodedUrl)
  const divRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const initialQr = createQR(encodedUrl, 256)
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
