import { UserStateContext } from "components/ContextProvider";
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";
import ChatModal from "./ChatModal";

const socket = io.connect("http://localhost:5001/chat");

const ChatTabCard = ({ room }) => {
  const { user } = useContext(UserStateContext);
  //const [count, setCount] = useState(0);
  const [lastMessage, setLastMessage] = useState(room?.chat ?? {});
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  useEffect(() => {
    socket.emit("join_room", room.id);
  }, []);

  useEffect(() => {
    socket.on("chat", (data) => {
      if (data.roomId === room.id) {
        setLastMessage(data);
      }
    });
  }, []);

  const handleClick = () => {
    setIsChatModalOpen(true);
    //setCount(0);
  };

  return (
    <>
      <Card>
        <p>{room.user.name}</p>
        <p>{lastMessage?.chat || ""}</p>
        {/* <span>{count}</span> */}
        <button onClick={handleClick}>채팅 참여</button>
      </Card>
      {isChatModalOpen && (
        <ChatModal
          setIsChatModalOpen={setIsChatModalOpen}
          roomId={room.id}
          user={user}
        />
      )}
    </>
  );
};

export default ChatTabCard;

const Card = styled.div``;
