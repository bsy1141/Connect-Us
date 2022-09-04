import styled from "styled-components";

const KeywordCard = ({
  title,
  data,
  state,
  setState,
  isRecommend,
  multiple,
}) => {
  const clickMultipleState = (s) => {
    if (state.includes(s)) {
      const filteredArr = state.filter((data) => data !== s);
      setState(filteredArr);
    } else {
      if (state.length === 3) {
        const updatedArr = state.map((data, idx) => {
          if (idx === 2) {
            data = s;
          }
          return data;
        });
        setState(updatedArr);
      } else {
        setState((cur) => [...cur, s]);
      }
    }
  };

  if (isRecommend) {
    if (multiple) {
      return (
        <CardContainer>
          <h5>{title}</h5>
          <MultipleCardContent>
            {data.map((s) => (
              <Keyword
                onClick={() => clickMultipleState(s.eng)}
                bgcolor={state.includes(s.eng) ? "#ff758f" : "#fff"}
                color={state.includes(s.eng) ? "#fff" : "#828282"}
                border={state.includes(s.eng) ? "none" : "1px solid #c4c4c4"}
                multiple={true}
              >
                {s.kor}
              </Keyword>
            ))}
          </MultipleCardContent>
        </CardContainer>
      );
    }
    return (
      <CardContainer>
        <h5>{title}</h5>
        <CardContent>
          {data.map((s) => (
            <Keyword
              onClick={() => setState(s.eng)}
              bgcolor={state === s.eng ? "#ff758f" : "#fff"}
              color={state === s.eng ? "#fff" : "#828282"}
              border={state === s.eng ? "none" : "1px solid #c4c4c4"}
            >
              {s.kor}
            </Keyword>
          ))}
        </CardContent>
      </CardContainer>
    );
  }

  return (
    <CardContainer>
      <h5>{title}</h5>
      <CardContent>
        {data.map((s) => (
          <Keyword
            onClick={() => setState(s)}
            bgcolor={state === s ? "#ff758f" : "#fff"}
            color={state === s ? "#fff" : "#828282"}
            border={state === s ? "none" : "1px solid #c4c4c4"}
          >
            {s}
          </Keyword>
        ))}
      </CardContent>
    </CardContainer>
  );
};

export default KeywordCard;

const CardContainer = styled.div`
  max-width: 100%;
  padding: 0 0 30px 20px;
`;

const CardContent = styled.div`
  width: 100%;
  white-space: nowrap;
  height: 100px;
  overflow-x: scroll;
  padding: 20px 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MultipleCardContent = styled.div`
  width: 100%;
  padding: 20px 0;
  white-space: pre-line;
`;

const Keyword = styled.span`
  display: ${(props) => (props.multiple ? "inline-block" : "inline")};
  padding: 8px 20px;
  border: ${(props) => props.border};
  border-radius: 30px;
  margin-right: 20px;
  margin-bottom: ${(props) => (props.multiple ? "20px" : "0px")};
  color: ${(props) => props.color};
  font-weight: 700;
  background: ${(props) => props.bgcolor};
  cursor: pointer;
  &:hover {
    background: #ff758f;
    color: #fff;
    border: none;
  }
`;
