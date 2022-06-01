import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../../App";
import Header from "../../Header";
import UserCard from "./UserCard";
import styled from "styled-components";

const MyPage = () => {
  const userState = useContext(UserStateContext);
  const { id, name, email } = userState.user;
  const navigate = useNavigate();
  const keyword = [
    "IT/인터넷",
    "웹프로그래머",
    "서울",
    "신입",
    "대학교 졸업(4년제)",
  ];
  return (
    <Container>
      <Header />
      <Content>
        <UserCard name={name} email={email} keyword={keyword} />
        <UserContent></UserContent>
      </Content>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 100px 3%;
`;

const UserContent = styled.div`
  width: 70%;
  border: 1px solid black;
`;
