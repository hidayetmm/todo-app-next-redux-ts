import styled from "styled-components";

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

const NavBar = () => {
  return (
    <Header className="terminal-nav">
      <LogoDiv className="terminal-logo">
        <Logo className="logo terminal-prompt">
          <span className="no-style">TodoApp</span>
        </Logo>
      </LogoDiv>
    </Header>
  );
};

export default NavBar;
