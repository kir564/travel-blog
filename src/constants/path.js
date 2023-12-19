export const PATH_PARAMS = {
  NAME: 'name',
  ID: 'id',
};

export const PATH = {
  AUTH: '/login',
  HOME: '/',
  COUNTRY: `/country/:${PATH_PARAMS.NAME}`,
  COUNTRIES: '/countries',
  REGISTER: '/register',
  HOTEL: `/hotels/:${PATH_PARAMS.ID}`,
};
