import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import styled from "styled-components";
import "./style/reset.css";

import LoginForm from "./pages/user/LoginForm";
import RegisterForm from "./pages/user/RegisterForm";
import MainFeed from "./pages/MainFeed";
import MyPage from "./pages/user/mypage/MyPage";
import SearchPage from "./pages/search/SearchPage";
import AddPostPage from "./pages/post/AddPostPage";
import PostPage from "./pages/post/PostPage";
import KeywordPage from "./pages/user/keyword/KeywordPage";
import ContextProvider from "./components/ContextProvider";
import FetchCurrentUser from "./components/FetchCurrentUser";

function App() {
  const wrapFetchUser = (child) => {
    return <FetchCurrentUser>{child}</FetchCurrentUser>;
  };

  const mainfeed = wrapFetchUser(<MainFeed />);
  const addpostPage = wrapFetchUser(<AddPostPage />);
  const postPage = wrapFetchUser(<PostPage />);
  const myPage = wrapFetchUser(<MyPage />);
  const keywordPage = wrapFetchUser(<KeywordPage />);
  const searchPage = wrapFetchUser(<SearchPage />);

  return (
    <ContextProvider>
      <Router>
        <Container>
          <Routes>
            <Route path="/" exact element={mainfeed} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/post" element={addpostPage} />
            <Route path="/post/:id" element={postPage} />
            <Route path="/users/:userId" element={myPage} />
            <Route path="/keyword" element={keywordPage} />
            <Route path="/search" element={searchPage} />
            <Route path="*" element={mainfeed} />
          </Routes>
        </Container>
      </Router>
    </ContextProvider>
  );
}

export default App;

const Container = styled.div`
  width = 100vw;
  height: 100vh;
  display: flex;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
