import React, { Component } from 'react';
import _ from 'lodash';
import 'antd/dist/antd.css';
import '../../font.css';
import MoviesList from '../movies-list';
import './App.scss';
import MovieDbService from '../../services/movie-db-service';
import Header from '../header';
import PaginationBlock from '../pagination-block';
import SectionTabs from '../../shared/section-tabs';

export default class App extends Component {
  movieDbService;

  totalMovies = 0;

  updateData = async (search = 'return', page = 1) => {
    if (!this.state.loading) {
      this.setState({ loading: true });
    }
    try {
      let filmsResponse;
      if (this.state.activeTab === SectionTabs.Search.id) {
        filmsResponse = await this.movieDbService.getSearchFilms(search, page);
      } else if (this.state.activeTab === SectionTabs.Rated.id) {
        filmsResponse = await this.movieDbService.getRatedFilms();
      }
      this.totalMovies = filmsResponse.total_results;
      const movies = filmsResponse.results.map((movie) => {
        const genresFilm = movie.genre_ids.map((el) => this.movieDbService.genres.find((i) => i.id === el));
        return {
          id: movie.id,
          title: movie.title || 'No title',
          description: movie.overview || 'No decsription',
          imgUrl: movie.poster_path || null,
          dateRelease: movie.release_date ? new Date(movie.release_date) : null,
          genres: genresFilm,
        };
      });
      this.setState({ movies, pages: { totalMovies: this.totalMovies }, loading: false });
    } catch {
      this.onError();
    }
  };

  async componentDidMount() {
    this.movieDbService = new MovieDbService();
    await this.movieDbService.createGuestSession();
    await this.movieDbService.syncGenres();
    await this.updateData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeTab !== this.state.activeTab) this.updateData();
  }

  state = {
    movies: [],
    pages: { currentPage: 1, totalMovies: 0 },
    search: '',
    loading: true,
    error: false,
    activeTab: SectionTabs.Search.id,
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

  changeInput = (value) => {
    if (!value) return;
    this.setState(
      {
        search: value.trim(),
        pages: { currentPage: 1 },
      },
      () => {
        const debounce = _.debounce(() => this.updateData(this.state.search), 1000);
        debounce();
      }
    );
  };

  changeTabSection = (activeKey) => {
    this.setState({ activeTab: +activeKey });
  };

  render() {
    const { loading, error, movies, pages, activeTab } = this.state;
    return (
      <div className="app">
        <div className="app__container">
          <Header changeInput={this.changeInput} changeTabSection={this.changeTabSection} activeTab={activeTab} />
          <MoviesList movies={movies} loading={loading} error={error} />
          <PaginationBlock data={pages} changePage={this.changePage} loading={loading} />
        </div>
      </div>
    );
  }
}
