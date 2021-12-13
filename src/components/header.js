import React from 'react'
import { NavLink } from "react-router-dom";


function Header() {

    return (
        <div className="header">
            <NavLink className="header-home" to='/'>Evelyn's Cookbook</NavLink>
            <NavLink className="add-recipe-button" to="/addRecipe">Add Recipe</NavLink>
        </div>
    );

    
}

export default Header;