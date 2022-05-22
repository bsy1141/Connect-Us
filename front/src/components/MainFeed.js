import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserStateContext } from "../App";
import Header from "./Header";

function MainFeed() {
  const userState = useContext(UserStateContext);
  const navigate = useNavigate();

  useEffect(() => {
    // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }
  }, [userState, navigate]);

  return (
    <>
      <Header />
      <div style={{ textAlign: "center" }}>
        {userState.user?.name
          ? userState.user?.name
          : userState.user?.companyName}
        님의 메인피드
        <br />
        <button onClick={() => navigate("/post")}>게시물 작성하기</button>
      </div>
    </>
  );
}

export default MainFeed;
