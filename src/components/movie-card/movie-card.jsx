import React from 'react';
import { Card, Tag, Typography, Image, Rate } from 'antd';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import voteColors from '../../shared/vote-colors';
import { MovieDbServiceConsumer } from '../movie-db-service-context';

import './movie-card.scss';

const { Title, Text, Paragraph } = Typography;

export default function MovieCard({
  ratingFilm,
  movie: { id, title, description, imgUrl, dateRelease, genres, ratingCur, voteAverage },
}) {
  const style = {
    display: 'flex',
    padding: '0px',
  };

  const formatText = (text, titleCard) => {
    const endChar = titleCard.length < 16 ? 210 : 120;

    if (text.length > endChar) {
      return `${text.slice(0, text.lastIndexOf(' ', endChar))} ...`;
    }
    return text;
  };

  const ratedFilm = (rating) => {
    ratingFilm(rating);
  };

  const getTags = (filmGenres, genresOwner) => {
    return filmGenres.map((genre, idx) => {
      if (idx > 1) return null;
      const nameTag = genresOwner.find((gen) => gen.id === genre.id).name;

      return (
        <Tag key={genre.id} className="movie-card__tag">
          {nameTag}
        </Tag>
      );
    });
  };

  let colorName = voteColors.Netral;

  if (voteAverage > 0) colorName = voteColors.Danger;
  if (voteAverage > 3) colorName = voteColors.Warning;
  if (voteAverage > 5) colorName = voteColors.Success;
  if (voteAverage > 7) colorName = voteColors.Awesome;

  const voteClass = `movie-card__vote-average movie-card__vote-average--color_${colorName}`;

  return (
    <MovieDbServiceConsumer>
      {({ genres: gens }) => {
        return (
          <Card key={id} className="movie-card" hoverable bordered={false} bodyStyle={style}>
            <CardImage url={imgUrl} />
            <div className="movie-card__info">
              <div className="movie-card__header">
                <Title className="movie-card__title" level={3} ellipsis={{ rows: 2 }}>
                  {title}
                </Title>
                <div className={voteClass}>{voteAverage}</div>
              </div>

              <div className="movie-card__date">
                <Text type="secondary">{dateRelease ? format(dateRelease, 'MMMM d, y') : 'No date'}</Text>
              </div>

              <div className="movie-card__tags">{getTags(genres, gens)}</div>
              <Paragraph className="movie-card__description">{formatText(description, title)}</Paragraph>
              <Rate
                style={{ fontSize: '15px' }}
                count={10}
                value={ratingCur > 0 ? ratingCur : null}
                onChange={ratedFilm}
                allowHalf
              />
            </div>
          </Card>
        );
      }}
    </MovieDbServiceConsumer>
  );
}

const CardImage = ({ url }) => {
  return url ? (
    <Image
      className="movie-card__img"
      width={180}
      height={280}
      src={`https://image.tmdb.org/t/p/w500/${url}`}
      alt="bird on branch"
    />
  ) : (
    <Image
      width={180}
      height={280}
      src="error"
      fallback="data:image/png;base64,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"
    />
  );
};

CardImage.propTypes = {
  url: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]).isRequired,
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    imgUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
    dateRelease: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.oneOf([null])]),
    genres: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })),
    ratingCur: PropTypes.number.isRequired,
    voteAverage: PropTypes.number.isRequired,
  }).isRequired,
  ratingFilm: PropTypes.func.isRequired,
};
