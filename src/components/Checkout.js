// import { findTransactionSignature } from "@solana/pay";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Keypair, Transaction } from "@solana/web3.js";
import {useParams, useSearchParams} from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import GlobalConfig from "../config";

export default function Checkout() {
    const [searchParams] = useSearchParams();
    const total = searchParams.get('total');
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    // State to hold API response fields
    const [transaction, setTransaction] = useState(null);
    const [message, setMessage] = useState(null);


    // Generate the unique reference which will be used for this transaction
    const reference = useMemo(() => Keypair.generate().publicKey, []);

    const recipient = GlobalConfig.recipient;

    // Use our API to fetch the transaction for the selected items
    async function getTransaction() {
        if (!publicKey) {
            return;
        }

        const body = {
            account: publicKey.toString(),
        }

        console.log(`${GlobalConfig.beUrl}/donate?recipient=${recipient}&amount=${total}&label=Cookies Inc&message=Thanks for your order! 🍪`)

        const response = await fetch( `${GlobalConfig.beUrl}/donate?recipient=${recipient}&amount=${total}&label=Cookies Inc&message=Thanks for your order! 🍪`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })

        const json = await response.json()

        console.log(json, 'resss')

        if (response.status !== 200) {
            console.error(json);
            return;
        }

        // Deserialize the transaction from the response
        const transaction = Transaction.from(Buffer.from(json.transaction, 'base64'));
        setTransaction(transaction);
        setMessage(json.message);
        console.log(transaction);
    }

    useEffect(() => {
        getTransaction()
    }, [publicKey])

    // Send the fetched transaction to the connected wallet
    async function trySendTransaction() {
        if (!transaction) {
            return;
        }
        try {
            await sendTransaction(transaction, connection)
        } catch (e) {
            console.error(e)
        }
    }

    // Send the transaction once it's fetched
    useEffect(() => {
        trySendTransaction()
    }, [transaction])


    if (!publicKey) {
        return (
            <div className='flex flex-col gap-8 items-center'>

                <WalletMultiButton />

                <p>You need to connect your wallet to make transactions</p>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-8 items-center'>

            <WalletMultiButton />

            {message ?
                <p>{message} Please approve the transaction using your wallet</p> :
                <p>Creating transaction... </p>
            }
        </div>
    )
}
