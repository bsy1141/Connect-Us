import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import * as Api from "api";
import EducationCard from "./EducationCard";
import EducationAddForm from "./EducationAddForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Educations = ({ userId, isEditable }) => {
  const [educations, setEducations] = useState([
    {
      id: 1,
      school: "숙명여자대학교",
      major: "IT공학과",
      position: "재학중",
      admission: "2018.03",
      graduate: "2023.02",
    },
    {
      id: 2,
      school: "test",
      major: "test2",
      position: "졸업예정",
      admission: "2018.03",
      graduate: "2023.02",
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);

  // const fetchEducations = async () => {
  //   try {
  //     const res = await Api.get(`educationlist/${userId}`);
  //     setEducations(res.data)

  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchEducations();
  // }, [user]);

  return (
    <EductaionContainer>
      <h3>학력</h3>
      {isEditable && (
        <ButtonWrapper>
          <Button onClick={() => setIsAdding(true)}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </ButtonWrapper>
      )}
      {isAdding && (
        <EducationAddForm
          userId={userId}
          setIsAdding={setIsAdding}
          setEducations={setEducations}
        />
      )}
      {educations.map((education) => (
        <EducationCard
          key={education.id}
          userId={userId}
          education={education}
          setEducations={setEducations}
          isEditable={isEditable}
        />
      ))}
    </EductaionContainer>
  );
};

export default Educations;

const EductaionContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  border: solid 1px #c4c4c4;
  border-radius: 5px;
  padding: 1% 2%;
  > h3 {
    font-size: 20px;
    font-weight: bold;
  }
`;

const ButtonWrapper = styled.div`
  text-align: center;
`;

const Button = styled.button`
  border: none;
  border-radius: 50%;
  background: #feb8b8;
  color: #fff;
`;
