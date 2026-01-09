import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import socket from "../../socket";

export default function AirDrawStudent() {
  const { roomId } = useParams();
  const canvasRef = useRef(null);

  useEffect(() => {
    socket.emit("join-room", roomId);

    const ctx = canvasRef.current.getContext("2d");
    ctx.font = "28px Arial";
    ctx.fillStyle = "white";

    socket.on("speech-text", data => {
      ctx.fillText(data.text, data.x, data.y);
    });

    socket.on("clear-board", () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    });

    return () => {
      socket.off("speech-text");
      socket.off("clear-board");
    };
  }, [roomId]);

  return (
    <div style={{ background: "black", height: "100vh" }}>
      <canvas
        ref={canvasRef}
        width={1200}
        height={700}
        style={{ border: "1px solid white" }}
      />
    </div>
  );
}
