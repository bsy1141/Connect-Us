import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { UserStateContext } from "../components/ContextProvider";
import Header from "./Header";
import styles from "../style/MainFeed.module.css";
import KeywordModal from "./modal/KeywordModal";
import * as Api from "../api";
import styled from "styled-components";

const followers = [
  { type: "user", name: "정혜정" },
  { type: "company", name: "Connect Us" },
  { type: "user", name: "김영희" },
  { type: "user", name: "이윤지" },
  { type: "company", name: "harmony" },
  { type: "company", name: "oo닷컴" },
  { type: "company", name: "엘리스" },
  { type: "company", name: "네이버 페이" },
  { type: "user", name: "이주영" },
  { type: "user", name: "이지은" },
];

function MainFeed() {
  const navigate = useNavigate();
  const { user } = useContext(UserStateContext);
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(user?.keywords.length === 0);

  const fetchPosts = async () => {
    const res = await Api.get("postlist");
    setPosts(res.data);
  };

  useEffect(() => {
    if (user) {
      setIsModalOpen(user.keywords.length === 0);
    }
    fetchPosts();
  }, [user]);

  return (
    <Container>
      <Header />
      <MainFeedWrapper>
        <FollowerContainer>
          {followers.map((follower) => (
            <Line key={follower.name}>
              <ProfileImage />
              <Name>
                <p>{follower.name}</p>
                {follower.type === "company" && <span>기업회원</span>}
              </Name>
            </Line>
          ))}
        </FollowerContainer>
        <PostCardsContainer>
          {posts.map((post) => (
            <PostCardContainer
              key={post.id}
              onClick={() =>
                navigate(`/post/${post.id}`, { state: { post: post } })
              }
            >
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
      {isModalOpen && <KeywordModal setIsModalOpen={setIsModalOpen} />}
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
  width: 20%;
  height: 100%;
  border: 1px solid #c4c4c4;
  border-radius: 15px;
  margin-left: 30px;
  padding: 1%;
`;

const Line = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`;

const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  background-image: url("./defaultImage.png");
  background-size: 50px 50px;
  border-radius: 50%;
  margin-right: 20px;
`;

const Name = styled.div`
  > span {
    font-size: 10px;
    margin-left: 10px;
    background: #d9e5ff;
    padding: 5px;
    border-radius: 5px;
    font-weight: bold;
  }
  > p {
    display: inline-block;
    margin: 0;
  }
`;

const PostCardsContainer = styled.div`
  width: 70%;
  height: 100%;
  margin-right: 30px;
  cursor: pointer;
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
  background-image: url("./defaultImage.png");
  background-size: cover;
  border-radius: 50%;
`;

const PostCardImage = styled.div`
  width: 150px;
  height: 150px;
  background-image: url("./defaultPostImg.jpeg");
  background-size: cover;
`;
