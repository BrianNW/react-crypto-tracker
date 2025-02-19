import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import './Darkmode.css'
import Coin from './Coin'
import {
  getFavorites,
  toggleFavorite as toggleFavoriteLogic
} from './favorites'; // adjust the path if needed

function App() {  
  const [coins, setCoins] = useState([]) // Set coin state
  const [search, setSearch] = useState("") // Coin search state
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false); // Button load state
  const [message, setMessage] = useState(""); // State for notification message
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle mobile menu
  const [darkMode, setDarkMode] = useState(false); // Dark mode state


  const fetchData = async () => {
    setLoading(true); // Show loading when fetching
    setMessage(""); // Clear old message
    console.log("Fetching new data...");
    try {
      const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true");
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
    // Load favorites from local storage on mount
    setFavorites(getFavorites());
    fetchData();
    // let interval = setInterval(fetchData, 10000); // Refresh every 10 seconds
  
    // return () => clearInterval(interval); // Cleanup on unmount
  }, []);



  // handle the search input using the useState above
  const handleChange = e => {
    setSearch(e.target.value)
  }

  const handleToggleFavorite = (coin) => {
    // Use the favorites logic to toggle the coin and update state
    const updatedFavorites = toggleFavoriteLogic(coin);
    setFavorites(updatedFavorites);
  };

  const filteredCoins = coins.filter(coin => 
  coin.name.toLowerCase().includes(search.toLowerCase())
)

  return (
     // Apply the 'dark-mode' class if darkMode is true
     <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>

      <nav id="nav-container">
      <h1><a href="#" id="site-title"> Crypto Tracker </a>  </h1>     
          
           {/* Hamburger Icon */}
          <button id="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>

          <ul id="navbar" className={menuOpen ? "open" : ""}>            
            <li className="navitem"><a href="#">Home</a></li>
            <li className="navitem"><a href="#">Login</a></li>
            <li className="navitem"><a href="#">Contact</a></li>
            <li className="navitem"><a href="#">About</a></li>
          </ul>

          {/* Dark Mode Toggle Switch */}
          <div className="dark-mode-toggle">
            <input
              type="checkbox"
              id="darkModeSwitch"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <label htmlFor="darkModeSwitch"></label>
          </div>

          <span className="dark-mode-label">
            {darkMode ? "Dark Mode" : "Light Mode"}
          </span>

      </nav>
     <div className = "coin-container">              
        <div className = "coin-search">
          <h1 className="coin-text">Search a currency</h1>
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
            <p className="coin-change">7 Day Change</p>
         </div>

         {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="favorites-section">
            <h2 className="favorites-title">Favorites</h2>
            {favorites.map((fav) => (
              <Coin
                key={fav.id}
                coin={fav} // passing the whole coin object
                name={fav.name}
                image={fav.image}
                symbol={fav.symbol}
                price={fav.current_price}
                volume={fav.total_volume}
                marketcap={fav.market_cap}
                priceChange={fav.price_change_percentage_24h}
                sparkline={fav.sparkline_in_7d?.price || []}
                isFavorite={true} // since it's in favorites, always true
                toggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
     <div className="currency-list-title"> <h2>Currency List</h2>
        {/* map out coin data to the page */}
        {filteredCoins.map(coin => {
          return (
            <Coin             
            key={coin.id}
            coin={coin}
            isFavorite={favorites.some((fav) => fav.id === coin.id)}
            toggleFavorite={handleToggleFavorite} 
            name={coin.name} 
            image={coin.image} 
            symbol={coin.symbol} 
            marketcap={coin.market_cap} 
            price={coin.current_price}            
            volume={coin.total_volume} 
            priceChange={coin.price_change_percentage_24h}
            sparkline={coin.sparkline_in_7d?.price || []}
            />
          )
        })}
        </div>
        </div> 
      </div>
       {/* Footer */}
       <footer id="footer">
        <p>© {new Date().getFullYear()} All Rights Reserved. Built by <a href="https://aureusdigitalsolutions.agency" target="_blank" rel="noopener noreferrer">Aureus Digital Solutions</a></p>
      </footer>
    </div>     
     
  )
}

export default App
