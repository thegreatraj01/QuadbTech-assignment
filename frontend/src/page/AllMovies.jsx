// AllMovies.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllMovies = () => {
  const [allMovies, setAllMovies] = useState([]);

  const getAllMovies = async () => {
    try {
      const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
      setAllMovies(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <div>
      <h1 className='font-bold text-2xl text-center my-3'>Welcome To BookMovie.in</h1>
      <div className='grid grid-cols-2 gap-4 my-8 mx-5 md:grid-cols-3 lg:grid-cols-5'>
        {allMovies.map((movie) => (
          <div className='border-2 mx-2 truncate' key={movie.show.id}>
            <Link to={`/movie/${movie.show.id}`}>
              <img
                className='object-cover transition duration-1000 w-full h-full hover:scale-110'
                src={movie.show.image ? movie.show.image.medium : 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcReMhtSntFv59ZpCW6AorVsvAsreKdqdZmqtknZeR1uOeWR60Yd'}
                alt={movie.show.name}
              />
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AllMovies;
