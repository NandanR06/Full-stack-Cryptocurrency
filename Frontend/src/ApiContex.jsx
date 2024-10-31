import React, { createContext, useContext, useEffect, useState } from 'react';

export const data = createContext();

 const Context = () => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, SetCurrency] = useState({
        name: 'inr',
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

      return(
        <data.Provider value={{allCoin,setAllCoin,SetCurrency}}>
    
        </data.Provider>
      )
}
export default Context;