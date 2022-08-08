import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { UserStateContext } from "../../components/ContextProvider";
import Header from "../Header";
import { formatDate, fakeComments } from "./postModule";

import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

const PostPage = () => {
  const { user } = useContext(UserStateContext);
  const navigate = useNavigate();

  const location = useLocation();
  const { post } = location.state;
  console.log(post);
  const { userName, userId, title, description, content, createdAt } = post;
  const [id, setId] = useState(user?.id || "");

  useEffect(() => {
    if (user) {
      setId(user.id);
    }
  }, [user]);

  return (
    <Container>
      <Header />
      <Post>
        <h1>{title}</h1>
        <PostInfo>
          <WriterInfo>
            <p>{userName}</p>
            <span>{formatDate(createdAt)}</span>
          </WriterInfo>
          {id === userId && (
            <WriterAuth>
              <span>수정</span>
              <span>삭제</span>
            </WriterAuth>
          )}
        </PostInfo>
        <Description>{description}</Description>
        <Content>
          <Viewer
            plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
            initialValue={content}
          />
        </Content>
      </Post>
      <WriterProfile>
        <ProfileImage onClick={() => navigate(`/myPage/${userId}`)} />
        <h3 onClick={() => navigate(`/myPage/${userId}`)}>{userName}</h3>
      </WriterProfile>
      <CommentContainer>
        <p>{fakeComments.length}개의 댓글</p>
        <textarea placeholder="댓글을 작성하세요" />
        <CommentButton>
          <button>댓글 작성</button>
        </CommentButton>
        <Comments>
          {fakeComments.map((comment) => (
            <Comment>
              <h3 onClick={() => navigate(`/myPage/${comment.authorId}`)}>
                {comment.authorName}
              </h3>
              <p>{comment.text}</p>
            </Comment>
          ))}
        </Comments>
      </CommentContainer>
    </Container>
  );
};

export default PostPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
`;

const Post = styled.div`
  margin-top: 100px;
  box-sizing: border-box;
  padding: 0 200px;
  > h1 {
    font-weight: bold;
  }
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WriterInfo = styled.div`
  > p {
    display: inline-block;
    margin-right: 15px;
    font-weight: bold;
  }
  > span {
    color: #4d555b;
  }
`;

const WriterAuth = styled.div`
  > span {
    margin-right: 10px;
    cursor: pointer;
    color: #969696;
  }
  > span:hover {
    color: #000;
  }
`;

const Content = styled.div`
  margin-top: 50px;
`;

const Description = styled.div`
  border: none;
  background: #f8f9fa;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px;
`;

const WriterProfile = styled.div`
  margin-top: 50px;
  padding: 0 200px;
  box-sizing: border-box;
  display: flex;
  > h3 {
    cursor: pointer;
    align-self: center;
    margin-left: 30px;
  }
  > h3:hover {
    text-decoration: underline;
  }
`;

const ProfileImage = styled.div`
  background-color: #c4c4c4;
  border-radius: 50%;
  width: 100px;
  height: 100px;
`;

const CommentContainer = styled.div`
  padding: 0 200px;
  box-sizing: border-box;
  margin-top: 50px;
  > textarea {
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    padding: 10px;
  }
`;

const CommentButton = styled.div`
  text-align: right;
  > button {
    border: none;
    border-radius: 5px;
    background-color: #ff758f;
    box-sizing: border-box;
    padding: 5px 10px;
    color: #fff;
    margin-top: 10px;
  }
`;

const Comments = styled.div`
  margin-top: 30px;
`;

const Comment = styled.div`
  > h3 {
    font-size: 20px;
    cursor: pointer;
  }
  > h3:hover {
    text-decoration: underline;
  }
`;
