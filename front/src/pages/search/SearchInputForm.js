import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const SearchInputForm = () => {
  const options = ["전체", "기업명", "사용자명", "제목", "설명", "내용"];

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("전체");

  return (
    <InputContainer>
      <InputWrapper>
        <SelectBoxContainer>
          <SelectBoxWrapper>
            <span>{filter}</span>
            <OpenButton onClick={() => setIsOpen(!isOpen)}>
              <FontAwesomeIcon icon={faCaretDown} />
            </OpenButton>
          </SelectBoxWrapper>
          {options.map((option) => (
            <Option
              key={option}
              onClick={() => setFilter(option)}
              open={isOpen ? "block" : "none"}
            >
              {option}
            </Option>
          ))}
        </SelectBoxContainer>
        <InputFormWrapper>
          <input type="text" />
          <button>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{
                color: "#ff758f",
                fontSize: "30px",
                marginRight: "5px",
              }}
            />
          </button>
        </InputFormWrapper>
      </InputWrapper>
    </InputContainer>
  );
};

export default SearchInputForm;

const InputContainer = styled.div`
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const InputFormWrapper = styled.div`
  border: 3px solid #ff758f;
  border-left: none;
  border-radius: 0 20px 20px 0;
  height: 50px;
  display: flex;
  align-items: center;
  > input {
    width: 500px;
    border: none;
    height: 100%;
  }
  > input:focus {
    outline: none;
  }
  > button {
    background: transparent;
    border: none;
  }
`;

const SelectBoxContainer = styled.div`
  position: absolute;
  left: -100px;
  width: 100px;
  display: inline-block;
  border: 3px solid #ff758f;
  border-radius: 20px 0 0 20px;
  padding: 5px 0 5px 8px;
  line-height: 25px;
  background: #fff;
`;

const SelectBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 34px;
  > span {
    font-weight: bold;
  }
`;

const Option = styled.div`
  display: ${(props) => props.open};
  postion: abosolute;
  cursor: pointer;
`;

const OpenButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;
