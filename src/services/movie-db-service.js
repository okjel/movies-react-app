class MovieDbService {
  guestSession;

  genres;

  apiBase = 'https://api.themoviedb.org/3/';

  apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY;

  queryApi = `?api_key=${this.apiKey}`;

  requestResource = async (query, options) => {
    const res = await fetch(`${this.apiBase}${query}`, options);

    if (!res.ok) {
      throw new Error(`Could not fetch ${query}, received ${res.status}`);
    }

    return res.json();
  };

  postData = (query, data) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    };
    return this.requestResource(query, options);
  };

  getSearchFilms = (name, page) => {
    const path = 'search/movie';
    return this.requestResource(`${path}${this.queryApi}&query=${name}&page=${page}`);
  };

  getRatedFilms = () => {
    const path = `guest_session/${this.guestSession}/rated/movies`;
    return this.requestResource(`${path}${this.queryApi}`);
  };

  rateFilm = (id, rating) => {
    const path = `movie/${id}/rating`;
    const data = { value: rating };
    return this.postData(`${path}${this.queryApi}&guest_session_id=${this.guestSession}`, data);
  };

  syncGenres = async (name = 'return') => {
    const path = 'genre/movie/list';
    const genresResponse = await this.requestResource(`${path}${this.queryApi}&query=${name}`);
    this.genres = genresResponse.genres;
  };

  createGuestSession = async () => {
    const path = '/authentication/guest_session/new';
    const guestSessionResponse = await this.requestResource(`${path}${this.queryApi}`);
    this.guestSession = guestSessionResponse.guest_session_id;
  };
}

export default new MovieDbService();
