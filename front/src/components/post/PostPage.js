import { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../App";

import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import styled from "styled-components";

import * as Api from "../../api";
import Header from "../Header";

const PostPage = () => {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

  useEffect(() => {
    // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }
  }, [userState, navigate]);
  const editorRef = useRef(null);

  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    try {
      Api.post("post/create", {
        userId: userState.user.id,
        title: title,
        content: markdown,
        description: description,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeEditor = () => {
    if (editorRef.current) {
      setMarkdown(editorRef.current.getInstance().getMarkdown());
    }
  };

  const onUploadImage = async (blob, callback) => {
    const formData = new FormData();
    formData.append("image", blob);
    const res = await Api.postImage("uploadImage", formData);
    callback(res.data, "alt text");
    return false;
  };
  return (
    <>
      <Header />
      <PostHeader>
        <PostInputTitle
          placeholder="제목을 입력해주세요"
          onChange={(e) => setTitle(e.target.value)}
        />
        <PostInputDescription
          placeholder="당신의 포스트를 짧게 소개해주세요."
          onChange={(e) => setDescription(e.target.value)}
        />
      </PostHeader>
      <Editor
        previewStyle="vertical"
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        onChange={onChangeEditor}
        ref={editorRef}
        hooks={{
          addImageBlobHook: onUploadImage,
        }}
      />
      <SubmitButton onClick={() => handleSubmit()}>출간하기</SubmitButton>
    </>
  );
};

export default PostPage;

const PostHeader = styled.div``;

const PostInputTitle = styled.input``;

const PostInputDescription = styled.input``;

const SubmitButton = styled.button``;
