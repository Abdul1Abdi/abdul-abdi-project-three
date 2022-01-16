const baseURL = "https://xivapi.com";


function Items(props){
    return(
        <div>
            {props.items.map((item) => {
                
                return (
                    <div key ={item.ID}>
                        <img src={baseURL + item.Icon} alt="" />
                        <p>{item.Name}</p>
                        <button onClick={() => props.getRecipeInfo(item.Url, item)}>Recipe</button>
                    </div>
                )
            })}
        </div>       
    )
             
                
         
}

export default Items;