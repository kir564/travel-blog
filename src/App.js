import { Route, Routes } from 'react-router-dom';
import { AppTheme, Header, Main } from './components';
import { HomePage } from './pages';

export const App = () => {
  return (
    <AppTheme>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Main>
    </AppTheme>
  );
};
