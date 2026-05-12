"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const [machineModel, setMachineModel] = useState("");

  async function sendMessage() {
    try {
      setLoading(true);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       body: JSON.stringify({
  machineModel,
  message,
}),
      });

      const data = await res.json();

      setReply(data.reply || data.error);
      setHistory((prev) => [
  `${message}\n\n${data.reply || data.error}`,
  ...prev,
]);

    } catch (error) {
      setReply("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Hanke AI Portal
        </h1>

        <p
          style={{
            color: "#888",
            marginBottom: "40px",
          }}
        >
          AI-powered Hanke crimp machine diagnostics.
        </p>
        <select
  value={machineModel}
  onChange={(e) => setMachineModel(e.target.value)}
  style={{
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #333",
    background: "#111",
    color: "white",
    fontSize: "1rem",
    marginBottom: "20px",
  }}
>
  <option value="">Select Machine Model</option>

  <option value="Hanke HC-5">Hanke HC-5</option>
  <option value="Hanke HC-10">Hanke HC-10</option>
  <option value="Hanke HC-20">Hanke HC-20</option>
  <option value="Hanke HC-40">Hanke HC-40</option>
</select>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe the machine problem..."
          style={{
            width: "100%",
            minHeight: "160px",
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid #333",
            background: "#111",
            color: "white",
            fontSize: "1rem",
            resize: "vertical",
          }}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            marginTop: "20px",
            background: loading ? "#444" : "#00ff99",
            color: "black",
            border: "none",
            padding: "14px 24px",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          {loading ? "Analyzing Machine..." : "Run Diagnostics"}
        </button>

        <div
          style={{
            marginTop: "40px",
            background: "#111",
            border: "1px solid #222",
            borderRadius: "14px",
            padding: "24px",
            minHeight: "200px",
            whiteSpace: "pre-wrap",
            lineHeight: "1.7",
          }}
        >
          {reply || "Diagnostic results will appear here."}
        </div>
        <div
  style={{
    marginTop: "40px",
  }}
>
  <h2
    style={{
      marginBottom: "20px",
    }}
  >
    Diagnostic History
  </h2>

  {history.map((item, index) => (
    <div
      key={index}
      style={{
        background: "#111",
        border: "1px solid #222",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "20px",
        whiteSpace: "pre-wrap",
      }}
    >
      {item}
    </div>
  ))}
</div>
      </div>
    </main>
  );
}