import logo from './logo.svg';
import './App.css';
import * as movies from './movies';
import {useState, useEffect} from 'react'
import { render } from '@testing-library/react';

function App() {

  const [isFiltered, setIsFiltered] = useState(false);
  const [category, setCategory] = useState([]);
  
  useEffect(() => {
    async function display() {
      var items = await movies.movies$;
      var category = await movies.movies$;
      console.log(items);
      console.log ("Catégories : " + console.log(category))
      render(
        <div className = "wrapper">
        <p>Filtrer par catégories :</p>
        
        {items.map(item => (
          <div className="map">
            <li key={item.title}>
              <h1>{item.title}</h1>
              <p>{item.category}</p>
              <p>{item.likes} Likes</p>
              <p>{item.dislikes} Dislikes</p>
              <button>Aimer</button>
            </li>
          </div>
        ))}
        </div>
        
      );
      
    }    
    display();
  }, []);


  return (
    <div className="App">
        <h1>Bonjour</h1>
        
    </div>
  );
}

export default App;
