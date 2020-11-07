import React, { Component } from 'react';
import { Card, Tag, Typography, Image } from 'antd';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import './movie-card.scss';

const { Title, Text, Paragraph } = Typography;

export default class MovieCard extends Component {
  static propTypes = {
    movie: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      imgUrl: PropTypes.string,
      dateRelease: PropTypes.instanceOf(Date),
      genres: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })),
    }).isRequired,
  };

  style = {
    display: 'flex',
    padding: '0px',
  };

  formatText = (text) => {
    const endChar = 210;
    let ftText = text;

    if (ftText.length > endChar) {
      ftText = `${ftText.slice(0, ftText.lastIndexOf(' ', endChar))} ...`;
    }

    return ftText;
  };

  render() {
    const { id, title, description, imgUrl, dateRelease, genres } = this.props.movie;

    const genresFilm = genres.map((genre, idx) => {
      if (idx < 3) {
        return (
          <Tag key={genre.id} className="movie-card__tag">
            {genre.name}
          </Tag>
        );
      }
      return null;
    });

    return (
      <Card key={id} className="movie-card" hoverable bordered={false} bodyStyle={this.style}>
        <Image
          className="movie-card__img"
          width={180}
          height={280}
          src={`https://image.tmdb.org/t/p/w500/${imgUrl}`}
          alt="bird on branch"
        />
        <div className="movie-card__info">
          <Title className="movie-card__title" level={3}>
            {title}
          </Title>
          <div className="movie-card__date">
            <Text type="secondary">{format(dateRelease, 'MMMM d, y')}</Text>
          </div>

          <div className="movie-card__tags">{genresFilm}</div>
          <Paragraph className="movie-card__description">{this.formatText(description)}</Paragraph>
        </div>
      </Card>
    );
  }
}
