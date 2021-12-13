import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/header';
import Home from './components/home';
import Search from './components/search';
import Recipe from './components/recipe';
import Ingredient from './components/ingredient'
import AddRecipe from './components/addRecipe'

ReactDOM.render(
  <Router>
    <Header />
    <Routes className="mainPage">
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<Search />} /> 
      <Route path="/recipe/:id" element={<Recipe />} />  
      <Route path="/ingredient/:id" element={<Ingredient/>} />
      <Route path="/addRecipe" element={<AddRecipe />} />
    </Routes>
  </Router>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
