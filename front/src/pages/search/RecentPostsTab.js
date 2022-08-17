import styled from "styled-components";
import SearchPostCard from "./SearchPostCard";

const RecentPostsTab = ({ posts, page, setPage }) => {
  return (
    <Container>
      {posts.map((post) => (
        <SearchPostCard post={post} key={post.id} />
      ))}
    </Container>
  );
};

export default RecentPostsTab;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 100px;
`;
