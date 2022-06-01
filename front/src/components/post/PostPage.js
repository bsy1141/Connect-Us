import { useLocation } from "react-router-dom";
import styled from "styled-components";

import Header from "../Header";

const PostPage = () => {
  const location = useLocation();
  const { post } = location.state;
  const { userName, title, content, createdAt } = post;

  return (
    <Container>
      <Header />
    </Container>
  );
};

export default PostPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
`;
