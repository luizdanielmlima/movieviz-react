import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ActorContent from './ActorContent';
import ActorInfo from '../ActorInfo/ActorInfo';
import MovieList from '../MovieList/MovieList';
import ActorGallery from '../ActorGallery/ActorGallery';

configure({adapter: new Adapter()});

describe('<MovieContent />', () => {
    let wrapper;

    beforeEach(() => {        
        wrapper = shallow(<ActorContent />);
        wrapper.setProps({
            actor: {
                biography: "Willard Christopher Smith, Jr. (born September 25, 1968) is an American actor, ...",
                birthday: "1968-09-25",
                id: 2888,
                imdb_id: "nm0000226",
                name: "Will Smith",
                place_of_birth: "Philadelphia, Pennsylvania, USA ",
                popularity: 29.601,
                profile_path: "/eze9FO9VuryXLP0aF2cRqPCcibN.jpg"
            }
        });
    });

    it('it should render <ActorInfo> when tab is MAIN', () => {
        wrapper.setProps({showMode:'main'});
        expect(wrapper.find(ActorInfo)).toHaveLength(1);
    });

    it('it should render <MovieList> when tab is FILMOGRAPHY', () => {
        wrapper.setProps({showMode:'credits'});
        expect(wrapper.find(MovieList)).toHaveLength(1);
    });

    it('it should render <ActorGallery> when tab is GALLERY', () => {
        wrapper.setProps({showMode:'gallery'});
        expect(wrapper.find(ActorGallery)).toHaveLength(1);
    });
});