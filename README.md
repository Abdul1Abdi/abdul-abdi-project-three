# FFXIV Craftable Items Search

This site lets you search for craftable items in the game Final Fantasy 14 and displays items that match the search term along with the ingredients required to craft it. 

## Built with

React.js

### Challenges an things learned!

- Organizing api data. data came in a big dump had to figure what I needed and reorganize it using getRecipeInfo
- Figuring out how to store information and how to update information in other components
- Had to give function as props and manipulate state in functions that are in App.js.
- Had to learn to use useState lists to store data and map those lists to render data.
- Had to research API to see how to search endpoints for data with a particular ID found resources in dedicated discord
- Learned I need to require images loaded in JSX due to Webpack
- Had to figure out how to minimize API queries as there was no property on the ingredient to see if it was a recipe
- Had to find way to get each ingredient's ID, query the API and then get results back and display a button if there is a recipe that can be searched.
