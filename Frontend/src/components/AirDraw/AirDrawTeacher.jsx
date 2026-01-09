import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import socket from "../../socket";

export default function AirDrawTeacher() {
  const { roomId } = useParams();
  const canvasRef = useRef(null);
  const recognitionRef = useRef(null);
  const isListening = useRef(false);
  const cursor = useRef({ x: 60, y: 100 });

  useEffect(() => {
    socket.emit("join-room", roomId);

    const ctx = canvasRef.current.getContext("2d");
    ctx.font = "28px Arial";
    ctx.fillStyle = "white";

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = e => {
      const text = e.results[0][0].transcript.trim();

      ctx.fillText(text, cursor.current.x, cursor.current.y);

      socket.emit("speech-text", {
        roomId,
        text,
        x: cursor.current.x,
        y: cursor.current.y
      });

      cursor.current.y += 40;
    };

    recognition.onerror = e => {
      console.warn("Speech error:", e.error);
    };

    recognition.onend = () => {
      if (isListening.current) recognition.start();
    };

    recognitionRef.current = recognition;
  }, [roomId]);

  const startListening = () => {
    if (!isListening.current) {
      isListening.current = true;
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    isListening.current = false;
    recognitionRef.current.stop();
  };

  return (
    <div style={{ background: "black", height: "100vh" }}>
      <div style={{ position: "fixed", top: 20, left: 20, zIndex: 10 }}>
        <button onClick={startListening}>🎤 Start</button>
        <button onClick={stopListening} style={{ marginLeft: 10 }}>
          ⛔ Stop
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={1200}
        height={700}
        style={{ border: "1px solid white" }}
      />
    </div>
  );
}
