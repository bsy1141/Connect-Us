const EducationEditForm = ({ education, setIsEditing }) => {
  return (
    <>
      <p>편집 중입니다</p>
      <button onClick={() => setIsEditing(false)}>편집 취소</button>
    </>
  );
};

export default EducationEditForm;
