import { useState } from "react";
import styled from "styled-components";

const ProfileEditCard = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [introduction, setIntroduction] = useState(user.introduction);

  return (
    <ProfileContainer>
      <ProfileImageContainer>
        <img src={user.imageLink} alt="profile_image" />
        <button>이미지 업로드</button>
        <button>이미지 삭제</button>
      </ProfileImageContainer>
      <ProfileContentContainer>
        <ProfileEditForm>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="나를 나타내는 한 줄 소개를 작성해주세요."
          />
          <div>
            <button>저장</button>
          </div>
        </ProfileEditForm>
      </ProfileContentContainer>
    </ProfileContainer>
  );
};

export default ProfileEditCard;

const ProfileContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const ProfileImageContainer = styled.div`
  width: 20%;
  text-align: center;
  margin-right: 20px;
  > img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  > button {
    width: 100%;
    border: none;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 1%;
  }
`;

const ProfileContentContainer = styled.div`
  width: 70%;
  > button {
    border: none;
    background: transparent;
    text-decoration: underline;
    color: #ff758e;
  }
  > button:hover {
    color: #feb8b8;
  }
`;

const ProfileEditForm = styled.div`
  > input:nth-child(1) {
    height: 45px;
    font-size: 20px;
  }
  > div {
    text-align: right;
    > button {
      border-radius: 10px;
      padding: 1% 3%;
      border: none;
      background: #ff758e;
      color: #fff;
    }
  }
`;
