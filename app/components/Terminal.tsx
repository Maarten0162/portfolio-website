"use client";

import React, { useState, useRef, useEffect } from "react";
import { DOSFONT } from "../fonts";

interface Command {
  input: string;
  output: string;
}

export default function Terminal() {
  const [history, setHistory] = useState<Command[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommand = (cmd: string) => {
    const lower = cmd.toLowerCase();

    switch (lower) {
      case "help":
        return "Available commands: about, projects, clear";
      case "about":
        return `
      *** LOADING USER PROFILE... ***
      [ 💾 Reading MAARTEN.DAT... OK! ]

      Name: Maarten
      Occupation: ICT Student
      Specialization: Software & Game Development
      Primary Tools: C#, Godot, .NET, Next.js
      `;
      case "projects":
        return `
      [ 💾 Listing mounted disks... ]
      FITNESS_TRACKER.DSK
      MEMORYBOOK.DSK
      PEAKY_BOARDGAME.DSK
      `;
      case "clear":
        setHistory([]);
        return "";
      default:
        return `Unknown command: ${cmd}`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const output = handleCommand(input);
    if (input.toLowerCase() === "clear") {
      setInput("");
      return;
    }

    setHistory([...history, { input, output }]);
    setInput("");
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={`${DOSFONT.className} min-h-screen bg-black text-xl text-white p-4`}
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((item, i) => (
        <div key={i}>
          <div >C:\Maarten\Portfolio&gt; {item.input}</div>
          <pre className={`${DOSFONT.className} whitespace-pre-wrap`}>{item.output}</pre>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        {/* makes the arrow at the front */}
        <span>C:\Maarten\Portfolio&gt; </span> 
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none text-xl text-white w-3/4"
          autoFocus
        />
      </form>
    </div>
  );
}
