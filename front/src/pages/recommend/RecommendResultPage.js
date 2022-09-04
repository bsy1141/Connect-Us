import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "components/Header";
import { useEffect } from "react";

const keywordTypeEng = {
  직무: "job",
  "직무 상세": "jobDetail",
  근무지역: "workPlace",
  경력: "career",
  학력: "education",
  고용형태: "employ",
};

const userTypeEng = {
  전체: "all",
  구직자: "user",
  구인자: "company",
};

const RecommentResultPage = () => {
  const {
    state: { userType, keywordType },
  } = useLocation();

  useEffect(() => {}, []);

  return (
    <Container>
      <Header />
      <Content></Content>
    </Container>
  );
};

export default RecommentResultPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 80px 3% 0;
  background: #efefef;
`;
