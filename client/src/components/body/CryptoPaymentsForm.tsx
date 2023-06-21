import  React, { useState } from  'react'
import { ethers } from 'ethers'
import { Network } from '@ethersproject/providers';

declare global {
    interface Window {
        ethereum:any;
    }
}

export  interface  TransactionResponsePayment  extends  ethers.providers.TransactionResponse {
	network?: ethers.providers.Network,
}

const DEFAULT_ADRESS ="0x538642a5f4554a6f42381760f0b51e4203812a82"


// You get these ids from Chainlist

export const CHAIN_IDS =  {
    BINANCE: {
        NAME: "Binance",
        CURRENCY_CODE: "BNB",
        MAIN_NET: {
            ID: 56
        },
        TEST_NET: {
            NAME: "testnet",
            ID: 97,
        }
    },
    ETHEREUM: {
        NAME: "Ethereum",
        CURRENCY_CODE: "ETH",
        MAIN_NET: {
            ID: 1
        },
        ROPSTEN: {
            NAME: "ropsten",
            ID: 3
        }
    }
}
// add proptypes

interface CryptoPaymentFormPropTypes {
    isTestNet?: boolean;
    currency?: string;
}

CryptoPaymentsForm.defaultProps = {
    isTestNet: true,
    currency: "ETH",
};

function CryptoPaymentsForm(props: CryptoPaymentFormPropTypes) {

        const { currency, isTestNet } = props;

		const [amount, setAmount] = useState(0);

		const [destinationAddress, setDestinationAddress] = useState(DEFAULT_ADRESS);

		const [error, setError] = useState(""); 

		const [transaction, setTransaction] = useState<ethers.providers.TransactionResponse | null >(null); 
		
		let networkName : any ;
		let blockExplorerHost = "etherscan.io";
		
		if (currency === CHAIN_IDS.BINANCE.CURRENCY_CODE){
			blockExplorerHost = "bscscan.com"
		}

		if (isTestNet){
			networkName = currency === CHAIN_IDS.BINANCE.CURRENCY_CODE ? CHAIN_IDS.BINANCE.TEST_NET.NAME:
			blockExplorerHost = `${networkName}.${blockExplorerHost}`
		}else{
			networkName = "mainnet"
		}
		
const  startPayment = async (event: any) => { 
		setError("");
		setTransaction(null);

		event.preventDefault();
try {

	if (!window.ethereum) {
		throw  new  Error("No crypto wallet found. Please install it.");
	}

		await  window.ethereum.send("eth_requestAccounts");

		const  provider = new  ethers.providers.Web3Provider(window.ethereum);
		const  network = await  provider.getNetwork();

		const { isCorrectNetwork, message } = checkCorrectNetwork(network);

                if (!isCorrectNetwork) {
                    throw new Error(message)
                }

		const  signer = provider.getSigner();
		ethers.utils.getAddress(destinationAddress);

		const  transactionResponse = await  signer.sendTransaction({

			to:  destinationAddress,

			value:  ethers.utils.parseEther(amount.toString())

		}) as  TransactionResponsePayment;

		transactionResponse.network = network;

	
		console.log({transactionResponse});
		setTransaction(transactionResponse); 
		

	} catch (error: any) {

		console.log({error});
		setError(error.message);

	}
}
			 const checkCorrectNetwork = (network: Network) => {
				let expectedChainId;
		 
			 if (currency === CHAIN_IDS.ETHEREUM.CURRENCY_CODE) {
				 if (isTestNet) {
					 expectedChainId = CHAIN_IDS.ETHEREUM.ROPSTEN.ID;
				 } else {
					 expectedChainId = CHAIN_IDS.ETHEREUM.MAIN_NET.ID;
		 
				 }
			 } else if (currency === CHAIN_IDS.BINANCE.CURRENCY_CODE) {
				 if (isTestNet) {
					 expectedChainId = CHAIN_IDS.BINANCE.TEST_NET.ID;
				 } else {
					 expectedChainId = CHAIN_IDS.BINANCE.MAIN_NET.ID;
				 }
			 }
		 
			 if (network.chainId !== expectedChainId) {
				 const actualNetworkName = [CHAIN_IDS.BINANCE.TEST_NET.ID, CHAIN_IDS.ETHEREUM.ROPSTEN.ID].includes(network.chainId) ? "testnet" : "mainnet";
				 const actualCurrency = [CHAIN_IDS.BINANCE.MAIN_NET.ID, CHAIN_IDS.BINANCE.TEST_NET.ID].includes(network.chainId)? CHAIN_IDS.BINANCE.CURRENCY_CODE : CHAIN_IDS.ETHEREUM.CURRENCY_CODE;
				 return {isCorrectNetwork: false, message: `Change your crypto wallet network. Expected "${isTestNet ? "testnet" : "mainnet"}" network (${networkName}) for currency: ${currency}.
				  Instead received "${actualNetworkName}" network (${network.name}) for currency: ${actualCurrency}.`}
			 }
			 return { isCorrectNetwork: true, message: "" }
		 }

return (

	<div  className="m-5 p-5 card shadow text-center">

		{/* added onChange and onClick attributes */}

		<input  type="number"  placeholder="Amount" value={amount}  className="col-12 form-control mb-3"  onChange={event  => {setAmount(Number.parseFloat(event.target.value))}}  />
				<div className="input-group mb-3">
			<div className="input-group-prepend">
				<span className="input-group-text">{`${currency} ${networkName}`}</span>
			</div>
			
		</div>
		<input  placeholder="Destination address" value={destinationAddress}  className="col-12 form-control mb-3"  onChange={event  => {setDestinationAddress(event.target.value)}}  />

		<button  className="col-12 btn btn-primary"  onClick={startPayment}>

			Send Payment

		</button>
		{transaction &&

				<div  className="alert alert-success mt-3"  role="alert">

				{JSON.stringify(transaction)}

				</div>


				}

				{error &&

				<div  className="alert alert-danger"  role="alert">

				{JSON.stringify(error)}

				</div>

				}

					</div>)

				}


export  default  CryptoPaymentsForm