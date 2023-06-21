import React , {useState} from 'react'
import CryptoPaymentsForm, { CHAIN_IDS } from '../CryptoPaymentsForm';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';
import { Radio, Select } from 'antd';


const Crypto = () => {

    const currencyOptions = [
        {
            name: CHAIN_IDS.ETHEREUM.NAME,
            value: CHAIN_IDS.ETHEREUM.CURRENCY_CODE,
        },
        {
            name: CHAIN_IDS.BINANCE.NAME,
            value: CHAIN_IDS.BINANCE.CURRENCY_CODE,
        }
    ]
    
    const networkOptions = [
        {
            value: "testnet",
        },
        {
            value: "mainnet",
        }
    ]
    const [currency, setCurrency] = useState(currencyOptions[0].value);
    const [network, setNetwork] = useState(networkOptions[0].value);
    /*const handleAmountChange = (value: any) => {
        setPaymentAmount(value);
      }
  
      const handleCurrencyChange = (event: any) => {
          setCurrency(event.target.value);
      }*/
  
  const selectCurrency = (
          <Radio.Group value={currency} onChange={event => setCurrency(event.target.value)} optionType="button" buttonStyle="solid" className="mb-3">
              {currencyOptions.map(currencyOption => (<Radio.Button key={currencyOption.value} value={currencyOption.value}>{currencyOption.name}</Radio.Button>))}
        </Radio.Group>
      )
      const selectNetwork = (
          <Radio.Group value={network} onChange={event => setNetwork(event.target.value)} optionType="button" buttonStyle="solid" className="mb-3">
              {networkOptions.map(currencyOption => (<Radio.Button key={currencyOption.value} value={currencyOption.value}>{currencyOption.value}</Radio.Button>))}
        </Radio.Group>
      )
  
    return (
        <div className="my-3">
            <h1>
                Have You Payed A Parking Lot Using Ethereum Or Binance ? 
                Let's Give It A Try ! 
            </h1>
           
        <div className="ml-5 pl-5">
        {selectCurrency}<br/>
        {selectNetwork}<br/>
        <CryptoPaymentsForm currency={currency} isTestNet={network === "testnet"}  />
       </div> 
        </div>
    )
}

export default Crypto;
