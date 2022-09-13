import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { ThemeProvider } from './Context/ThemeContext'
import Home from "./Routes/Home";
import Signin from './Routes/Signin'
import Signup from './Routes/Signup' 
import Account from './Routes/Account'
import CoinPage from './Routes/CoinPage'
import axios from "axios";
import Footer from "./Components/Footer";
import { AuthContextProvider } from "./Context/AuthContext";

function App() {
  
  const [coins, setCoins] =useState([])
  
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true'

  useEffect (() => {
    axios.get(url).then((response) => {
      setCoins(response.data)
      console.log(response.data)
    })
  },[url])

  return (
    <ThemeProvider>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home coins={coins} />}></Route>
          <Route path='/Signin' element={<Signin />}></Route>
          <Route path='/Signup' element={<Signup />}></Route>
          <Route path='/Account' element={<Account />}></Route>
          <Route path="/coin/:coinId" element={<CoinPage />}> 
            <Route path=":coinId" />
          </Route>
        </Routes>
        <Footer />
      </AuthContextProvider>
    </ThemeProvider>
  )
    
}

export default App;
