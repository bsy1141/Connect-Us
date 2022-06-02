import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyPosts = ({ posts, page, totalPage, setPage }) => {
  const navigate = useNavigate();
  return (
    <Container>
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
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <PaginationButton>
          <button
            style={{ borderRight: "1px solid #c4c4c4", marginRight: "10px" }}
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page <= 1}
          >
            {"<"}
          </button>
          <span>
            {page}/{totalPage}
          </span>
          <button
            style={{ borderLeft: "1px solid #c4c4c4", marginLeft: "10px" }}
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= totalPage}
          >
            {">"}
          </button>
        </PaginationButton>
      </div>
    </Container>
  );
};

export default MyPosts;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 10px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
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

const PaginationButton = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  width: 10%;
  text-align: center;
  font-size: 20px;
  > button {
    border: none;
    background: transparent;
    font-weight: bold;
  }
  > button:hover {
    color: #ff758f;
  }
`;
