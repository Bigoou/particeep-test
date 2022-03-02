import logo from './logo.svg';
import './App.css';
import * as movies from './movies';
import {useState, useEffect} from 'react'
import { render } from '@testing-library/react';

function App() {

    //todo: like / dislike | Delete function | Multifilter | Paging


  const category = ['All', 'Comedy', 'Animation', 'Drame', 'Thriller']
  const [allMovies, setAllMovies] = useState([])
  const [saveMovies, setSaveMovies] = useState([])
  const [isFiltered, setIsFiltered] = useState(true);
  const [pages, setPages] = useState({
    nbItems : 8,
    currentPage : 1,
    nbPages : 3
  });

  const getMovies = async () => {
    const getAllMovies = await movies.movies$ //? get all movies
    setAllMovies(getAllMovies) //? save all movies 
    setSaveMovies(getAllMovies) //? save all movies in other array for reset filter
  }

  const filterMovies = (category) => {
    if (category !== 'All') {
      const filteredMovies = saveMovies.filter((movie) => movie.category === category) //? get all movies with the category selected
      return setAllMovies(filteredMovies)
    }
    return setAllMovies(saveMovies)
  }

  useEffect(() => {
    getMovies()
  }, []);

  function handlePaging() {
    console.log(this)
    setPages(prevstate => ({
      nbItems : this,
      ...prevstate,
    }));
    console.log(pages.nbItems)
  }

  return (
    <div className="App">
      <h1>Bonjour</h1>
      <div className="wrapper">
        <p>Filtrer par catégories : {category.map((item, index) => (
          <button key={index} onClick={() => filterMovies(item)}>{item}</button>
        ))}</p>
        {allMovies.length > 0 ?
          allMovies.map((item, index) => {
            return (
              <div className="map" key={index}>
                <li key={item.title}>
                  <h1>{item.title}</h1>
                  <p>{item.category}</p>
                  <p>{item.likes} Likes</p>
                  <p>{item.dislikes} Dislikes</p>
                  <button>Aimer</button>
                </li>
              </div>
            )
          })
          :
          <p>Aucun film</p>
        }
      </div>
      <div>
          <button>Page précédente</button>
          <button>Page Suivante</button>
          <p>Nombre d'éléments à afficher : 
          {[4, 8, 12].map(buttonId => (
              <button
                key={buttonId}
                value={buttonId}
                onClick={handlePaging.bind(buttonId)}
              >
                 {buttonId}
              </button>
            ))}
          </p>
        </div>
    </div>
  );
}

export default App;
