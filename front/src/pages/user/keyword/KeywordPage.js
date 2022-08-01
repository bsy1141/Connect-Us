import { useContext, useState } from "react";
import styled from "styled-components";
import Header from "../../Header";
import {
  jobType,
  jobDetailType,
  workPlaceType,
  careerType,
  educationType,
  employType,
} from "./KeywordData";
import KeywordCard from "./KeywordCard";
import * as Api from "../../../api";
import { UserStateContext } from "../../../components/ContextProvider";
import { useNavigate } from "react-router-dom";

const KeywordPage = () => {
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [jobDetail, setJobDetail] = useState(null);
  const [workPlace, setWorkPlace] = useState(null);
  const [career, setCareer] = useState(null);
  const [education, setEducation] = useState(null);
  const [employ, setEmploy] = useState(null);

  const { user } = useContext(UserStateContext);

  const handleSubmit = () => {
    try {
      Api.post("users/keywords", {
        id: user.id,
        job,
        jobDetail,
        workPlace,
        career,
        education,
        employ,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <KeywordCard
          title="직무"
          data={jobType}
          state={job}
          setState={setJob}
        />
        {job && (
          <KeywordCard
            title={job}
            data={jobDetailType[job]}
            state={jobDetail}
            setState={setJobDetail}
          />
        )}
        <KeywordCard
          title="근무 지역"
          data={workPlaceType}
          state={workPlace}
          setState={setWorkPlace}
        />
        <KeywordCard
          title="경력"
          data={careerType}
          state={career}
          setState={setCareer}
        />
        <KeywordCard
          title="학력"
          data={educationType}
          state={education}
          setState={setEducation}
        />
        <KeywordCard
          title="고용 형태"
          data={employType}
          state={employ}
          setState={setEmploy}
        />
        <KeywordSubmitButton onClick={handleSubmit}>
          키워드 저장하기
        </KeywordSubmitButton>
      </Container>
    </>
  );
};

export default KeywordPage;

const Container = styled.div`
  margin-top: 80px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const KeywordSubmitButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #ff758f;
  padding: 10px 20px;
  color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 10px;
`;
