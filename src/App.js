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
      const response=await fetch('https://react-http-da031-default-rtdb.firebaseio.com/movies.json');
      if(!response.ok){
        throw new Error('Something went wrong ...Retrying');
      }

      const data=await response.json();
      
      const loadedMovies=[];

      for(const key in data){
        loadedMovies.push({
          id:key,
          title:data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].releaseDate,
        });
      }
    
      setMovies(loadedMovies);
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

  async function addMovieHandler(movie){
    const response=await fetch('https://react-http-da031-default-rtdb.firebaseio.com/movies.json',{
      method: 'POST',
      body:JSON.stringify(movie),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const data=await response.json();
    console.log(data);
      
  }

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
      <Form onAddMovie={addMovieHandler}/>
      
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
