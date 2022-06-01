import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const UserCard = ({ name, email, keyword }) => {
  const [eMail, setEMail] = useState(email);
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  return (
    <Container>
      <UserInfo>
        <UserImage />
        <p>{name}님</p>
      </UserInfo>
      <Follows>
        <FollowsTitle>
          <p>팔로우</p>
          <p>팔로워</p>
        </FollowsTitle>
        <FollowsContent>
          <p>200</p>
          <p>230</p>
        </FollowsContent>
      </Follows>
      <ExtraInfo>
        {keyword && (
          <>
            <p>관심 키워드</p>
            <div style={{ whiteSpace: "pre-line" }}>
              {keyword.map((k) => (
                <Keyword>{k}</Keyword>
              ))}
            </div>
          </>
        )}
        <p>이메일</p>
        <input
          type="text"
          value={eMail}
          onChange={(e) => setEMail(e.target.value)}
        />
        <p>생년월일</p>
        <input
          type="text"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <p>성별</p>
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <p>휴대폰번호</p>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <div style={{ textAlign: "center" }}>
          <button>개인정보 수정</button>
        </div>
      </ExtraInfo>
      {!keyword && (
        <RegisterKeyword>
          <button onClick={() => navigate("/keyword")}>
            관심 키워드 등록하기
          </button>
          <p>등록된 관심 키워드를 바탕으로 맞춤 기업을 추천해드립니다</p>
        </RegisterKeyword>
      )}
    </Container>
  );
};

export default UserCard;

const Container = styled.div`
  width: 25%;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15%;
  > p {
    align-self: center;
    margin: 0;
    font-size: 30px;
    font-weight: bold;
  }
`;

const UserImage = styled.div`
  background: #c4c4c4;
  border-radius: 50%;
  width: 70px;
  height: 70px;
`;

const Follows = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  width: 100%;
  padding: 3%;
  margin-top: 5%;
`;

const FollowsTitle = styled.div`
  text-align: center;
  > p {
    font-weight: bold;
    color: #ff758f;
    display: inline;
    margin: 0 12%;
  }
`;

const FollowsContent = styled.div`
  text-align: center;
  > p {
    font-size: 30px;
    font-weight: bold;
    display: inline-block;
    margin: 0 10%;
  }
`;

const ExtraInfo = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  width: 100%;
  padding: 8%;
  margin-top: 5%;
  > p {
    font-size: 10px;
    margin: 2% 0;
  }
  > input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #000;
    margin-bottom: 8%;
  }
  > div > button {
    background: #ffb8b8;
    font-weight: bold;
    padding: 3% 10%;
    color: #fff;
    border-radius: 10px;
    border: none;
  }
`;

const RegisterKeyword = styled.div`
  text-align: center;
  margin-top: 5%;
  > button {
    font-size: 25px;
    font-weight: bold;
    padding: 3% 20%;
    border-radius: 10px;
    border: none;
    background: #ff758f;
    color: #fff;
  }
  > p {
    font-size: 13px;
    margin-top: 1%;
    color: #063dff;
  }
`;

const Keyword = styled.span`
  display: inline-block;
  background: #ffb8b8;
  color: #fff;
  font-weight: bold;
  border-radius: 20px;
  padding: 2% 5%;
  margin: 0 3% 3% 0;
`;
