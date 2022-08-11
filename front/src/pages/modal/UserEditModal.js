import styled from "styled-components";
const UserEditModal = ({ setIsModalOpen }) => {
  return (
    <Container>
      <Section>
        <Title>
          <h4>나의 정보 수정</h4>
        </Title>
        <Content></Content>
        <Buttons>
          <button
            onClick={() => setIsModalOpen(false)}
            style={{ color: "#ff758f" }}
          >
            취소
          </button>
        </Buttons>
      </Section>
    </Container>
  );
};

export default UserEditModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(100, 100, 100, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Section = styled.div`
  padding: 30px;
  width: 700px;
  height: 600px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div``;

const Title = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  > button {
    border-radius: 10px;
    width: 150px;
    height: 50px;
    border: none;
    font-weight: bold;
  }
`;
