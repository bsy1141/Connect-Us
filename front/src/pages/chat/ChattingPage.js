import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:5001/chat");

const ChattingPage = () => {
  const params = useParams();
  const { roomId } = params;

  const [message, setMessage] = useState("");
  const [totalMsg, setTotalMsg] = useState([]);

  useEffect(() => {
    socket.emit("join_room", roomId);
  }, [socket]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setTotalMsg((cur) => [...cur, { message: data, user: "you" }]);
    });
  }, [socket]);

  const handleClick = () => {
    socket.emit("send_message", { message, roomId });
    setTotalMsg((cur) => [...cur, { message, user: "me" }]);
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
        {totalMsg.map((msg, idx) => {
          if (msg.user === "me")
            return (
              <div style={{ textAlign: "right" }} key={idx}>
                <p>{msg.message}</p>
              </div>
            );
          return (
            <div key={idx}>
              <p>{msg.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChattingPage;
