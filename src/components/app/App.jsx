import React, { Component } from 'react';
import { debounce } from 'lodash';
import 'antd/dist/antd.css';
import MoviesList from '../movies-list';
import './App.scss';
import MovieDbService from '../../services/movie-db-service';
import LocalStorageService from '../../services/local-storage-service';
import Header from '../header';
import PaginationBlock from '../pagination-block';
import sectionTabs from '../../shared/section-tabs';
import { MovieDbServiceProvider } from '../movie-db-service-context';

export default class App extends Component {
  totalMovies = 0;

  state = {
    movies: [],
    pages: { currentPage: 1, totalMovies: 0 },
    search: '',
    loading: true,
    error: false,
    activeTab: sectionTabs.Search.id,
  };

  updateData = async (search = 'return', page = 1) => {
    if (!this.state.loading) {
      this.setState({ loading: true, error: false });
    }
    try {
      let filmsResponse;

      if (this.state.activeTab === sectionTabs.Search.id) {
        filmsResponse = await MovieDbService.getSearchFilms(search, page);
      }

      if (this.state.activeTab === sectionTabs.Rated.id) {
        filmsResponse = await MovieDbService.getRatedFilms();
      }

      this.totalMovies = filmsResponse.total_results;
      const ratedFilms = LocalStorageService.getRatedFilms();
      const movies = filmsResponse.results.map((movie) => {
        const genresFilm = movie.genre_ids.map((el) => MovieDbService.genres.find((i) => i.id === el));
        const ratedFilm = ratedFilms ? ratedFilms.find((movieRated) => movieRated.id === movie.id) : null;
        let rating = 0;
        if (movie.rating) rating = movie.rating;
        if (ratedFilm) rating = ratedFilm.rating;
        return {
          id: movie.id,
          title: movie.title || 'No title',
          description: movie.overview || 'No decsription',
          imgUrl: movie.poster_path || null,
          dateRelease: movie.release_date ? new Date(movie.release_date) : null,
          genres: genresFilm,
          ratingCur: rating,
          voteAverage: movie.vote_average ? movie.vote_average : 0,
        };
      });
      this.setState({ movies, pages: { totalMovies: this.totalMovies }, loading: false });
    } catch (err) {
      this.onError();
    }
  };

  async componentDidMount() {
    LocalStorageService.clear();
    await MovieDbService.createGuestSession();
    await MovieDbService.syncGenres();
    await this.updateData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeTab !== this.state.activeTab) this.updateData();
  }

  rateFilm = (id, rating) => {
    MovieDbService.rateFilm(id, rating).catch(() => {
      this.onError();
    });
    this.setState(
      (state) => {
        return {
          movies: state.movies.map((movie) => (movie.id === id ? { ...movie, ratingCur: rating } : movie)),
        };
      },
      () => {
        const ratedFilms = this.state.movies
          .filter((movie) => movie.ratingCur > 0)
          .map((movie) => ({ id: movie.id, rating: movie.ratingCur }));
        LocalStorageService.setRatedFilms(ratedFilms);
      }
    );
  };

  changePage = (page) => {
    this.setState(
      {
        pages: { currentPage: page },
      },
      () => this.updateData(this.state.search ? this.state.search : 'return', this.state.pages.currentPage)
    );
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  debouncedFunc = debounce(() => {
    this.updateData(this.state.search);
  }, 1000);

  changeInput = (value) => {
    if (!value) return;
    this.setState(
      {
        search: value.trim(),
        pages: { currentPage: 1 },
      },
      this.debouncedFunc
    );
  };

  changeTabSection = (activeKey) => {
    this.setState({ activeTab: +activeKey });
  };

  render() {
    const { loading, error, movies, pages, activeTab } = this.state;
    return (
      <MovieDbServiceProvider value={MovieDbService}>
        <div className="app">
          <div className="app__container">
            <Header changeInput={this.changeInput} changeTabSection={this.changeTabSection} activeTab={activeTab} />
            <MoviesList movies={movies} loading={loading} error={error} ratingFilm={this.rateFilm} />
            <PaginationBlock data={pages} changePage={this.changePage} loading={loading} />
          </div>
        </div>
      </MovieDbServiceProvider>
    );
  }
}
