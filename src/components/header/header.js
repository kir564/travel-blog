import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMoon, IoMoonOutline } from 'react-icons/io5';
import { Container } from '../container/container';
import { THEME_NAME } from '../../constants';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: var(--colors-ui-base);
  box-shadow: var(--shadow);
`;

const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
`;

const Title = styled(Link)`
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
`;

const ThemeSwitcher = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ThemeTitle = styled.div`
  text-transform: capitalize;
  margin-left: 0.5rem;
  font-size: var(--fs-sm);
  font-weight: var(--fw-normal);
`;

export const Header = () => {
  const [theme, setTheme] = useState(THEME_NAME.DARK);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const toolForToggle = {
      [THEME_NAME.DARK]: THEME_NAME.LIGHT,
      [THEME_NAME.LIGHT]: THEME_NAME.DARK,
    };

    setTheme(toolForToggle[theme]);
  };

  return (
    <HeaderWrapper>
      <Container>
        <HeaderInner>
          <Title>Where is the world?</Title>
          <ThemeSwitcher onClick={toggleTheme}>
            {theme === THEME_NAME.DARK ? (
              <IoMoon size="14" />
            ) : (
              <IoMoonOutline size="14" />
            )}
            <ThemeTitle>{theme} Theme</ThemeTitle>
          </ThemeSwitcher>
        </HeaderInner>
      </Container>
    </HeaderWrapper>
  );
};
