import { useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import * as Api from "../../api";
import remarkGfm from "remark-gfm";

import Header from "../Header";

const PostPage = () => {
  const editorRef = useRef(null);

  const [markdown, setMarkdown] = useState("");
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
        <PostInputTitle placeholder="제목을 입력해주세요" />
      </PostHeader>
      <Editor
        previewStyle="vertical"
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        initialValue="내용을 입력해주세요"
        onChange={onChangeEditor}
        ref={editorRef}
        hooks={{
          addImageBlobHook: onUploadImage,
        }}
      />
    </>
  );
};

export default PostPage;

const PostHeader = styled.div``;

const PostInputTitle = styled.input``;
