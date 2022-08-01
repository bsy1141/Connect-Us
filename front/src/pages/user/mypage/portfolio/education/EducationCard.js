import { useState } from "react";
import styled from "styled-components";
import EducationEditForm from "./EducationEditForm";

const EducationCard = ({ userId, education, setEducations, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          education={education}
          setIsEditing={setIsEditing}
          userId={userId}
          setEducations={setEducations}
        />
      ) : (
        <CardContainer>
          <Date>
            <h3>
              {education.admission} ~ {education.graduate}
            </h3>
            <p>{education.position}</p>
          </Date>
          <Content>
            <h3>{education.school}</h3>
            <p>{education.major}</p>
          </Content>
          {isEditable && (
            <Buttons>
              <button onClick={() => setIsEditing(true)}>편집</button>
              <button>삭제</button>
            </Buttons>
          )}
        </CardContainer>
      )}
    </>
  );
};

export default EducationCard;

const CardContainer = styled.div``;

const Date = styled.div``;

const Content = styled.div``;

const Buttons = styled.div``;
