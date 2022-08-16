import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DEFAULT_POST_IMAGE =
  "https://connectusbucket.s3.ap-northeast-2.amazonaws.com/defaultPostImg.jpeg";
const DEFAULT_PROFILE_IMAGE =
  "https://connectusbucket.s3.ap-northeast-2.amazonaws.com/defaultImage.png";

const PostCard = ({ post, isLast }) => {
  const navigate = useNavigate();

  return (
    <PostCardContainer
      key={post.id}
      onClick={() => navigate(`/post/${post.id}`)}
      isLast={isLast}
    >
      <PostCardContent>
        <PostWriterWrapper>
          <PostWriterImage src={DEFAULT_PROFILE_IMAGE} />
          <span>{post.userName}</span>
        </PostWriterWrapper>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
      </PostCardContent>
      <PostCardImage src={post.previewImageLink || DEFAULT_POST_IMAGE} />
    </PostCardContainer>
  );
};

export default PostCard;

const PostCardContainer = styled.div`
  height: 230px;
  padding: 30px;
  border-bottom: ${(props) => (props.isLast ? "none" : "solid 1px #c4c4c4")};
  display: flex;
  justify-content: space-between;
`;

const PostCardContent = styled.div`
  width: 70%;
  > h3 {
    font-size: 22px;
  }
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
