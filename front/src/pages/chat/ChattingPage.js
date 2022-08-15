import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import * as Api from "api";

const socket = io.connect("http://localhost:5001/chat");

const ChattingPage = () => {
  const params = useParams();
  const { roomId } = params;

  const location = useLocation();
  const { user, owner } = location?.state;

  const [message, setMessage] = useState("");
  const [totalMsg, setTotalMsg] = useState([]);

  const getExistedMessage = async () => {
    const chatList = await Api.get(`room/${roomId}`);
    //console.log(chatList.data); //user에 user정보가 아예 저장되어 있음.
    setTotalMsg(chatList.data);
  };
  useEffect(() => {
    socket.emit("join_room", roomId);
    getExistedMessage();
  }, [socket]);

  useEffect(() => {
    socket.on("chat", (data) => {
      console.log(data); //user에 objectID만 저장되어 있는 상태
      setTotalMsg((cur) => [...cur, data]);
    });
  }, [socket]);

  const handleClick = async () => {
    await Api.post(`room/${roomId}/chat`, {
      chat: message,
      userId: user._id,
    });
  };

  return (
    <div>
      <p>chatting Page</p>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleClick}>Emit the message</button>
      <div>
        {totalMsg.map((msg, idx) => (
          <div key={idx}>
            <p>{msg.chat}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChattingPage;
