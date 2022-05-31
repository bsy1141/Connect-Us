import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { UserStateContext } from "../App";
import Header from "./Header";
import styles from "../css/MainFeed.module.css";
import * as Api from "../api";
import styled from "styled-components";

function MainFeed() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await Api.get("postlist");
    setPosts(res.data);
  };

  useEffect(() => {
    // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }
    fetchPosts();
  }, [userState, navigate, posts]);

  return (
    <Container>
      <Header />
      <MainFeedWrapper>
        <FollowerContainer></FollowerContainer>
        <PostCardsContainer>
          {posts.map((post) => (
            <PostCardContainer key={post.id}>
              <PostCardContent>
                <PostWriterWrapper>
                  <PostWriterImage />
                  <span>{post.userName}</span>
                </PostWriterWrapper>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </PostCardContent>
              <PostCardImage />
            </PostCardContainer>
          ))}
        </PostCardsContainer>
      </MainFeedWrapper>
      <button onClick={() => navigate("/post")} className={styles.button_add}>
        <FontAwesomeIcon icon={faPlus} className={styles.icon} />
      </button>
    </Container>
  );
}

export default MainFeed;

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const MainFeedWrapper = styled.div`
  margin-top: 80px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 5%;
`;

const FollowerContainer = styled.div`
  width: 15%;
  height: 100%;
  border: 1px solid #c4c4c4;
  border-radius: 15px;
  margin-left: 30px;
`;

const PostCardsContainer = styled.div`
  width: 75%;
  height: 100%;
  margin-right: 30px;
`;

const PostCardContainer = styled.div`
  height: 230px;
  padding: 30px;
  border-bottom: solid 1px #c4c4c4;
  display: flex;
  justify-content: space-between;
`;

const PostCardContent = styled.div`
  width: 70%;
  > p {
    color: #828282;
  }
`;

const PostWriterWrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
  > span {
    margin-left: 10px;
    align-self: center;
  }
`;

const PostWriterImage = styled.div`
  width: 50px;
  height: 50px;
  background: #c4c4c4;
  border-radius: 50%;
`;

const PostCardImage = styled.div`
  width: 150px;
  height: 150px;
  background: #c4c4c4;
`;
