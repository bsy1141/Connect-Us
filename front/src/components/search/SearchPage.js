import Header from "../Header";
import styled from "styled-components";

const SearchPage = () => {
  return (
    <Container>
      <Header />
    </Container>
  );
};

export default SearchPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
`;
