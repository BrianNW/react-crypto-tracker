import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {  
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
     axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd").then(res => {
      setCoins(res.data);
      console.log(res.data)
     }).catch(()=> console.log(error))
  
  }, [])

  const handleChange = e => {
    setSearch(e.target.value)
  }

  return (
      <div className = 'coin-app'>
        <div className = 'coin-search'>
          <h1 className="coin-text">Search a currency</h1>
          <form> 
            <input type="text" placeholder="Search" className="coin-input" />
          </form>
        </div>
      </div>
  )
}

export default App
