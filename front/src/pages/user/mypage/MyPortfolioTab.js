import styled from "styled-components";

const MyPortfolioTab = () => {
  const types = ["학력", "경력", "대외활동", "프로젝트", "자격증"];
  return (
    <Container>
      {types.map((type) => (
        <PortfolioCard>
          <p>{type}</p>
        </PortfolioCard>
      ))}
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

const PortfolioCard = styled.div`
  width: 100%;
  margin-bottom: 20px;
  height: 200px;
  border: solid 1px #c4c4c4;
  border-radius: 5px;
  padding: 1% 2%;
  > p {
    font-size: 20px;
    font-weight: bold;
  }
`;
