import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router";

import { UserStateContext } from "../App";
import * as Api from "../api";
import Header from "./Header";

function MyPage() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const position = location.state?.position;

  const [userData, setUserData] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);

  const fetchUser = async (ownerId) => {
    if (position === "user") {
      const res = await Api.get("users", ownerId);
      console.log(res.data);
      setUserData(res.data);
    } else {
      const res = await Api.get("companies", ownerId);
      console.log(res.data);
      setUserData(res.data);
    }
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }

    if (params.userId) {
      // 만약 현재 URL이 "/users/:userId" 라면, 이 userId를 유저 id로 설정함.
      const ownerId = params.userId;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchUser(ownerId);
    } else {
      // 이외의 경우, 즉 URL이 "/" 라면, 전역 상태의 user.id를 유저 id로 설정함.
      const ownerId = userState.user.id;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchUser(ownerId);
    }
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <>
      <Header />
      <div style={{ textAlign: "center" }}>
        환영합니다
        {position == "user" ? userData?.name : userData?.companyName}님!
      </div>
    </>
  );
}

export default MyPage;
