const ProjectEditForm = ({ project, setIsEditing, userId, setProjects }) => {
  return (
    <>
      <p>프로젝트 편집폼입니다</p>
      <button onClick={() => setIsEditing(false)}>취소</button>
    </>
  );
};

export default ProjectEditForm;
