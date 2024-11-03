
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../AutoCotext.jsx';
import { Link } from 'react-router-dom';
import './CoinInfo.css'
import './Protected.css'
import Footer from './Footer.jsx';

export default function Protected({ children }) {
  const history = useNavigate();
  const { token, allCoin, currency } = useAuth();

  const [displayCoin, setDisplayCoin] = useState([]);
  const [input,setInput]=useState("");

  useEffect(() => {
    setDisplayCoin(allCoin)
  }, [allCoin])
 
  
  const handelInputData=(event)=>{
        setInput(event.target.value);
        if(event.target.value ==""){
          setDisplayCoin(allCoin)
        }
  }

const submitInfo= async(e)=>{
  e.preventDefault();
  const coin =await allCoin.filter((e)=>{
    return e.name.toLowerCase().includes(input.toLowerCase())
  })
  setDisplayCoin(coin);
}
  useEffect(() => {
    if (token) {
      const logout = setTimeout(() => {
        localStorage.removeItem('authToken');
        window.location.reload();
        history('/');
      }, 300000);
      return () => clearTimeout(logout);
    }
  }, [history]);

  if (!token) {
    return <Navigate to={"/"} />
  }

  if(displayCoin){
    return (
      <div className='protected'>
        <div className="hero">
          <h1>Largest <br />Crypto MarketPlace</h1>
          <p>Welcome to the world's largest  crypto currency marketplace.<br /> Sign up to explore more about crypto.</p>
          <form  onSubmit={submitInfo}>
            <input type="text" placeholder='Search crypto..'  list='mylist' onChange={handelInputData} value={input} required/>
            <datalist id='mylist'>{allCoin.map((item,index)=>(<option key={index} value={item.name}/>))}</datalist>
            <button type='submit'>Search</button>
          </form>
        </div>
        <div className="crypto-table">
          <div className="table-layout">
            <p>#</p>
            <p>Coins</p>
            <p>Price</p>
            <p style={{ textAlign: 'center' }}>24H change</p>
            <p style={{ textAlign: "end" }}>Market   Cap</p>
          </div>

          {displayCoin.slice(0, 10).map((item, index) => (
          
            <Link  to={`/coin/${item.id}`} key={index} className='table-layout1 Link '>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" width={40} /> <p>{item.name + "-" + item.symbol}</p>
              </div>
              <p>{currency.Symbol}{item.current_price.toLocaleString()}</p>
              <p style={{ textAlign: 'center' }}  className={item.price_change_24h>0?"green":"red"}>{Math.floor(item.price_change_24h*100)/100}</p>
              <p style={{ textAlign: "end" }}>{currency.Symbol}{item.market_cap.toLocaleString()}</p>
            </Link>))}
        </div>
        <Footer/>
      </div>
    )
   
  }
  else{
    return(
      <div className="spin">
        <div className="spinner"></div>
      </div>
    )
  }
  
}
