export interface Movie {
  budget?: number;
  genre_ids?: any[];
  id?: string;
  media_type?: string;
  original_language?: string;
  overview?: string;
  popularity?: number;
  backdrop_path?: string;
  poster_path?: string;
  release_date?: string;
  revenue?: number;
  runtime?: string;
  title?: string;
  vote_average?: number;
  vote_count?: number;
}

export interface Cast {
  biography?: string;
  birthday?: string;
  known_for?: Movie[];
  cast_id?: number;
  character?: string;
  credit_id?: string;
  deathday?: string;
  gender?: any;
  homepage?: string;
  id?: number;
  imdb_id?: string;
  name?: string;
  order?: number;
  profile_path: string;
  popularity?: number;
  place_of_birth?: string;
}

export interface Crew {
  credit_id?: string;
  department?: string;
  gender?: number;
  id?: number;
  job?: string;
  name?: string;
  profile_path?: string;
}
