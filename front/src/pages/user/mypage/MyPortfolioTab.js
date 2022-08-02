import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Educations from "./portfolio/education/Educations";
import Projects from "./portfolio/project/Projects";
import Certificates from "./portfolio/certificate/Certificates";
import { UserStateContext } from "components/ContextProvider";

const MyPortfolioTab = () => {
  const { user } = useContext(UserStateContext);
  const { userId } = useParams();

  const [isEditable, setIsEditable] = useState(userId === user?.id);

  useEffect(() => {
    if (user) {
      setIsEditable(userId === user.id);
    }
  }, [user]);

  return (
    <Container>
      <Educations userId={userId} isEditable={isEditable} />
      <Projects userId={userId} isEditable={isEditable} />
      <Certificates userId={userId} isEditable={isEditable} />
    </Container>
  );
};

export default MyPortfolioTab;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 10px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
