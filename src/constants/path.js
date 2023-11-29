export const PATH_PARAMS = {
  NAME: 'name',
};

export const PATH = {
  AUTH: '/login',
  HOME: '/',
  COUNTRY: `/country/:${PATH_PARAMS.NAME}`,
  COUNTRIES: '/countries',
  REGISTER: '/register',
  HOTEL: `/hotel/:${PATH_PARAMS.NAME}`,
};
