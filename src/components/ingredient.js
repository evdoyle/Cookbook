import React from 'react'
import {useEffect, useState} from 'react'
// import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import RecipeList from './recipeList';


function Ingredient() {
    const loc = useLocation();
    const [ ingredientId, setIId ] = useState(loc.state.ingredientId);
    const [data, setData] = useState([]);
    console.log("ingredient id is " + ingredientId);

    const url = 'https://sandbox-evelyn-dev-test-developer-edition.cs43.force.com/services/apexrest/cookbook/searchIngredients?searchTerm=';

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


    return (
        <div className="ingredients">
            {/* <div id="thisdata">{JSON.stringify(data, null, 2)}</div>
            <div id="thisid">{ingredientId}</div> */}
            {
            data.filter((list) => list.id === ingredientId)
            .map((list) => (
                <div key={list.id}>
                    <h2 key={list.name}>{list.name}</h2><br />

                    <p><b>{list.name} is used in the following recipes:</b></p>
                    {list.recipes.map((ing) => (
                        <RecipeList name={ing.name} id={ing.id}/>
                    ))}
                </div>
            ))}
        </div>
            );


}


export default Ingredient;