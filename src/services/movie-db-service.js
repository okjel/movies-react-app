export default class MovieDbService {
  guestSession;

  genres;

  apiBase = 'https://api.themoviedb.org/3/';

  apiKey = 'c0335cd321659ff9b97e8efb0f7bb655';

  queryApi = `?api_key=${this.apiKey}`;

  async getResource(query) {
    const res = await fetch(`${this.apiBase}${query}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${query}, received ${res.status}`);
    }

    return res.json();
  }

  getSearchFilms(name, page) {
    const path = 'search/movie';
    return this.getResource(`${path}${this.queryApi}&query=${name}&page=${page}`);
  }

  getRatedFilms() {
    const path = `guest_session/${this.guestSession}/rated/movies`;
    return this.getResource(`${path}${this.queryApi}`);
  }

  async syncGenres(name = 'return') {
    const path = 'genre/movie/list';
    const genresResponse = await this.getResource(`${path}${this.queryApi}&query=${name}`);
    this.genres = genresResponse.genres;
  }

  async createGuestSession() {
    const path = '/authentication/guest_session/new';
    const guestSessionResponse = await this.getResource(`${path}${this.queryApi}`);
    this.guestSession = guestSessionResponse.guest_session_id;
  }
}
