import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserStateContext } from "../App";
import Header from "./Header";

function MainFeed() {
  const userState = useContext(UserStateContext);
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div style={{ textAlign: "center" }}>
        {userState.user.name ? userState.user.name : userState.user.companyName}
        님의 메인피드
        <br />
        <button onClick={() => navigate("/post")}>게시물 작성하기</button>
      </div>
    </>
  );
}

export default MainFeed;
