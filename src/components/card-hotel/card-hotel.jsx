import {
  CardBody,
  CardImage,
  CardItem,
  CardList,
  CardTitle,
  CardWrapper,
} from '../card-country/card-country';

import PropTypes from 'prop-types';

export const CardHotel = ({ hotel }) => {
  return (
    <CardWrapper to={`/hotels/${hotel.id}`}>
      <CardImage src={hotel.img} />
      <CardBody>
        <CardTitle>{hotel.name}</CardTitle>
        <CardList>
          {hotel.info.map(({ title, description }) => (
            <CardItem key={title}>
              <b>{title}:</b> {description}
            </CardItem>
          ))}
        </CardList>
      </CardBody>
    </CardWrapper>
  );
};

CardHotel.propTypes = {
  hotel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    info: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
      }),
    ),
  }),
};
