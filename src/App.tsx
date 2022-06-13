import React, {useEffect, useRef} from 'react';
import {createQR, encodeURL, TransactionRequestURLFields} from "@solana/pay";

const App: React.FC = () => {

  const qrRef = useRef<HTMLDivElement>(null)

  // Unique address that we can listen for payments to
  // const reference = useMemo(() => Keypair.generate().publicKey, [])

  const recipient = 'BHmPGsD73MtK1XzFwNTuFYXoSsTcig7HWbwbq9MufBLv'
  const amount = '0.1'

  // Show the QR code
  useEffect(() => {
    // window.location is only available in the browser, so create the URL in here
    const apiUrl = `https://f75d-83-139-4-54.eu.ngrok.io/donate?recipient=${recipient}&amount=${amount}`
    const urlParams: TransactionRequestURLFields = {
      link: new URL(apiUrl),
      label: "Cookies Inc",
      message: "Thanks for your order! 🍪",
    }
    const solanaUrl = encodeURL(urlParams)
    console.log(`solanaUrl ${solanaUrl}`)
    const qr = createQR(solanaUrl, 512, 'transparent')
    if (qrRef.current) {
      qrRef.current.innerHTML = ''
      qr.append(qrRef.current)
    }
  })


  return (<div ref={qrRef}/>);
}

export default App;
