import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Api from "api";

const UserCard = ({ userId, owner }) => {
  const { keywords, id, name, followers, followings, email } = owner;
  const navigate = useNavigate();

  const isEditable = userId === id;
  const keywordsArr =
    keywords && keywords.length !== 0 ? Object.values(keywords[0]) : [];
  keywordsArr.splice(keywordsArr.length - 1, 1);
  const initalFollowState =
    followers && followers.findIndex((i) => i.follower.id === userId) !== -1
      ? true
      : false;

  const [password, setPassword] = useState("");
  const [pwConfirmed, setPwConfirmed] = useState("");
  //팔로우 중인지 아닌지 확인하는 state
  const [isFollow, setIsFollow] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  //const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    setIsFollow(initalFollowState);
    setFollowerCount(followers?.length || 0);
  }, [initalFollowState, followers]);

  const handleClickFollow = async () => {
    if (isFollow) {
      const res = await Api.put("user/unfollow", {
        userId,
        followingId: id,
      });
      const { following } = res.data;
      setFollowerCount(following.followers.length);
    } else {
      const res = await Api.put("user/follow", {
        userId,
        followingId: id,
      });
      const { following } = res.data;
      setFollowerCount(following.followers.length);
    }
    setIsFollow((prev) => !prev);
  };

  return (
    <Container>
      <UserInfo>
        <UserImage />
        <p>{name}님</p>
        {!isEditable && (
          <button onClick={handleClickFollow}>
            {isFollow ? "언팔로우" : "팔로우"}
          </button>
        )}
      </UserInfo>
      <Follows>
        <FollowsTitle>
          <p>팔로우</p>
          <p>팔로워</p>
        </FollowsTitle>
        <FollowsContent>
          <p>{followings ? followings.length : 0}</p>
          <p>{followerCount}</p>
        </FollowsContent>
      </Follows>
      <ExtraInfo>
        {keywordsArr.length !== 0 && (
          <>
            <p>관심 키워드</p>
            <div style={{ whiteSpace: "pre-line" }}>
              {keywordsArr.map((k, idx) => (
                <Keyword key={idx}>{k}</Keyword>
              ))}
            </div>
          </>
        )}
        <p>이메일</p>
        <input type="text" value={email || ""} disabled />
        <p>비밀번호</p>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>비밀번호 확인</p>
        <input
          type="text"
          value={pwConfirmed}
          onChange={(e) => setPwConfirmed(e.target.value)}
        />
        {/* <p>휴대폰번호</p>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        /> */}
        <div style={{ textAlign: "center" }}>
          <button>개인정보 수정</button>
        </div>
      </ExtraInfo>
      {keywordsArr.length === 0 && (
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
  justify-content: center;
  > p {
    align-self: center;
    margin: 0;
    font-size: 25px;
    font-weight: bold;
    padding: 0 20px;
  }
  > button {
    align-self: center;
    height: 25px;
    font-size: 13px;
    background: #ff758f;
    border-radius: 5px;
    color: #fff;
    border: none;
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
    margin: 0 10%;
  }
`;

const FollowsContent = styled.div`
  text-align: center;
  > p {
    font-size: 30px;
    font-weight: bold;
    display: inline-block;
    margin: 0 15%;
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
    font-size: 20px;
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
