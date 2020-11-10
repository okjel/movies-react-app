import React, { Component } from 'react';
import { List } from 'antd';
import MovieCard from '../movie-card';
import MovieDbService from '../../services/movie-db-service';

import './movies-list.scss';
import Loading from '../../shared/loading';
import ErrorAlert from '../../shared/errorAlert';

export default class MoviesList extends Component {
  movieDbService = new MovieDbService();

  genres = [];

  updateData = () => {
    this.movieDbService
      .getGenres()
      .then((genres) => {
        this.genres = genres.genres;

        return this.movieDbService.getFilms();
      })
      .then((data) => {
        const movies = data.map((movie) => {
          const genresFilm = movie.genre_ids.map((el) => this.genres.find((i) => i.id === el));
          return {
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            imgUrl: movie.poster_path,
            dateRelease: new Date(movie.release_date),
            genres: genresFilm,
          };
        });

        this.setState({ movies, loading: false });
      })
      .catch(this.onError);
  };

  componentDidMount() {
    this.updateData();
  }

  state = {
    movies: [],
    loading: true,
    error: false,
  };

  onError = (err) => {
    console.log(err);
    this.setState({
      loading: false,
      error: true,
    });
  };

  render() {
    const { loading, error } = this.state;
    const hasData = !(loading || error);
    const loadingBlock = loading ? <Loading /> : null;
    const errorBlock = error ? <ErrorAlert /> : null;
    const content = hasData ? (
      <List
        className="movies-list"
        grid={{ gutter: 36, column: 2 }}
        dataSource={this.state.movies}
        renderItem={(movie) => (
          <List.Item>
            <MovieCard key={movie.id} movie={movie}>
              Card content
            </MovieCard>
          </List.Item>
        )}
      />
    ) : null;

    return (
      <>
        {loadingBlock}
        {errorBlock}
        {content}
      </>
    );
  }
}
