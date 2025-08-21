import { useState } from "react";

export default function ChatPage({ user }) {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");
  const [lang, setLang] = useState("en");

  async function sendMessage(simplify = false) {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg, lang, simplify })
    });
    const data = await res.json();
    setReply(data.reply);
  }

  return (
    <div>
      <h1>Chat as {user.email}</h1>
      <select value={lang} onChange={e => setLang(e.target.value)}>
        <option value="en">English</option>
        <option value="af">Afrikaans</option>
        <option value="xh">isiXhosa</option>
        <option value="zu">isiZulu</option>
      </select>
      <input value={msg} onChange={e => setMsg(e.target.value)} placeholder="Type a message..." />
      <button onClick={() => sendMessage(false)}>Send</button>
      <button onClick={() => sendMessage(true)}>Explain Like I’m 5</button>
      <p><strong>AI:</strong> {reply}</p>
    </div>
  );
}
