import React, { useContext } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import logo from '../asserts/logo.png'
import { useAuth } from '../AutoCotext.jsx'

export default function Navbar({children}) {
  const { SetCurrency}= useAuth();
   
 
  const handleCurrency = (e) => {
    switch (e.target.value) {
      case 'usd': SetCurrency({ name: 'usd', Symbol: '$' });
        break;
      case 'inr': SetCurrency({ name: 'inr', Symbol: '₹' });
        break;
      case 'eur': SetCurrency({ name: 'eur', Symbol: '€' });
        break;
      default: SetCurrency({ name: 'inr', Symbol: '₹' });
        break;
    }
  }
  return (
    <>
      <header>

        <div className="navbar">
          <div className='path1'>
            <div className='name'>
              <img src={logo} alt="logo" width={60} />
              <Link to="/login" className='log'><div className="todo">CryptoPlace</div></Link>
            </div>

            <ul className="path2">

              <select className="currency" onChange={handleCurrency}>
              <option value="usd">USD</option>
                <option value="inr">INR</option>
                <option value="eur">EUR</option>
              </select>
              <Link to="/" className='log'> <li>Login</li></Link>
              <Link to="/Register" className='log'> <li>Register</li></Link>


            </ul>
          </div>
        </div>
      </header>
    </>
  )
}
