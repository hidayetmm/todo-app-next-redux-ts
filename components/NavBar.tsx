import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { GithubCorner } from "../public/icons";
import { RootState } from "../store/store";
import { uiActions } from "../store/theme-slice";
import { ThemeMode } from "../store/types";

const Header = styled.div``;

const LogoDiv = styled.div``;
const Logo = styled.div`
  span {
    cursor: pointer;
    color: var(--primary-color);
    text-decoration: none;
    :hover {
      background-color: var(--primary-color);
      color: var(--invert-font-color);
    }
  }
`;

const Menu = styled.nav``;

const NavBar = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const [isDarkMode, setIsDarkMode] = useState<boolean>();
  useEffect(() => {
    setIsDarkMode(themeMode === "dark");
  }, []);

  const themeChangeHandler = (mode: ThemeMode) => {
    dispatch(uiActions.toggle(mode));
    setIsDarkMode(mode === "dark" ? true : false);
    localStorage.setItem("theme", mode);
  };

  return (
    <>
      <Header className="terminal-nav">
        <LogoDiv className="terminal-logo">
          <Logo className="logo terminal-prompt">
            <span className="no-style">TodoApp</span>
          </Logo>
        </LogoDiv>
        <Menu className="terminal-menu">
          <ul>
            <li>
              <a
                onClick={() => themeChangeHandler("light")}
                className={`menu-item${isDarkMode ? "" : " active"}`}
                href="#"
              >
                Light
              </a>
            </li>
            <li>
              <a
                onClick={() => themeChangeHandler("dark")}
                className={`menu-item${isDarkMode ? " active" : ""}`}
                href="#"
              >
                Dark
              </a>
            </li>
          </ul>
        </Menu>
      </Header>
      <a
        target="_blank"
        href="https://github.com/hidayetmm/todo-app-next-redux-typescript"
      >
        <GithubCorner />
      </a>
    </>
  );
};

export default NavBar;
