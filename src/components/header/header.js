import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoMoon } from 'react-icons/io5';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import { CgSun } from 'react-icons/cg';
import styled from 'styled-components';
import { setThemeAction } from '../../actions';
import { Container } from '../container/container';
import { THEME_NAME, STYLES, DEVICE } from '../../constants';
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

  @media ${DEVICE.SMALL} {
    flex-direction: column;
    padding: 1rem 0;
  }
`;

const Title = styled(Link)`
  font-size: ${STYLES.FS.SMALL};
  font-weight: ${STYLES.FW.BOLD};

  @media ${DEVICE.SMALL} {
    margin-bottom: 0.5rem;
  }
`;

const ControlPanel = styled.div`
  display: flex;
  align-items: center;

  & > span {
    display: flex;
    align-items: center;
    margin-left: 1rem;
  }
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
          <Title to="/">Where is the world?</Title>
          <ControlPanel>
            {theme === THEME_NAME.LIGHT ? (
              <IoMoon size="14" onClick={toggleTheme} cursor="pointer" />
            ) : (
              <CgSun size="14" onClick={toggleTheme} cursor="pointer" />
            )}
            <span>
              {true ? (
                <BiLogInCircle size="18" cursor="pointer" />
              ) : (
                <BiLogOutCircle size="18" cursor="pointer" />
              )}
            </span>
          </ControlPanel>
        </HeaderInner>
      </Container>
    </HeaderWrapper>
  );
};
