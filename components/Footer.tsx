import styled from "styled-components";
import { NextjsIcon, ReactIcon, Redux, Typescript } from "../public/icons";

const FooterMain = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 35%;
  justify-content: space-between;
`;

const Link = styled.a`
  display: flex;
  width: 50px;
  height: 50px;
  padding: 5px;
`;

const Footer = () => {
  return (
    <FooterMain>
      <IconsContainer>
        <Link
          title="React"
          href="https://reactjs.org/"
          target="_blank"
          rel="noreferrer"
        >
          <ReactIcon />
        </Link>
        <Link
          title="Typescript"
          href="https://www.typescriptlang.org/"
          target="_blank"
          rel="noreferrer"
        >
          <Typescript />
        </Link>
        <Link
          title="Redux"
          href="https://redux-toolkit.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <Redux />
        </Link>
        <Link
          title="Next.js"
          href="https://nextjs.org/"
          target="_blank"
          rel="noreferrer"
        >
          <NextjsIcon />
        </Link>
      </IconsContainer>
    </FooterMain>
  );
};

export default Footer;
NextjsIcon;
