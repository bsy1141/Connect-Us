import styled from "styled-components";
import * as Api from "api";
import { useEffect, useState } from "react";
import ChatTabCard from "./chat/ChatTabCard";

const MyChatTab = ({ userId }) => {
  const [rooms, setRooms] = useState([]);

  const getRoomList = async () => {
    const rooms = await Api.get(`rooms/${userId}`);
    const filteredRooms = rooms.data.filter((room) => room.chat);
    console.log(filteredRooms);
    setRooms(filteredRooms);
  };

  useEffect(() => {
    getRoomList();
  }, []);

  if (rooms.length === 0) {
    return (
      <NoPostsContainer>
        <img src={`${process.env.PUBLIC_URL}/noMessage.svg`} alt="No Posts" />
        <h3>채팅방이 없습니다.</h3>
      </NoPostsContainer>
    );
  }

  return (
    <Container>
      {rooms.map((room, idx) => {
        if (idx === rooms.length - 1) {
          return <ChatTabCard room={room} key={room.id} isLast />;
        }
        return <ChatTabCard room={room} key={room.id} />;
      })}
    </Container>
  );
};

export default MyChatTab;

const Container = styled.div`
  width: 100%;
  height: 90%;
  margin-top: 10px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NoPostsContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 10px;
  text-align: center;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  > img {
    margin-top: 10%;
    width: 45%;
  }
  > h3 {
    margin-top: 5%;
  }
`;
