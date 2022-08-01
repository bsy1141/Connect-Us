const EducationAddForm = ({ userId, setIsAdding, setEducations }) => {
  return (
    <>
      <p>학력 추가 폼입니다.</p>
      <button onClick={() => setIsAdding(false)}>닫기</button>
    </>
  );
};

export default EducationAddForm;
