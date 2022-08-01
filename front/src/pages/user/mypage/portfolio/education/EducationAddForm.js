import { useState } from "react";
import styled from "styled-components";
import { MenuItem, TextField } from "@mui/material";
import * as Api from "api";

const positions = ["졸업", "졸업예정", "재학중", "중퇴", "수료", "휴학"];

const EducationAddForm = ({ userId, setIsAdding, setEducations }) => {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("");
  const [admission, setAdmission] = useState("");
  const [graduate, setGraduate] = useState("");

  const isValid =
    school.length > 0 &&
    major.length > 0 &&
    position.length > 0 &&
    admission.length > 0 &&
    graduate.length > 0;

  const handleSubmit = async () => {
    try {
      const res = await Api.post("education/create", {
        userId,
        school,
        major,
        position,
        admission,
        graduate,
      });
      setEducations(res.data);
    } catch (err) {
      console.log(err.message);
    }
    setIsAdding(false);
  };

  return (
    <FormContainer>
      <div>
        <TextField
          label="학교명"
          variant="outlined"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          style={{ width: "40%", marginRight: "2%" }}
        />
        <TextField
          label="입학년월"
          variant="outlined"
          value={admission}
          onChange={(e) => setAdmission(e.target.value)}
          placeholder="2018.03"
          style={{ width: "25%", marginRight: "1%" }}
        />
        <TextField
          label="졸업년월"
          variant="outlined"
          value={graduate}
          onChange={(e) => setGraduate(e.target.value)}
          placeholder="2022.02"
          style={{ width: "25%" }}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <TextField
          label="전공명"
          variant="outlined"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          style={{ width: "40%" }}
        />
        <TextField
          select
          label="졸업상태"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          style={{ width: "20%", marginLeft: "2%" }}
        >
          {positions.map((pos) => (
            <MenuItem key={pos} value={pos}>
              {pos}
            </MenuItem>
          ))}
        </TextField>

        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          valid={isValid}
          style={{ marginLeft: "9%" }}
        >
          확인
        </Button>
        <Button onClick={() => setIsAdding(false)} valid={true}>
          취소
        </Button>
      </div>
    </FormContainer>
  );
};

export default EducationAddForm;

const FormContainer = styled.div`
  margin-left: 5%;
  margin-bottom: 10px;
`;

const Button = styled.button`
  height: 55px;
  width: 10%;
  margin-right: 2%;
  border: none;
  cursor: ${(props) => (props.valid ? "pointer" : "")};
  background-color: ${(props) => (props.valid ? "#FEB8B7" : "#D0D0D0")};
`;
