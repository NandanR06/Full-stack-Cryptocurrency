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

  useEffect(()=>{
    const disableRightClick=(e)=>{
      e.preventDefault();
    }
    document.addEventListener("contextmenu",disableRightClick);
    return()=>{document.removeEventListener('contextmenu',disableRightClick)};
  },[])


  if (coinData) {
    return (
      <div className='coin' >
        <img src={coinData.image.large} alt='coin-image' />
        <p  className='coin-name'>{coinData.name}  ({coinData.symbol.toUpperCase()})</p>

        <div className="chart-data">
          <Linechart historicalData={historicalData} />
        </div>

        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>

          <ul>
            <li>Crypto Market Rank</li>
            <li>{currency.Symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>{currency.Symbol}{coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>

          <ul>
            <li>24 Hour High</li>
            <li>{currency.Symbol}{coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>

          <ul>
            <li>24 Hour Low</li>
            <li>{currency.Symbol}{coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
        </div>
        
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
