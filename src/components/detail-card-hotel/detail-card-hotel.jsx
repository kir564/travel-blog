import { DetailCardImage } from '../detail-card-image/detail-card-image';
import styled from 'styled-components';
import { transformHotelDetail } from '../../transforms';
import PropTypes from 'prop-types';

const Wrapper = styled.div``;

const WrapperDetailCard = styled.div`
  margin: 2rem 0;
  align-items: center;
`;

export const DetailCardHotel = ({ hotel }) => {
  const hotelInfo = transformHotelDetail(hotel);

  return (
    <Wrapper>
      <WrapperDetailCard>
        <DetailCardImage src={hotel.img} alt={hotel.name} />
        <h2>{hotel.name}</h2>
        {hotelInfo.map(({ title, description }) => (
          <p key={title}>
            <b>{title}:</b> {description}
          </p>
        ))}
      </WrapperDetailCard>
    </Wrapper>
  );
};

DetailCardHotel.propTypes = {
  hotel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    order: PropTypes.bool.isRequired,
  }),
};
