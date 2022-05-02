import Header from "../Header";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../App";

const MyPage = () => {
  const userState = useContext(UserStateContext);
  console.log(userState.user);
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div style={{ textAlign: "center" }}>
        My Page
        <br />
        <button onClick={() => navigate("/recommand")}>추천 받으러가기</button>
      </div>
    </>
  );
};

export default MyPage;
