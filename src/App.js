import React, { useState } from 'react';
import  { BrowserRouter }  from 'react-router-dom'; 
import Header from './components/Header';
import Foorter from './components/Footer'; 
import './App.css';
import Routes from  './Routes';
import Login from './pages/Login'

function App(){
  const[user, setUser] = useState({
    id: 1,
    name: 'Pedro',
    avatar: ''
  });
  
  if(user === null) {
    return(
      <Login/>
    );
  }

  return (
    <BrowserRouter>
        
        <Routes/>
        
    </BrowserRouter>
  );
}
export default App;

//<BrowserRouter>
//        <Header/>
//        <Routes/>
//        <Foorter/>
//    </BrowserRouter>