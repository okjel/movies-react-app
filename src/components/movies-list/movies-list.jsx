import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import MovieCard from '../movie-card';
import './movies-list.scss';
import Loading from '../../shared/loading';
import ErrorAlert from '../../shared/errorAlert';

export default class MoviesList extends Component {
  state = {};

  static propTypes = {
    movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        imgUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
        dateRelease: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.oneOf([null])]),
        genres: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
          })
        ),
      })
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
  };

  render() {
    const { movies, loading, error } = this.props;
    const hasData = !(loading || error);
    const loadingBlock = loading ? <Loading /> : null;
    const errorBlock = error ? <ErrorAlert /> : null;
    const content = hasData ? (
      <List
        className="movies-list"
        grid={{ gutter: 36, column: 2 }}
        dataSource={movies}
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
