import React from 'react'
import {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";

const BASE_URL = 'https://sandbox-evelyn-dev-test-developer-edition.cs43.force.com/services/apexrest/cookbook/createRecipe?name='


function AddRecipe() {

    const [name, setName] = useState('');
    const [directions, setDirections] = useState('');
    let navigate = useNavigate();


    const updateRecipe = (evt) => {
        setName(evt.target.value);
    }

    const updateDirections = (evt) => {
        setDirections(evt.target.value);
    }

    const postRecipe = (evt) => {
        if(name !== '') {
            let url = BASE_URL + name + "&directions=" + directions;
            fetch(url, { method: 'POST', mode: 'cors'})
                .then((response) => {
                    if (!response.ok) {
                        document.querySelector('#error-message').hidden = false;
                        throw Error(response.statusText);
                    } 
                    return response.json();
                })
                .then((data) => {
                    console.log("yay");
                    navigate('/recipe/'+data.id, {state:{recipeId: data.id}});
                })
                .catch(error => console.log(error));
        }
        evt.preventDefault();
    }


    return (
        <div className='recipe-input'>
            <form onSubmit={postRecipe}>
                <label htmlFor="recipeName">Recipe Name</label><br />
                <input id="recipeName" type="text" onChange={updateRecipe} placeholder='Recipe name' /> <br/> <br />

                <label htmlFor="directions">Directions</label><br />
                <input id="directions" type="text" onChange={updateDirections} placeholder='Directions' /><br />
                <input type="submit"></input>
            </form>

            <p id="error-message" hidden>Invalid entry, plese contact jake@appiphony.com for more details</p>

        </div>
    );
}

export default AddRecipe;