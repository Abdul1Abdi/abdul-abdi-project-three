import { nanoid } from "nanoid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const baseURL = "https://xivapi.com";

function Recipes(props){
    return(
        <div className="wrapper gallery">
            {props.recipes.map((recipe, index) => {
                return(
                    //Since recipe.ID is not unique as we can have multiple of the same open, we can add index to it to make it unique
                    <div key={ nanoid() } className="recipeContainer">
                        <div className="nameAndClassContainer">
                            <div className="imgNameContainer">
                                <img src={baseURL + recipe.Icon} alt="" />
                                <p className="recipeName">{recipe.Name}</p>
                            </div>
                            <p className="className">{recipe.class}</p>
                            <button className="closeRecipeButton" onClick={() => props.closeRecipe(recipe.ID)}>✖</button>
                        </div>
                        {recipe.ingredientArray.map( ingredient => {
                            return(
                                <div key={ nanoid() } className="ingredientContainer">
                                    <div className="leftHalfIngredientContainer">
                                        <img src={ingredient.image} alt={"Image of " + ingredient.name} />
                                        <p>{ingredient.name}</p>
                                    </div>
                                    <div className="rightHalfIngredientContainer">
                                        <p>{ingredient.amount}</p>
                                        {(ingredient.recipe
                                            ? <button className="subRecipeButton" onClick={() => props.subRecipeButtonHandler(ingredient.recipe, ingredient)} aria-label="Get recipe for ingredient"> <FontAwesomeIcon icon={faChevronRight} /></button>
                                            : <p className="noRecipeSpace" ><FontAwesomeIcon icon={faChevronRight} /></p>)}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default Recipes;