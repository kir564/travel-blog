import { Route, Routes } from 'react-router-dom';
import { AppTheme, Header, Main } from './components';
import { CountriesPage, DetailCountryPage, HomePage, AuthPage } from './pages';

export const App = () => {
  return (
    <AppTheme>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/countries" element={<CountriesPage />} />
          <Route path="/country/:name" element={<DetailCountryPage />} />
        </Routes>
      </Main>
    </AppTheme>
  );
};
