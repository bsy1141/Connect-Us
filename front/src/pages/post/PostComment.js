import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Api from "api";

const PostComment = ({ comments, postId, setPost }) => {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    try {
      await Api.post("comment/create", {
        postId,
        text,
      });
      const res = await Api.get(`post/${postId}`);
      setPost(res.data);
      setText("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CommentContainer>
      <p>{comments.length}개의 댓글</p>
      <textarea
        placeholder="댓글을 작성하세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <CommentButton>
        <button onClick={handleSubmit}>댓글 작성</button>
      </CommentButton>
      <Comments>
        {comments.map((comment) => (
          <Comment key={comment._id}>
            <h3 onClick={() => navigate(`/myPage/${comment.userId}`)}>
              {comment.userName}
            </h3>
            <p>{comment.text}</p>
          </Comment>
        ))}
      </Comments>
    </CommentContainer>
  );
};

export default PostComment;

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
