import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UserStateContext } from "components/ContextProvider";
import Header from "../../Header";
import UserCard from "./UserCard";
import MyPostsTab from "./MyPostsTab";
import MyPortfolioTab from "./MyPortfolioTab";
import LoadingSpinner from "components/LoadingSpinner";
import styled, { css } from "styled-components";
import * as Api from "../../../api";

const PER_PAGE = 5;

const MyPage = () => {
  const { ownerId } = useParams();
  const { user } = useContext(UserStateContext);

  //const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("posts");
  const [owner, setOwner] = useState({});
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const fetchMyPageOwner = async () => {
    try {
      const res = await Api.get(`users/${ownerId}`);
      setOwner(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPosts = async () => {
    try {
      if (page === 0) {
        setPage(1);
      }
      const res = await Api.get(
        "postlist",
        `${ownerId}?page=${page}&perPage=${PER_PAGE}`
      );
      const { total, posts } = res.data;
      setTotalPage(total);
      setPosts(posts);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  useEffect(() => {
    fetchMyPageOwner();
    fetchPosts();
  }, [ownerId, page, totalPage]);

  // if (loading) {
  //   return <LoadingSpinner />;
  // }

  return (
    <Container>
      <Header />
      <Content>
        <UserCard userId={userId} owner={owner} />
        <UserContent>
          <TabButtons>
            <Button onClick={() => setTab("posts")} isClicked={tab === "posts"}>
              게시물 모아보기
            </Button>
            <Button
              onClick={() => setTab("portfolio")}
              isClicked={tab === "portfolio"}
            >
              나의 이력서
            </Button>
          </TabButtons>
          {tab === "posts" && (
            <MyPostsTab
              posts={posts}
              page={page}
              totalPage={totalPage}
              setPage={setPage}
            />
          )}
          {tab === "portfolio" && <MyPortfolioTab />}
        </UserContent>
      </Content>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 100px 3% 0;
`;

const UserContent = styled.div`
  width: 70%;
`;

const TabButtons = styled.div`
  height: 6%;
`;

const Button = styled.button`
  cursor: pointer;
  color: #000;
  background: #fff;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  min-width: 130px;
  height: 100%;
  ${(props) =>
    props.isClicked &&
    css`
      color: #fff;
      background: #ff758f;
      border: none;
    `};
`;
