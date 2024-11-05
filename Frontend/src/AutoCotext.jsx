
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'
const url = "https://cryptocurrency-3fh8.onrender.com"
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [allCoin, setAllCoin] = useState([]);
  const [currency, SetCurrency] = useState({
    name: "usd",
    Symbol: "$"
  })

  const fetchAllCoin = async () => {
    axios.get(`${url}/login`)
    .then((res)=>{
       setAllCoin(res.data)
      console.log(res.data)
    })
    .catch(err=>console.log(err))
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
