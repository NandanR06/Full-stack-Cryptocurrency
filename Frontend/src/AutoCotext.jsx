
import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();
// export const api = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [allCoin, setAllCoin] = useState([]);
  const [currency, SetCurrency] = useState({
    name: "usd",
    Symbol: "$"
  })
  const fetchAllCoin = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-pro-api-key': '  CG-ecZCniDj5NrUNtthfR3HCqbN	'
      }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`, options)
      .then(res => res.json())
      .then(res => {
        setAllCoin(res);
        console.log(res)
      }
      )
      .catch(err => console.error(err));
  }
  useEffect(() => {
    fetchAllCoin();

  }, [currency])


  const login = (token) => {
    localStorage.setItem('authToken', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };


  return (
    <AuthContext.Provider value={{ token, login, logout, currency, allCoin, SetCurrency }}>
        {children}
    </AuthContext.Provider>
  );
};
