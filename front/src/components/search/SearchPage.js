import { useState } from "react";
import Header from "../Header";
import styled from "styled-components";
import SearchInputForm from "./SearchInputForm";
import { JobSeeker, JobRecruiter } from "./SearchMockData";

const SearchPage = () => {
  return (
    <Container>
      <Header />
      <Content>
        <SearchInputForm />
        <PopularPostsContainer>
          <PopularContent>
            <p>구직자 인기글</p>
            {JobSeeker.map((js) => (
              <Card>
                <WriterInfo>
                  <WriterImage />
                  <p>{js.name}</p>
                </WriterInfo>
                <h3>{js.title}</h3>
                <p>{js.content}</p>
              </Card>
            ))}
          </PopularContent>
          <PopularContent>
            <p>구인자 인기글</p>
            {JobRecruiter.map((jr) => (
              <Card>
                <WriterInfo>
                  <WriterImage />
                  <p>{jr.name}</p>
                </WriterInfo>
                <h3>{jr.title}</h3>
                <p>{jr.content}</p>
              </Card>
            ))}
          </PopularContent>
        </PopularPostsContainer>
      </Content>
    </Container>
  );
};

export default SearchPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 100px 3% 3% 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PopularPostsContainer = styled.div`
  height: 75%;
  display: flex;
  justify-content: space-evenly;
`;

const PopularContent = styled.div`
  border: 3px solid #ff758f;
  border-radius: 10px;
  width: 40%;
  padding: 1% 2%;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  > p {
    font-size: 20px;
    font-weight: bold;
  }
`;

const Card = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 3%;
  cursor: pointer;
  > h3 {
    font-size: 20px;
  }
  > p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const WriterInfo = styled.div`
  display: flex;
  margin-bottom: 3%;
  > p {
    align-self: center;
    margin: 0 0 0 2%;
  }
`;

const WriterImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #c4c4c4;
`;
