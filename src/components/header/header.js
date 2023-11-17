import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoMoon, IoMoonOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { setThemeAction } from '../../actions';
import { Container } from '../container/container';
import { THEME_NAME, STYLES } from '../../constants';
import { selectTheme } from '../../selectors';

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.color.base};
  box-shadow: ${({ theme }) => theme.shadow.base};
`;

const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
`;

const Title = styled(Link)`
  font-size: ${STYLES.FS.SMALL};
  font-weight: ${STYLES.FW.BOLD};
`;

const ThemeSwitcher = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ThemeTitle = styled.div`
  text-transform: capitalize;
  margin-left: 0.5rem;
  font-size: ${STYLES.FS.SMALL};
  font-weight: ${STYLES.FW.NORMAL};
`;

export const Header = () => {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    const toolForToggle = {
      [THEME_NAME.DARK]: THEME_NAME.LIGHT,
      [THEME_NAME.LIGHT]: THEME_NAME.DARK,
    };

    const newTheme = toolForToggle[theme];

    dispatch(setThemeAction(newTheme));
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
