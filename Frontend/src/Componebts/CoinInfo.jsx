import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../AutoCotext';
import axios from 'axios'
import './CoinInfo.css'
import Footer from './Footer';
const url = 'http://localhost:5000';

export default function CoinInfo() {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, SetHistoricalData] = useState(null);
  const { currency } = useAuth();

  const fetchCoin = async () => {
    await axios.get(`${url}/coin/${id}`)
      .then((res) => {
        console.log(res.data);
        setCoinData(res.data);
      })
      .catch((err) => { console.error(err) })
  }


  const fetchHistoricalData = async () => {
    await axios.get(`${url}/coin/${id}`)
      .then((res) => {
        console.log(res.data);
        SetHistoricalData(res.data);
      })
      .catch(err => { console.log(err) })


  }


  useEffect(() => {
    fetchCoin()
    // fetchHistoricalData();
  }, [currency])


  if (coinData) {
    return (
      <div className='coin' >

         <img src={coinData.info1.image.large} alt='coin-image' />
        <p>{coinData.name}({coinData.info1.symbol.toUpperCase()})</p> 
        {/* <pre>{JSON.stringify(coinData.info1, null, 2)}</pre> */}
        <Footer />
      </div>
    )
  }
  else {
    return (
      <div className="spin">
        <div className="spinner"></div>
      </div>
    )
  }


}
