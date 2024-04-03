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
      <div className = 'coin-app'>
        <div className = 'coin-search'>
          <h1 className="coin-text">Search a currency</h1>
          <form> 
            
          </form>
        </div>
      </div>
  )
}

export default App
