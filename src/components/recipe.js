import React from 'react'
import {useEffect, useState} from 'react'
// import { useParams } from 'react-router-dom'
import IngredientList from './ingredientList'
import { NavLink, useLocation } from 'react-router-dom'


function Recipe() {
    const loc = useLocation();
    const [ recipeId, setRId ] = useState(loc.state.recipeId);
    const [data, setData] = useState([]);
    const [ingredientName, setIngredient] = useState('');
    


    const url = 'https://sandbox-evelyn-dev-test-developer-edition.cs43.force.com/services/apexrest/cookbook/searchRecipes?searchTerm=';
    const ingredientUrl = 'https://sandbox-evelyn-dev-test-developer-edition.cs43.force.com/services/apexrest/cookbook/addIngredient'

    useEffect(() => {
        fetch(url, {method: 'GET', mode: 'cors'})
                .then((response) => {
                    if (!response.ok) {
                        console.log(response);
                        throw Error(response.statusText);
                    }
                    return response.json();
                })
                .then((data) => {
                    setData(data);
                })
                .catch(error => console.log(error));
    }, [useLocation()])

    const handleChange = (evt) => {
        
        setIngredient(evt.target.value);
    }

    const addIngredient = (evt) => {
        console.log('add Ingredient ' + ingredientName);
        if(ingredientName !== '') {
            let url = ingredientUrl + "?recipeId=" + recipeId + "&name=" + ingredientName;
            fetch(url, { method: 'POST', mode: 'cors'})
                .then((response) => {
                    if (!response.ok) {
                        document.querySelector('#error-message').hidden = false;
                        throw Error(response.statusText);
                    }
                    return response.json();
                })
                .then((data) => {
                    window.location.reload(false);
                })
                .catch(error => console.log(error));
        }
        evt.preventDefault();

    }


    return (
        <div className="recipes">
            {/* <div id="thisdata">{JSON.stringify(data, null, 2)}</div>
            <div id="thisid">{recipeId}</div> */}
            {
            data.filter((list) => list.id === recipeId)
            .map((list) => (
                <div key={list.id}>
                    <h2 key={list.name}>{list.name}</h2><br />
                    <p><b>Directions:</b></p>
                    <p key={list.directions}>{list.directions}</p><br />

                    <p><b>Ingredients Used:</b></p>
                    {list.ingredients.map((ing) => (
                        <IngredientList name={ing.name} id={ing.id}/>
                    ))}
                </div>
            ))}

            <br></br><p>Add an Ingredient to this Recipe</p>
            <form id="addIngredient" onSubmit={addIngredient}>
                <input type="text" onChange={handleChange} placeholder='Ingredient Name' />
                {/* <input type="submit" onClick={addIngredient}></input> */}
            </form>

            <p id="error-message" hidden>Invalid entry, plese contact jake@appiphony.com for more details</p>
        </div>
            );


}


export default Recipe;