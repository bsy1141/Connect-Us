import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as Api from "api";
import Header from "pages/Header";
import styled from "styled-components";
import LoadingSpinner from "components/LoadingSpinner";
import PostCard from "components/PostCard";
import UserCard from "components/UserCard";
//import useUpdateEffect from "components/useUpdateEffect";

const SearchResultPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");
  const option = searchParams.get("option");

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalPostsNum, setTotalPostsNum] = useState(0);
  const [loading, setLoading] = useState(false);

  const getPostsData = async () => {
    if (page === 0) return;
    if (page > totalPage) return;
    try {
      setLoading(true);
      const res = await Api.get(
        "search",
        `${option}?page=${page}&perPage=${10}&keyword=${search}`
      );
      setUsers(res.data.users);
      setPosts((cur) => [...cur, ...res.data.posts.posts]);
      setTotalPostsNum(res.data.posts.len);
      setTotalPage(res.data.posts.totalPage);

      setLoading(false);
    } catch (err) {
      setPosts([]);
      setTotalPostsNum(0);
    }
  };

  // useUpdateEffect(() => {
  //   setPosts([]);
  //   setUsers([]);
  //   setTotalPage(1);
  //   setPage(0);
  // }, [search]);

  useEffect(() => {
    getPostsData();
  }, [page]);

  if (loading) {
    return (
      <Container>
        <Header />
        <LoadingSpinnerWrapper>
          <LoadingSpinner />
        </LoadingSpinnerWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <ResultPageWrapper>
        <UsersResultWrapper>
          {users.length !== 0 && (
            <UserCardWrapper>
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </UserCardWrapper>
          )}
        </UsersResultWrapper>
        <div>
          {posts.map((post, idx) => {
            if (idx === posts.length - 1) {
              return <PostCard key={post.id} post={post} isLast />;
            }
            return <PostCard key={post.id} post={post} />;
          })}
        </div>
      </ResultPageWrapper>
    </Container>
  );
};

export default SearchResultPage;

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const LoadingSpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ResultPageWrapper = styled.div`
  margin-top: 80px;
  width: 100%;
  padding: 0 5%;
`;

const UsersResultWrapper = styled.div`
  overflow-x: hidden;
`;

const UserCardWrapper = styled.div`
  overflow-x: scroll;
  display: flex;
  &::-webkit-scrollbar {
    display: none;
  }
`;
