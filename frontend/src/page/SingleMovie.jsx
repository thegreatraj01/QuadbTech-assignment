import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import ReviewForm from '../Component/ReviewForm';

const SingleMovie = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { id } = useParams();
  const summaryRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
        const allMovies = response.data;
        const movie = allMovies.find((movie) => movie.show.id === parseInt(id, 10));
        if (movie) {
          setSelectedMovie(movie);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getAllMovies();
  }, [id]);

  useEffect(() => {
    // Use ref to set the innerHTML of the summary
    if (selectedMovie && summaryRef.current) {
      summaryRef.current.innerHTML = selectedMovie.show.summary;
    }
  }, [selectedMovie]);

  return (
    <div className='m-10'>
      {selectedMovie ? (
        <div className='flex bg-slate-100 gap-5  flex-wrap md:flex-nowrap lg:flex-nowrap'>
          <div className='w-full md:w-1/3 '>
            <img
              className='object-contain w-full h-full'
              src={selectedMovie.show.image ? selectedMovie.show.image.original : 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcReMhtSntFv59ZpCW6AorVsvAsreKdqdZmqtknZeR1uOeWR60Yd'}
              alt={selectedMovie.show.name}
            />
          </div>
          <div className='w-2/3 p-2'>
            <h2 className=' text-2xl font-bold'>{selectedMovie.show.name}</h2>
            <p className=' text-base'> language :<span > {selectedMovie.show.language}</span>  </p>
            <p className=' text-base'> genres: <span>{selectedMovie.show.genres[0]}</span> | <span>{selectedMovie.show.genres[1]}</span></p>
            {selectedMovie.show.network && <p className=' text-base'> country :<span > {selectedMovie.show.network.country.name}</span>  </p>}


            {/* Use ref to create a reference to the summary div */}
            <div ref={summaryRef}></div>
            <div className=' text-lg'>
              Rating  : {selectedMovie.show.rating.average ? <span>{selectedMovie.show.rating.average}</span> : 0}
            </div>
            <button
              onClick={openModal}
              className=" mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Book A Ticket
            </button>


          </div>
        </div>

      ) : (
        <p>Loading...</p>
      )}
      {/* Button to open the modal */}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel='Review Form Modal'
        className=" w-[80%] md:w-[60%] lg:w-[50%] bg-white mx-auto mt-[10vh] "
      >
        {/* Form component for review */}
        <ReviewForm closeModal={closeModal} moviename={selectedMovie} />
      </Modal>
    </div>
  );
};

export default SingleMovie;
