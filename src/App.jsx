import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Coin from './Coin'

function App() {  
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false); //button load state
  const [message, setMessage] = useState(""); // State for notification message


  const fetchData = async () => {
    setLoading(true); // Show loading when fetching
    setMessage(""); // Clear old message
    console.log("Fetching new data...");
    try {
      const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
      setCoins(res.data);
      //Show success message after fetching
      setMessage("✅ Data updated successfully!");

      // Hide message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false); // Hide loading when done
  };

  // Use fetchData inside useEffect to fetch when the page loads
  useEffect(() => {
    fetchData();

    // let interval = setInterval(fetchData, 10000); // Refresh every 10 seconds
  
    // return () => clearInterval(interval); // Cleanup on unmount
  }, []);



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
     <div className = "coin-container">              
        <div className = "coin-search">
          <h1 className="coin-text">Search a currency.  (This is only a demo)</h1>
          <span> Prices shown in USD.</span>
          <span> Don't see any data appear? Wait a few seconds before refreshing. This is due to the free API fetch limitation.</span>
          <form> 
            <input type="text" placeholder="Search" className="coin-input" onChange= {handleChange}/>
          </form>

          {/* Refresh Button */}
          <button onClick={fetchData} disabled={loading} className="refresh-btn">
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>

           {/* Notification Message */}
           {message && <p className="refresh-notification">{message}</p>}
        </div>
        <div className ="coin-app">
          {/* Table Header */}
          <div className="coin-header">
            <p className="coin-title">Coin</p>
            <p className="coin-symbol">Symbol</p>
            <p className="coin-price">Price (USD)</p>
            <p className="coin-volume">24h Volume</p>
            <p className="coin-marketcap">Market Cap</p>
            <p className="coin-change">24h Change (%)</p>
         </div>
        {/* map out coin data to the page */}
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
      </div>
    </>     
     
  )
}

export default App
