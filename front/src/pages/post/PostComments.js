import { useState } from "react";
import styled from "styled-components";
import * as Api from "api";
import DeleteModal from "pages/modal/DeleteModal";
import PostCommentCard from "./PostCommentCard";

const PostComments = ({ comments, postId, setPost }) => {
  const [text, setText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [curCommentId, setCurCommentId] = useState("");

  const handleDelete = async () => {
    try {
      await Api.delete(`comment/${curCommentId}`);
      const res = await Api.get(`post/${postId}`);
      setPost(res.data);
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteClick = (commentId) => {
    setIsModalOpen(true);
    setCurCommentId(commentId);
  };

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
    <>
      <CommentContainer>
        <p>{comments.length}개의 댓글</p>
        <textarea
          placeholder="댓글을 작성하세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <CommentButtonWrapper>
          <button onClick={handleSubmit}>댓글 작성</button>
        </CommentButtonWrapper>
        <Comments>
          {comments.map((comment) => (
            <PostCommentCard
              comment={comment}
              deleteClick={deleteClick}
              setPost={setPost}
              postId={postId}
            />
          ))}
        </Comments>
      </CommentContainer>
      {isModalOpen && (
        <DeleteModal
          setIsModalOpen={setIsModalOpen}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default PostComments;

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

const CommentButtonWrapper = styled.div`
  text-align: right;
  > button {
    border: none;
    border-radius: 5px;
    background-color: #ff758f;
    box-sizing: border-box;
    padding: 5px 10px;
    color: #fff;
    margin-top: 10px;
    margin-left: 5px;
  }
`;

const Comments = styled.div`
  margin: 30px 0;
`;
