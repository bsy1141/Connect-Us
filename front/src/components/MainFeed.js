import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { UserStateContext } from "../App";
import Header from "./Header";
import styles from "../css/MainFeed.module.css";

function MainFeed() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

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
        <p>
          {userState.user?.name
            ? userState.user?.name
            : userState.user?.companyName}{" "}
          님의 메인피드
        </p>
        <button onClick={() => navigate("/post")} className={styles.button_add}>
          <FontAwesomeIcon icon={faPlus} className={styles.icon} />
        </button>
      </div>
    </>
  );
}

export default MainFeed;
