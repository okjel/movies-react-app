export default class MovieDbService {
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

  async getFilms(name = 'return') {
    const path = 'search/movie';
    const res = await this.getResource(`${path}${this.queryApi}&query=${name}`);
    return res.results;
  }

  async getGenres(name = 'return') {
    const path = 'genre/movie/list';
    return this.getResource(`${path}${this.queryApi}&query=${name}`);
  }
}
