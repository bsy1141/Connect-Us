import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as Api from "./api";
import { loginReducer } from "./reducer";
import styled from "styled-components";

import LoginForm from "./components/user/LoginForm";
import RegisterForm from "./components/user/RegisterForm";
import MainFeed from "./components/MainFeed";
import MyPage from "./components/user/mypage/MyPage";
//import RecommandPage from "./components/recommand/RecommandPage";
//import RecommandResultPage from "./components/recommand/RecommandResultPage";
import SearchPage from "./components/SearchPage";
import AddPostPage from "./components/post/AddPostPage";
import PostPage from "./components/post/PostPage";
import KeywordPage from "./components/user/keyword/KeywordPage";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });

  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get("user/current");
      const currentUser = res.data;

      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });

      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <Router>
          <Container>
            <Routes>
              <Route path="/" exact element={<MainFeed />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/post" element={<AddPostPage />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/users/:userId" element={<MyPage />} />
              <Route path="/keyword" element={<KeywordPage />} />
              {/* <Route path="/recommand" element={<RecommandPage />} />
              <Route path="/recommand/result" element={<RecommandResultPage />} /> */}
              <Route path="/search" element={<SearchPage />} />
              <Route path="*" element={<MainFeed />} />
            </Routes>
          </Container>
        </Router>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
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
