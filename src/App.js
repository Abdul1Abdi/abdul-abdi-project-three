import './App.css';
import "./Items.js";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [item, setItem] = useState([]);
  const [errorMessage, setErrorMessage] =useState("");
  const [userInput, setUserInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [basicItemInfo, setBasicItemInfo] = useState({})

  const baseURL = "https://xivapi.com/";




  //API call to get item that matches search

  useEffect(() => {
    const queryAPI = fetchData("search", {
      indexes: "Recipe",
      string: searchTerm,
      limit: 1
    }).then(response => {
      
      if (response.data.Results.length === 0){
        setErrorMessage("Sorry we could not find the item, try searching something else!")
      }
      else {
        setErrorMessage(""); // Clears previous error messages
        getRecipeInfo(response.data.Results[0].ID)
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

  const getRecipeInfo = (id) => {
    fetchData("Recipe/"+id)
      .then((response) => {
        const data = response.data;
        console.log(response.data)
      })
      
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
    </div>
  );
}

export default App;
