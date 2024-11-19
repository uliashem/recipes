import './App.css';
import { useEffect, useState } from 'react';
import video from "./food.mp4";
import MyRecipesComponents from './MyRecipesComponents';

function App() {

  const MY_ID = "b28dd9c2";
  const MY_KEY = "d1b9837dae36e90730a85e287b9713ea";

  const [mySearch, setMySearch] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSubmitted, setWordSubmitted] = useState("avocado");

  useEffect(() => {
    const getRecipe = async() => {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`);
      const data = await response.json();
      setMyRecipes(data.hits);
    }
    getRecipe()
    
  }, [wordSubmitted])

  const myRecipeSearch = (e) => {
    setMySearch(e.target.value);
  }
  


  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  
  return (
    <div className="App">
      <div className='container'>
        <video autoPlay muted loop>
          <source src={video} type='video/mp4'/>
        </video>
        <h1>Find a Recipe</h1>
      </div>

      <div className='container'>
        <form onSubmit={finalSearch}>
          <input className='search' placeholder='Search...' onChange={myRecipeSearch} value={mySearch}/>
        </form>
      </div>

      <div className='container'>
        <button onClick={finalSearch}>
          <img src="https://img.icons8.com/fluency/48/000000/fry.png" alt="icon"/>
        </button>
      </div>

      {myRecipes.map((element, index) => (
        <MyRecipesComponents key={index}
        label={element.recipe.label}
        image={element.recipe.image}
        calories={element.recipe.calories}
        ingredients={element.recipe.ingredientLines}/>
      ))}
    </div>

  );
}

export default App;
