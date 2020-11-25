import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MovieContent from './MovieContent';
import ActorsList from '../ActorsList/ActorsList';
import MovieInfo from '../MovieInfo/MovieInfo';
import MoviePosters from '../MoviePosters/MoviePosters';
import MovieGallery from '../MovieGallery/MovieGallery';
import MovieTrailers from '../MovieTrailers/MovieTrailers';

configure({adapter: new Adapter()});

describe('<MovieContent />', () => {
    let wrapper;

    beforeEach(() => {        
        wrapper = shallow(<MovieContent />);
        wrapper.setProps({
            movie: {
                adult: false,
                backdrop_path: "/upUy2QhMZEmtypPW3PdieKLAHxh.jpg",
                budget: 90000000,
                genres: [
                    {id: 53, name: "Thriller"},
                    {id: 28, name: "Action"},
                    {id: 80, name: "Crime"}
                ],
                homepage: "https://www.badboysforlife.movie/",
                id: 38700,
                imdb_id: "tt1502397",
                original_language: "en",
                original_title: "Bad Boys for Life",
                overview: "Marcus and Mike are forced to confront new threats, career changes, and midlife crises as they join the newly created elite team AMMO of the Miami police department to take down the ruthless Armando Armas, the vicious leader of a Miami drug cartel.",
                popularity: 317.156,
                poster_path: "/y95lQLnuNKdPAzw9F9Ab8kJ80c3.jpg",
                release_date: "2020-01-15",
                revenue: 419074646,
                runtime: 124,
                status: "Released",
                tagline: "Ride together. Die together.",
                title: "Bad Boys for Life",
                video: false,
                vote_average: 7.3,
                vote_count: 5565,
            }
        });
    });

    it('it should render <MovieInfo> when tab is MAIN', () => {
        wrapper.setProps({showMode:'main'});
        expect(wrapper.find(MovieInfo)).toHaveLength(1);
    });

    it('it should render <ActorsList> when tab is CAST', () => {
        wrapper.setProps({showMode:'cast'});
        expect(wrapper.find(ActorsList)).toHaveLength(1);
    });

    it('it should render <MoviePosters> when tab is POSTERS', () => {
        wrapper.setProps({showMode:'posters'});
        expect(wrapper.find(MoviePosters)).toHaveLength(1);
    });

    it('it should render <MovieGallery> when tab is GALLERY', () => {
        wrapper.setProps({showMode:'gallery'});
        expect(wrapper.find(MovieGallery)).toHaveLength(1);
    });
    
    it('it should render <MovieTrailers> when tab is TRAILERS', () => {
        wrapper.setProps({showMode:'trailers'});
        expect(wrapper.find(MovieTrailers)).toHaveLength(1);
    });
});