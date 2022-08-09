import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { UserStateContext } from "../../components/ContextProvider";
import Header from "../Header";
import styles from "../../style/MainFeed.module.css";
import KeywordModal from "../modal/KeywordModal";
import * as Api from "../../api";
import styled from "styled-components";
import LoadingSpinner from "components/LoadingSpinner";

function MainFeed() {
  const navigate = useNavigate();
  const { user } = useContext(UserStateContext);
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(user?.keywords.length === 0);
  const [following, setFollowing] = useState(null);

  const fetchPosts = async () => {
    const res = await Api.get("postlist");
    setPosts(res.data);
  };

  useEffect(() => {
    if (user) {
      setIsModalOpen(user.keywords.length === 0);
      setFollowing(user.followings);
    }
    fetchPosts();
  }, [user]);

  if (!following) {
    return (
      <Container>
        <Header />
        <LoadingWrapper>
          <LoadingSpinner />
        </LoadingWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <MainFeedWrapper>
        <FollowingContainer>
          {following.length !== 0 ? (
            following.map((f) => (
              <Line key={f.following.name}>
                <ProfileImage
                  src={`${process.env.PUBLIC_URL}/defaultImage.png`}
                />
                <Name>
                  <p>{f.following.name}</p>
                  {f.following?.type === "company" && <span>기업회원</span>}
                </Name>
              </Line>
            ))
          ) : (
            <NoFollowingWrapper>
              <p>팔로우하는 유저가 없습니다</p>
              <button onClick={() => navigate("/search")}>검색하기</button>
            </NoFollowingWrapper>
          )}
        </FollowingContainer>
        <PostCardsContainer>
          {posts.map((post) => (
            <PostCardContainer
              key={post.id}
              onClick={() => navigate(`/post`, { state: { postId: post.id } })}
            >
              <PostCardContent>
                <PostWriterWrapper>
                  <PostWriterImage
                    src={`${process.env.PUBLIC_URL}/defaultImage.png`}
                  />
                  <span>{post.userName}</span>
                </PostWriterWrapper>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </PostCardContent>
              <PostCardImage
                src={`${process.env.PUBLIC_URL}/defaultPostImg.jpeg`}
              />
            </PostCardContainer>
          ))}
        </PostCardsContainer>
      </MainFeedWrapper>
      <button
        onClick={() => navigate("/post/create")}
        className={styles.button_add}
      >
        <FontAwesomeIcon icon={faPlus} className={styles.icon} />
      </button>
      {isModalOpen && <KeywordModal setIsModalOpen={setIsModalOpen} />}
    </Container>
  );
}

export default MainFeed;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

const FollowingContainer = styled.div`
  width: 20%;
  overflow: auto;
  border: 1px solid #c4c4c4;
  border-radius: 15px;
  margin-left: 30px;
  padding: 1%;
`;

const NoFollowingWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > button {
    width: 60%;
    border-radius: 10px;
    background: #ff758e;
    color: #fff;
    border: none;
    padding: 5px 0;
    font-weight: bold;
  }
`;

const Line = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
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

const PostWriterImage = styled.img`
  width: 50px;
  height: 50px;
  background-size: cover;
  border-radius: 50%;
`;

const PostCardImage = styled.img`
  width: 150px;
  height: 150px;
  background-size: cover;
`;
