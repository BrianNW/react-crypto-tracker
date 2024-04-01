import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {  
  const [coins, setCoins] = useState([])

  useEffect(() => {
     axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd").then(res => {
      setCoins(res.data);
      console.log(res.data)
     }).catch(()=> console.log(error))
  
  }, [])

  return (
    <>
      <div>
        <h1>Cryptoyz Tracker</h1>
      </div>
      
    </>
  )
}

export default App
