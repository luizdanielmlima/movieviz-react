import React from 'react';

import MovieList from '../MovieList/MovieList';
import ActorInfo from '../ActorInfo/ActorInfo';
import ActorGallery from '../ActorGallery/ActorGallery';

function ActorContent(props: any) {
  // console.log('MovieContent|props:', props);

  let { actor, showMode, images, filmography } = props;
  let actorContent: any;
  actorContent = <p>Loading actor´s info</p>;

  if (actor) {
    if (showMode === 'main') {
      actorContent = (
        <ActorInfo actor={actor}/>
      )
    } else if (showMode === 'credits') {
      actorContent = (
        <MovieList movies={filmography} isRanking={false} />
      );
    } else if (showMode === 'gallery') {
      actorContent = (
        <ActorGallery images={images} />
      );
    }
  }
  return <div>{actorContent}</div>;
}

export default ActorContent;
