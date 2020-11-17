export default class MovieDbService {
  constructor() {
    if (MovieDbService.guestSession) return;
    this.createGuestSession().then((data) => {
      if (MovieDbService.guestSession) return;
      MovieDbService.guestSession = data.guest_session_id;
    });
  }

  static guestSession = '';

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

  getFilms(name, page) {
    const path = 'search/movie';
    return this.getResource(`${path}${this.queryApi}&query=${name}&page=${page}`);
  }

  getGenres(name = 'return') {
    const path = 'genre/movie/list';
    return this.getResource(`${path}${this.queryApi}&query=${name}`);
  }

  createGuestSession() {
    const path = '/authentication/guest_session/new';
    return this.getResource(`${path}${this.queryApi}`);
  }
}
