import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "components/Header";
import KeywordCard from "pages/keyword/KeywordCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const userTypes = ["전체", "구직자", "구인자"];
const keywordTypes = [
  "직무",
  "직무 상세",
  "근무지역",
  "경력",
  "학력",
  "고용형태",
];

const RecommendPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [keywordType, setKeywordType] = useState("");

  const isValid = userType.length !== 0 && keywordType.length === 3;
  return (
    <Container>
      <Header />
      <Content>
        <RecommendInfo>
          <KeywordCard
            title="추천 받고자 하는 사용자의 종류를 골라주세요"
            data={userTypes}
            state={userType}
            setState={setUserType}
          />
          <KeywordCard
            title="키워드 우선순위 3가지를 골라주세요."
            data={keywordTypes}
            state={keywordType}
            setState={setKeywordType}
            multiple
          />
        </RecommendInfo>
        <NextButton
          onClick={() => navigate("/recommend/result")}
          disabled={!isValid}
          isValid={isValid}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </NextButton>
      </Content>
    </Container>
  );
};

export default RecommendPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 3% 0;
  background: #efefef;
`;

const RecommendInfo = styled.div`
  width: 40%;
  height: 400px;
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 3% 1%;
`;

const NextButton = styled.button`
  border: none;
  background: transparent;
  font-size: 60px;
  cursor: pointer;
  margin-left: 10px;
  color: #c4c4c4;
  ${(props) =>
    props.isValid &&
    css`
      &:hover {
        color: #000;
      }
    `}
`;
