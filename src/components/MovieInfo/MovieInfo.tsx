import React from 'react';
import { IonChip, IonImg, IonLabel } from '@ionic/react';

import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import configuration from '../../shared/configuration';
import { Movie } from '../../shared/models';
import './MovieInfo.css';

interface myProps {
    movie: Movie;
  }

function MovieInfo(props: any) {
    const history = useHistory();

    let { movie, crew } = props;
    const movieGenres = movie.genre_ids;
    console.log('movie: ', movie);
    const posterSizes = configuration.images.poster_sizes;
    const baseURL = configuration.images.secure_base_url;

    const getMovieDuration = (totalMin: number) => {
        const hours = totalMin / 60;
        const rhours = Math.floor(hours);
        const minutes = (hours - rhours) * 60;
        const rminutes = Math.round(minutes);
        if (rminutes === 0) {
            return rhours + ' h';
        } else {
            return rhours + ' h  ' + rminutes + ' min';
        }
    };

    const getMovieRatingPct = (movie: any) => {
        return movie.vote_average * 10 + '%';
    };

    const changeGenreAndNavToMovies = (genreID: string) => {
        props.onSearchParamChanged('genre', genreID);
        history.push('/movies/');
      };

    let genres;
    if (movieGenres) {
        genres = movieGenres.map((genre: any) => {
        return (
            <IonChip
                className="chip"
                key={genre.id}
                outline
                onClick={() =>
                    changeGenreAndNavToMovies(genre.id.toString())
                }
            >
            <IonLabel>{genre.name}</IonLabel>
            </IonChip>
        );
        });
    }

    let crewList;
    crewList = <p>Loading crew...</p>;
    if (crew) {
        crewList = crew.slice(0, 12).map((person: any, index: number) => {
        return (
            <div key={index} className="crew-item">
            <p>{person.name}</p>
            <p>......</p>
            <p>{person.job}</p>
            </div>
        );
        });
    }

    let movieCont;
    movieCont = <p>loading...</p>
    if(movie) {
        movieCont = (
            <div
                className="main-container"
                style={{
                    background: `linear-gradient(rgba(146, 213, 230, 0.9), rgba(128, 187, 202, 0.9)) no-repeat center top / cover,
                    url("${baseURL}${posterSizes[5]}${movie.poster_path}") no-repeat center center / cover`,
                }}
            >
                <div className="main-wrapper">
                    <div className="main-info">
                    <picture className="thumb-container">
                        <IonImg
                        className="thumb"
                        src={`${baseURL}${posterSizes[3]}${movie.poster_path}`}
                        alt="movie poster"
                        />
                    </picture>
                    <div className="movie-stats">
                        <div className="movie-stat-item">
                        <p className="movie-stat-title">
                            Rating {movie.vote_average}
                        </p>
                        <div className="rating rating-centered">
                            <span
                            style={{ width: getMovieRatingPct(movie) }}
                            ></span>
                        </div>
                        </div>
                        <div className="movie-stat-item">
                        <p className="movie-stat-title">Runtime</p>
                        <h6 className="movie-stat-value">
                            { getMovieDuration(movie.runtime) }
                        </h6>
                        </div>
                        <div className="movie-stat-item">
                        <p className="movie-stat-title">Budget</p>
                        <h6 className="movie-stat-value">
                            $ {movie.budget}
                        </h6>
                        </div>
                        <div className="movie-stat-item">
                        <p className="movie-stat-title">Revenue</p>
                        <h6 className="movie-stat-value">
                            $ {movie.revenue}
                        </h6>
                        </div>
                    </div>
                    </div>
                    <div className="secondary-info">
                    <div className="genres">{genres}</div>
                    <div className="overview">
                        <h4>Overview</h4>
                        <p>{movie.overview}</p>
                    </div>
                    <div className="crew">
                        <h4>Featured Crew</h4>
                        {crewList}
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    return <div>{movieCont}</div>
}

const mapStateToProps = (state: any) => {
    return {
      searchParams: state.searchParams,
    };
  };
  
  const mapDispatchToProps = (dispatch: any) => {
    return {
      onSearchParamChanged: (paramKey: string, paramValue: string) =>
        dispatch(actions.updateSearchParam(paramKey, paramValue)),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MovieInfo);
