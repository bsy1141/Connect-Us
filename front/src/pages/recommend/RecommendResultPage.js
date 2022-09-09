import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "components/LoadingSpinner";
import UserCard from "components/UserCard";

const serverUrl = "http://localhost:5001";

const RecommentResultPage = () => {
  const {
    state: { userType, keywordType },
  } = useLocation();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getRecommendUsers = async () => {
    try {
      const res = await axios.get(`${serverUrl}/recommend`, {
        params: { userType, keywordType: keywordType.join(",") },
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      console.log(res.data);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setLoading(true);
    getRecommendUsers();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Container>
        <Header />
        <LoadingWrapper>
          <LoadingSpinner />
        </LoadingWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <Content>
        <h5>추천 결과</h5>
        <p>우선순위 일치도가 높은 순서대로 결과가 보여집니다.</p>
        <UserCardWrapper>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </UserCardWrapper>
      </Content>
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

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 90px 3% 0;
  > p {
    color: #7b7b7b;
  }
  overflow-y: scroll;
`;

const UserCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  padding-left: 40px;
`;
