import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBehance,
  faFacebook,
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faHouse, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const SocialDataEditCard = ({ user }) => {
  const socialData = user.socialData[0];
  const [isEditSocialData, setIsEditSocialData] = useState(false);

  const [github, setGithub] = useState(socialData.github);
  const [behance, setBehance] = useState(socialData.behance);
  const [twitter, setTwitter] = useState(socialData.twitter);
  const [facebook, setFacebook] = useState(socialData.facebook);
  const [linkedIn, setLinkedIn] = useState(socialData.linkedIn);
  const [homepage, setHomepage] = useState(socialData.homepage);
  const [blog, setBlog] = useState(socialData.blog);

  const socialDataCategory = [
    {
      val: github,
      setVal: setGithub,
      icon: faGithub,
      text: "Github 계정을 입력하세요",
    },
    {
      val: behance,
      setVal: setBehance,
      icon: faBehance,
      text: "Behance 계정을 입력하세요",
    },
    {
      val: twitter,
      setVal: setTwitter,
      icon: faTwitter,
      text: "트위터 계정을 입력하세요",
    },
    {
      val: facebook,
      setVal: setFacebook,
      icon: faFacebook,
      text: "페이스북 계정을 입력하세요",
    },
    {
      val: linkedIn,
      setVal: setLinkedIn,
      icon: faLinkedin,
      text: "링크드인 계정을 입력하세요",
    },
    {
      val: homepage,
      setVal: setHomepage,
      icon: faHouse,
      text: "홈페이지 주소를 입력하세요",
    },
    {
      val: blog,
      setVal: setBlog,
      icon: faPenToSquare,
      text: "블로그 주소를 입력하세요",
    },
  ];

  return (
    <ContentEditCard>
      <h3>소셜 정보</h3>
      {!isEditSocialData ? (
        <button onClick={() => setIsEditSocialData(true)}>수정</button>
      ) : (
        <EditForm>
          <ul>
            {socialDataCategory.map((category, idx) => (
              <li key={idx}>
                <FontAwesomeIcon
                  icon={category.icon}
                  style={{ width: "25px" }}
                />
                <input
                  type="text"
                  placeholder={category.text}
                  value={category.val}
                  onChange={(e) => category.setVal(e.target.value)}
                />
              </li>
            ))}
          </ul>
          <div>
            <button onClick={() => setIsEditSocialData(false)}>저장</button>
          </div>
        </EditForm>
      )}
    </ContentEditCard>
  );
};

export default SocialDataEditCard;

const ContentEditCard = styled.div`
  margin-top: 5%;
  display: flex;
  margin-left: 3%;
  > h3 {
    width: 20%;
    font-size: 20px;
    margin-right: 22px;
    margin-bottom: 0;
  }
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

const EditForm = styled.div`
  width: 70%;
  ul {
    padding-left: 0;
  }
  li {
    list-style-type: none;
    > input {
      display: inline;
      width: 80%;
      margin-left: 2%;
    }
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
