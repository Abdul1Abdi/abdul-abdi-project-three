import './App.css';
import Items from "./Items.js";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] =useState("");
  const [userInput, setUserInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [recipeList, setRecipeList] = useState([])

  const baseURL = "https://xivapi.com";




  //API call to get item that matches search

  useEffect(() => {
    const queryAPI = fetchData("/search", {
      indexes: "Recipe",
      string: searchTerm,
      limit: 5
    }).then(response => {
      
      if (response.data.Results.length === 0){
        setErrorMessage("Sorry we could not find the item, try searching something else!")
      }
      else {
        setErrorMessage(""); // Clears previous error messages
        setItems(response.data.Results);
      }

    }).catch(error => {
      // This will catch an error communicating with the API
      setErrorMessage("Sorry something went wrong getting information from the FFXIV API");
    })
    
  }, [searchTerm])

  const handleInput = (event) => {
    setUserInput(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(userInput);
  }

  const getRecipeInfo = (idEndpoint, itemInfo) => {
    if (idEndpoint) {
      fetchData(idEndpoint)
        .then((response) => {
          const data = response.data;
          const ingredientArray = [];
          const recipeListCopy = [...recipeList]
          for (let i = 0; i < 10; i++) {
            const ingredientObject = {};
            if (data[`AmountIngredient${i}`] > 0) {
              ingredientObject.name = data[`ItemIngredient${i}`].Name
              ingredientObject.id = data[`ItemIngredient${i}`].ID
              ingredientObject.amount = data[`AmountIngredient${i}`];
              ingredientObject.image = baseURL + data[`ItemIngredient${i}`].Icon
              ingredientArray.push(ingredientObject)
            }
          }
          itemInfo.ingredientArray = ingredientArray;
          recipeListCopy.push(itemInfo)
          setRecipeList(recipeListCopy)
        })
        .catch(error => {
          setErrorMessage("Sorry something went wrong getting the recipe info")
        })
    } 
    else {
      console.log("Recipe ID doesn't exists")
    }
  }

  // Function queries API, also takes in end point to query
  // Takes in endpoint as a string and a params object
  async function fetchData(endpoint, params){
    const data = await axios({
      url: baseURL + endpoint,
      method: "GET",
      dataResponse: "json",
      params: params
    })
    return data
  }
  

  return (
    <div className="App">
      <h1>FFXIV Craftable Items Search</h1>
      <h2>Search for a craftable item from the game Final Fantasy 14</h2>
      <p>Try searching for Iron or Lance to find some stuff!</p>
      <p className="error">{
        errorMessage
          ? errorMessage
          : null
      }</p>
      <form onSubmit = { handleSubmit }>
        <label htmlFor="search">Search for an item: </label>
        <input type="text" id="search" onChange = { handleInput } value= { userInput }/>
        <button>Search</button>
      </form>
      <Items items={ items } getRecipeInfo={getRecipeInfo} />
    </div>
  );
}

export default App;
