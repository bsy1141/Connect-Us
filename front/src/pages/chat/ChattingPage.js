import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const ChattingPage = () => {
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:5001");
    socket.current.on("init", (data) => {
      console.log(data);
    });
  }, []);
  const handleClick = () => {
    socket.current.emit("message", new Date().getTime());
  };
  return (
    <div>
      <p>chatting Page</p>
      <button onClick={handleClick}>Emit the message</button>
    </div>
  );
};

export default ChattingPage;
