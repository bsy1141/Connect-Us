import Header from "../Header";
import { useNavigate } from "react-router-dom";

const RecommandPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div style={{ textAlign: "center" }}>
        추천 페이지
        <br />
        <button onClick={() => navigate("/result")}>추천 결과 확인하기</button>
      </div>
    </>
  );
};

export default RecommandPage;
