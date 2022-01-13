import { createGlobalStyle } from "styled-components";

type Theme = {
  body: string;
  text: string;
};

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }: { theme: Theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }
`;
export const lightTheme: Theme = {
  body: "#f1f1f1",
  text: "#121620",
};
export const darkTheme: Theme = {
  body: "#121620",
  text: "#f1f1f1",
};
