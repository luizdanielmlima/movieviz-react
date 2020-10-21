import React from 'react';

import ActorsList from '../ActorsList/ActorsList';
import './MovieContent.css';
import MovieInfo from '../MovieInfo/MovieInfo';
import MovieGallery from '../MovieGallery/MovieGallery';
import MoviePosters from '../MoviePosters/MoviePosters';
import MovieTrailers from '../MovieTrailers/MovieTrailers';

const MovieContent = (props: any) => {
  let {
    movie,
    showMode,
    cast,
    crew,
    images,
    posters,
    trailers,
  } = props;

  let movieContent: any;
  movieContent = <p>Loading movie´s info</p>;

  if (movie) {
    if (showMode === 'main') {
      movieContent = (
        <MovieInfo movie={movie} crew={crew}/>
      )
    } else if (showMode === 'cast') {
      movieContent = (
        <div className="actorlist-container">
          <ActorsList actors={cast} isMovieCast={true}></ActorsList>
        </div>
      );
    } else if (showMode === 'posters') {
      movieContent = (
        <MoviePosters posters={posters}/>
      );
    } else if (showMode === 'gallery') {
      movieContent = (
        <MovieGallery images={images}/>
      );
    } else if (showMode === 'trailers') {
      movieContent = (
        <MovieTrailers trailers={trailers}/>
      );
    }
  }

  return <div>{movieContent}</div>;
};

export default MovieContent;
