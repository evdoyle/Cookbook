import React from 'react'
import { NavLink } from "react-router-dom";


class IngredientList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
        }
    }


    render() {
        const {id, name} = this.state;
        // console.log("recipe list id: " + id);
        const link = "/ingredient/" + id;
        return(
            <NavLink to={link} state={{ ingredientId: id }}>
                <div>
                    <h3 className='name'>{name}</h3>
                </div>
            </NavLink>
        );
    }
}

export default IngredientList;
