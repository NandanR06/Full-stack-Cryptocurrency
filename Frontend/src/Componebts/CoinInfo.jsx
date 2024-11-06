import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../AutoCotext';
import axios from 'axios'
import './CoinInfo.css'
import Footer from './Footer';
import Linechart from './Linechart';
const url = 'https://cryptocurrency-3fh8.onrender.com';

export default function CoinInfo() {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, SetHistoricalData] = useState(null);
  const { currency } = useAuth();

  const fetchCoin = async () => {
    await axios.get(`${url}/coin/${id}`)
      .then((res) => {
        console.log(res.data);
        setCoinData(res.data.info1);
        SetHistoricalData(res.data.info2);
      })
      .catch((err) => { console.error(err) })
  }


  


  useEffect(() => {
    fetchCoin()
  }, [currency])


  if (coinData) {
    return (
      <div className='coin' >
         <img src={coinData.image.large} alt='coin-image' />
        <p>{coinData.name}({coinData.symbol.toUpperCase()})</p> 

        <div className="chart-info">
          <Linechart historicalData={historicalData}/>
        </div>
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
