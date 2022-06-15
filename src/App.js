import React, {useEffect, useRef} from 'react';
import {createQR, encodeURL, TransactionRequestURLFields} from "@solana/pay";
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Products from "./components/Products";
import GlobalConfig from "./config";


function App() {

  const qrRef = useRef(null);
  const { publicKey } = useWallet()
  // Unique address that we can listen for payments to
  // const reference = useMemo(() => Keypair.generate().publicKey, [])

  const recipient = GlobalConfig.recipient;
  const amount = '0.1'

  // Show the QR code
  useEffect(() => {
    // window.location is only available in the browser, so create the URL in here
    const apiUrl = `${GlobalConfig.beUrl}/donate?recipient=${recipient}&amount=${amount}&label=Cookies Inc&message=Thanks for your order! 🍪`
    const urlParams = {
      link: new URL(apiUrl)
    }
    const solanaUrl = encodeURL(urlParams)
    console.log(`solanaUrl ${solanaUrl}`)
    const qr = createQR(solanaUrl, 512, 'transparent')
    if (qrRef.current) {
      qrRef.current.innerHTML = ''
      qr.append(qrRef.current)
    }
  })

  return (
      <div className="flex flex-col gap-8 max-w-4xl items-stretch m-auto pt-24">

        {/* We add the Solana wallet connect button */}
        <div className="basis-1/4">
          <WalletMultiButton className='!bg-gray-900 hover:scale-105' />
        </div>

        <div ref={qrRef}/>

        {/* We disable checking out without a connected wallet */}
        <Products submitTarget='/checkout' enabled={publicKey !== null} />
      </div>);
}

export default App;
