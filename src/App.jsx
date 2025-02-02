import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Coin from './Coin'

function App() {  
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
     axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd").then(res => {
      setCoins(res.data);
      console.log(res.data)
     }).catch((e)=> console.log(e))
  
  }, [])

  // handle the search input using the useState above
  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => 
  coin.name.toLowerCase().includes(search.toLowerCase())
)

  return (
    <>
      <nav id="nav-container">
        <span id="logo-container"> <a href=""><img src="../public/aureus-logo.png" alt="logo" id="logo" /></a> </span>
          <ul id="navbar">            
            <li className="navitem"><a href="#">Home</a></li>
            <li className="navitem"><a href="#">Login</a></li>
            <li className="navitem"><a href="#">Contact</a></li>
            <li className="navitem"><a href="#">About</a></li>
          </ul>
      </nav>
     <div className = 'coin-app'>         
        <div className = 'coin-search'>
          <h1 className="coin-text">Search A Currency</h1>
          <span> Prices shown in USD.</span>
          <span> Don't see any data appear? Wait a few seconds before refreshing. This is due to the free API fetch limitation.</span>
          <form> 
            <input type="text" placeholder="Search" className="coin-input" onChange= {handleChange}/>
          </form>
        </div>
        {filteredCoins.map(coin => {
          return (
            <Coin 
            key={coin.id} 
            name={coin.name} 
            image={coin.image} 
            symbol={coin.symbol} 
            marketcap={coin.market_cap} 
            price={coin.current_price} 
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
            />
          )
        })}
      </div>
    </>     
     
  )
}

export default App
