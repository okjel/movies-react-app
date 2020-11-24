class LocalStorageService {
  RATED_FILMS_STORAGE_NAME = 'ratedFilms';

  getRatedFilms = () => {
    const raw = localStorage.getItem(this.RATED_FILMS_STORAGE_NAME);
    return JSON.parse(raw);
  };

  setRatedFilms = (films) => {
    localStorage.setItem(this.RATED_FILMS_STORAGE_NAME, JSON.stringify(films));
  };

  clear = () => {
    localStorage.clear();
  };
}

export default new LocalStorageService();
