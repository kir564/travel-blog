import { setUserAction } from './actions';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppTheme, Header, Main } from './components';
import { STORAGE_KEY, PATH } from './constants';
import { CountriesPage, DetailCountryPage, HomePage, AuthPage } from './pages';

export const App = () => {
  const dispatch = useDispatch();
  const currentUser = sessionStorage.getItem(STORAGE_KEY.USER);

  if (currentUser) {
    dispatch(setUserAction(JSON.parse(currentUser)));
  }

  return (
    <AppTheme>
      <Header />
      <Main>
        <Routes>
          <Route path={PATH.HOME} element={<HomePage />} />
          <Route path={PATH.AUTH} element={<AuthPage />} />
          <Route path={PATH.REGISTER} element={<div>Reg</div>} />
          <Route path={PATH.COUNTRIES} element={<CountriesPage />} />
          <Route path={PATH.COUNTRY} element={<DetailCountryPage />} />
        </Routes>
      </Main>
    </AppTheme>
  );
};
