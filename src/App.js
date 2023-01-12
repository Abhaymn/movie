import React ,{useState,useEffect,useCallback}from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import Form from './components/form';

function App() {
  const [movies,setMovies]= useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError]=useState(null);

  

 const MovieHandler=useCallback(async()=> {
    setIsLoading(true);
    setError(null);
    try{
      const response=await fetch('https://swapi.dev/api/films');
      if(!response.ok){
        throw new Error('Something went wrong ...Retrying');
      }

      const data=await response.json();
    
      const tranformedMovies=data.results.map((movieData)=>{
        return {
          id:movieData.episode_id,
          title:movieData.title,
          openingText:movieData.opening_crawl,
          releaseDate:movieData.release_date
        }
      });
      setMovies(tranformedMovies);
      setIsLoading(false);
    }
    catch (error){
      setError(error.message);
    }
    setIsLoading(false);
  },[]);

  useEffect(()=>{
    MovieHandler();
  }, [MovieHandler]);

  let content=<p>Found no movies</p>

  if(movies.length>0){
    content=<MoviesList movies={movies}/>
  }

  if(error){
    content=<p>{error}</p>
  }

  if(isLoading){
    content=<p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
      <Form/>
      </section>
      <section>
        <button onClick={MovieHandler} >Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );

  }
export default App;
