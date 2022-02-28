import logo from './logo.svg';
import './App.css';
import * as movies from './movies';
import {useState, useEffect} from 'react'
import { render } from '@testing-library/react';

function App() {

  const [isFiltered, setIsFiltered] = useState(false);
  const categoriesFilter = [];

  function splice (tab) {
    for (var i = 0 ; i <= tab.length + 1; i++) {
      for(var j = i + 1 ; j <= tab.length + 1; j++){
        if(tab[i] == tab[j]) {
          tab.splice(i , 1);
        }
      }
    }
  }

  function handleClick() {
    console.log(this);
    setIsFiltered(true);
    try {
      categoriesFilter.push(this);
    } catch (error) {
      console.log(error)
    }
    console.log(categoriesFilter)
  }
  
  useEffect(() => {
    async function display() {
      var items = await movies.movies$;
      var categories = [];
     
      items.map(item => (
        categories.push(item.category)
      ))
      splice(categories);
      console.log(items);
      console.log("Catégories : " + categories);

      render(
        <div className = "wrapper">
        <p>Filtrer par catégories :{categories.map(e => (
          <button onClick={handleClick.bind(e)}>{e}</button>
        ))}</p>
        
        {isFiltered ? 
        items.map(item => (
          <div className="map">
            <li key={item.title}>
              <h1>{item.title}</h1>
              <p>{item.category}</p>
              <p>{item.likes} Likes</p>
              <p>{item.dislikes} Dislikes</p>
              <button>Aimer</button>
              <button>Supprimer</button>
            </li>
          </div>
        ))
        : items.map(item => (
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
