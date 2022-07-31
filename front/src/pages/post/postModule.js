export const formatDate = (date) => {
  const dateArr = date.substring(0, 10).split("-");
  const year = dateArr[0];
  const month = parseInt(dateArr[1]);
  const day = parseInt(dateArr[2]);

  return `${year}년 ${month}월 ${day}일`;
};

export const fakeComments = [
  {
    authorName: "정혜정",
    authorId: "0d2b5c22-8ab8-44c6-91e2-3f20270c7dd2",
    text: "흥미로운 정보 감사합니다!",
  },
  {
    authorName: "connectUs",
    authorId: "8f2156f9-f53e-43c4-b79d-e5e7bc1f35fe",
    text: "채용 제안하고 싶습니다. 연락주세요. connectUs@naver.com",
  },
  {
    authorName: "정혜정",
    authorId: "0d2b5c22-8ab8-44c6-91e2-3f20270c7dd2",
    text: "팔로우 신청하고 갑니다!",
  },
];
