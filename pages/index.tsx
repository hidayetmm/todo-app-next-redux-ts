import type { NextPage } from "next";
import Head from "next/head";
import styled, { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { lightTheme, darkTheme, GlobalStyles } from "../theme";
import NewTodo from "../components/NewTodo";
import Todos from "../components/Todos";
import Notification from "../components/Notification";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const TodoContainer = styled.div`
  padding: 50px;
  border: 1px solid var(--font-color);
  display: flex;
  flex-direction: column;
  min-height: 500px;
`;

const Home: NextPage = () => {
  const themeMode = useSelector<RootState>((state) => state.theme.mode);
  const notification = useSelector((state: RootState) => state.notification);

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className="container">
        <NavBar />
        <Main>
          <TodoContainer>
            <NewTodo />
            <Todos />
          </TodoContainer>
          {notification.isActive && (
            <Notification notification={notification} />
          )}
        </Main>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default Home;
