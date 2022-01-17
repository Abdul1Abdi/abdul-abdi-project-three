const baseURL = "https://xivapi.com";

function Recipes(props){
    return(
        <div className="wrapper">
            {props.recipes.map(recipe => {
                console.log(recipe)
                return(
                    <div key={recipe.ID} className="recipeContainer">
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
                                <div key={ ingredient.ID } className="ingredientContainer">
                                    <img src={ingredient.image} alt={"Image of " + ingredient.name} />
                                    <p>{ingredient.name}</p>
                                    <p>{ingredient.amount}</p>
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