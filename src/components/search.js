import React from 'react'
import { NavLink } from "react-router-dom";
import RecipeList from './recipeList'
import IngredientList from './ingredientList';


const BASE_URL = 'https://sandbox-evelyn-dev-test-developer-edition.cs43.force.com/services/apexrest/cookbook/'
// const BASE_URL = 'http://localhost:8010/proxy/services/apexrest/cookbook/searchRecipes?searchTerm='

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            recipes: [],
            ingredients: []
        }   

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    // handleChange(event) {
    //     this.setState({searchTerm: event.target.value});
    // }

    handleChange(event) {
        this.setState({searchTerm: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const { searchTerm } = this.state; 
        let searchType = document.querySelector('input[name="searchType"]:checked').value;
        this.setState({recipes: [], ingredients: []});


        if(searchTerm !== '') {
            if(searchType == "recipes" || searchType == "both") {
                let url = BASE_URL + 'searchRecipes?searchTerm=' + searchTerm;
                fetch(url, {method: 'GET', mode: 'cors'})
                    .then((response) => {
                        if (!response.ok) {
                            console.log(response);
                            document.querySelector('#error-message').hidden = false;
                            throw Error(response.statusText);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        this.setState({recipes: data});  
                        console.log(data);
                    })
                    .catch(error => console.log(error));
            }
            if(searchType == "ingredients" || searchType == "both") {
                let url = BASE_URL + 'searchIngredients?searchTerm=' + searchTerm;
                fetch(url, {method: 'GET', mode: 'cors'})
                    .then((response) => {
                        if (!response.ok) {
                            console.log(response);
                            throw Error(response.statusText);
                        }
                        return response.json();
                    })
                    .then((data) => {
                    this.setState({ingredients: data});  
                    console.log(data);
                    })
                    .catch(error => console.log(error));
            }
        }
        
    }

    render() {
        const {searchTerm, recipes, ingredients} = this.state;
        
        return (
            <div className="seachpage">
                <form className="searchbar" onSubmit={this.handleSubmit}>
                    <h1>Search our database of recipes, either by recipe name, ingredients, or both!</h1>
                    <input type="text" onChange={this.handleChange} value={searchTerm} placeholder='Search...' /><br />

                    <input type="radio" id="recipes" name="searchType" value="recipes"/>
                    <label htmlFor="recipes">Recipes</label><br />

                    <input type="radio" id="ingredients" name="searchType" value="ingredients"/>
                    <label htmlFor="ingredients">Ingredients</label><br />

                    <input type="radio" id="both" name="searchType" value="both" defaultChecked/>
                    <lable htmlFor="both">Both</lable>

                </form>

                {recipes.length>0 &&
                    <h2>{recipes.length} recipe{recipes.length !== 1 ? 's' : ''} matching your search</h2>
                }

                { recipes.map(res => (
                    <RecipeList name={res.name} id={res.id}/>
                ))}
                <br></br>

                { ingredients.length>0 &&
                    <h2>{ingredients.length} ingredient{ingredients.length !== 1 ? 's' : ''} matching your search</h2>
                }
                { ingredients.map(res => (
                    <IngredientList name={res.name} id={res.id}/>
                ))}

                <p id="error-message" hidden>Invalid entry, plese contact jake@appiphony.com for more details</p>

            </div>
            
        );
    }

    
}

export default Search;