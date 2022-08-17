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
import PostCard from "../../components/PostCard";

const COUNT = 5;
const DEFAULT_PROFILE_IMAGE =
  "https://connectusbucket.s3.ap-northeast-2.amazonaws.com/defaultImage.png";

function MainFeed() {
  const navigate = useNavigate();
  const { user } = useContext(UserStateContext);

  const [posts, setPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [following, setFollowing] = useState(null);
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    const followingPosts = await Api.get("posts/following");
    if (followingPosts.data.length < 3) {
      const posts = await Api.get(`posts/popular?count=${COUNT}`);
      setPopularPosts(posts.data);
    }
    setPosts(followingPosts.data);
  };

  const setUser = (user) => {
    if (user) {
      setType(user.type);
      setIsModalOpen(user.keywords.length === 0);
      setFollowing(user.followings);
    }
  };

  useEffect(() => {
    setLoading(true);

    setUser(user);
    fetchPosts();

    setLoading(false);
  }, [user]);

  console.log(user);

  if (loading) {
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
          {following && following.length !== 0 ? (
            following.map((f) => (
              <Line key={f.following.name}>
                <ProfileImage
                  src={f.following.imageLink || DEFAULT_PROFILE_IMAGE}
                />
                <Name>
                  <p onClick={() => navigate(`/mypage/${f.following.id}`)}>
                    {f.following.name}
                  </p>
                  {f.following.type === "company" && <span>기업회원</span>}
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
          {posts.map((post, idx) => {
            if (idx === posts.length - 1) {
              return <PostCard key={post.id} post={post} isLast />;
            }
            return <PostCard key={post.id} post={post} />;
          })}
          {popularPosts.length !== 0 && (
            <PopularPostsContainer>
              <h3>추천 게시글</h3>
              <p>추천 게시글을 확인해보세요!</p>
              {popularPosts.map((post, idx) => {
                if (idx === popularPosts.length - 1) {
                  return <PostCard key={post.id} post={post} isLast />;
                }
                return <PostCard key={post.id} post={post} />;
              })}
            </PopularPostsContainer>
          )}
        </PostCardsContainer>
      </MainFeedWrapper>
      <button
        onClick={() => navigate("/post/create")}
        className={styles.button_add}
      >
        <FontAwesomeIcon icon={faPlus} className={styles.icon} />
      </button>
      {isModalOpen && (
        <KeywordModal setIsModalOpen={setIsModalOpen} type={type} />
      )}
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
  display: flex;
  justify-content: space-between;
  padding: 0 5%;
`;

const FollowingContainer = styled.div`
  width: 20%;
  overflow: auto;
  height: 80vh;
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

const PopularPostsContainer = styled.div`
  width: 100%;
  margin-bottom: 5%;
  border: 1px solid #c4c4c4;
  border-radius: 15px;
  padding: 20px;
  > h3 {
    font-size: 20px;
  }
  > p {
    color: #c4c4c4;
  }
`;
