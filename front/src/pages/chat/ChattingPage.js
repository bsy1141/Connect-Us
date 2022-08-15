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

  useEffect(() => {
    socket.emit("join_room", roomId);
  }, [socket]);

  useEffect(() => {
    socket.on("chat", (data) => {
      console.log(data);
      setTotalMsg((cur) => [...cur, data.chat]);
    });
  }, [socket]);

  const handleClick = async () => {
    await Api.post(`room/${roomId}/chat`, {
      chat: message,
      userId: user._id,
    });
  };

  // const joinRoom = () => {
  //   socket.emit("join_room", roomId);
  // };

  return (
    <div>
      <p>chatting Page</p>
      {/* <button onClick={joinRoom}>joinroom</button> */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleClick}>Emit the message</button>
      <div>
        {totalMsg.map((msg, idx) => (
          <div key={idx}>
            <p>{msg}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChattingPage;
