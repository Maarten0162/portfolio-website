"use client";

import React, { useState, useRef, useEffect } from "react";
import { DOSFONT } from "../fonts";

interface Command {
  input: string;
  output: React.ReactNode;
  isAnimating?: boolean;
}

type DelayedLine = {
  text?: string;
  clickabletext?: string;
  image?: string; // URL to image
  imageAlt?: string; // Alt text for accessibility
  delay: number;
}

export default function Terminal() {
  const [history, setHistory] = useState<Command[ ]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputNr, setLastInput] = useState(history.length);
  const bottomRef = useRef<HTMLDivElement>(null);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const focusAndSetCursorToEnd = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      // Set cursor to the end of the input
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  };

  function onClick(inputText: string) {
  return () => {
    setInput(inputText);
  };
}


  console.log(inputNr)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (inputNr > 0) {
        const previousInput = history[inputNr - 1].input;
        setInput(previousInput);
        setLastInput(inputNr - 1);

        // Always set cursor to end after setting input from history
        setTimeout(() => {
          focusAndSetCursorToEnd();
        }, 0);
      }
      console.log("inputNR: " + inputNr)
    }
    else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (inputNr < history.length - 1) {
        setInput(history[inputNr + 1].input)
        setLastInput(inputNr + 1);
        setTimeout(() => {
          focusAndSetCursorToEnd();
        }, 0);
      }
    } else {
      setLastInput(history.length)
    }
  };

  const animateDelayedOutput = async (lines: DelayedLine[], commandInput: string) => {
    // Add initial empty command to history
    const commandIndex = history.length;
    setHistory(prev => [...prev, { input: commandInput, output: [], isAnimating: true }]);

    const accumulatedOutput: React.ReactNode[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.delay > 0) {
        await delay(line.delay);
      }

      if (line.text) {
        accumulatedOutput.push(
          <span key={`text-${commandIndex}-${i}`}>{line.text}</span>
        );

      }

      if (line.clickabletext) {
        accumulatedOutput.push(
          <span
          key={`clickable-${commandIndex}-${i}`}
          onClick={onClick(line.clickabletext)} className="cursor-pointer">{line.clickabletext}</span>
        );
      }

      if (line.image) {
        accumulatedOutput.push(
          <div className="inline-block border border-white ml-22 p-2 text-center">
            <img
              key={`image-${commandIndex}-${i}`}
              src={line.image}
              alt={line.imageAlt || "Terminal image"}
              className="max-w-full h-auto my-2 "
              width={128}
              style={{ imageRendering: 'pixelated' }}>

            </img>
            <span
              className="block mt-1 text-sm text-white"
              key={`image-desc-${i}`}>

              {line.imageAlt}
            </span>
          </div>
        );
      }
      

      // Update the output with accumulated content
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory[commandIndex] = {
          input: commandInput,
          output: <div className="whitespace-pre-wrap">{[...accumulatedOutput]}</div>,
          isAnimating: true
        };
        return newHistory;
      });
    }

    // Mark animation as complete
    setHistory(prev => {
      const newHistory = [...prev];
      newHistory[commandIndex].isAnimating = false;
      return newHistory;
    });

    // Focus the input after animation completes
    inputRef.current?.focus();
  };

  const handleCommand = async (cmd: string) => {
    const [command, arg] = cmd.trim().toLowerCase().split(" ");

    if (command === "help") {
      const helpLines: DelayedLine[] = [
        { text: "Available commands: ", delay: 200 },
        { clickabletext: "about", delay: 100 },
        { text: ", ", delay: 0 },
        { clickabletext: "projects", delay: 100 },
        { text: ", ", delay: 0 },
        { clickabletext: "project [id]", delay: 100 },
        { text: ", ", delay: 0 },
        { clickabletext: "clear", delay: 100 }
      ];
      await animateDelayedOutput(helpLines, cmd);
      return null;
    } else if (command === "about") {
      const aboutLines: DelayedLine[] = [
        { text: "\n*** LOADING USER PROFILE... ***\n", delay: 0 },
        { text: "[ 💾 Reading MAARTEN.DAT ", delay: 300 },
        { text: ".", delay: 300 },
        { text: ".", delay: 300 },
        { text: ". ", delay: 300 },
        { text: "OK! ]\n", delay: 100 },
        { text: "\nName: Maarten\n", delay: 200 },
        { text: "Occupation: ICT Student\n", delay: 150 },
        { text: "Specialization: Software & Game Development\n", delay: 150 },
        { text: "Primary Tools: C#, Godot, .NET, Next.js\n\n", delay: 200 }
      ];
      await animateDelayedOutput(aboutLines, cmd);
      return null;
    } else if (command === "projects") {
      const projectsLines: DelayedLine[] = [
        { text: "\n[ 💾 Listing mounted disks... ]\n", delay: 0 },
        { text: `${1} FITNESS.DSK\n`, delay: 400 },
        { text: `${2} PEAKY.DSK\n\n`, delay: 300 }
      ];
      await animateDelayedOutput(projectsLines, cmd);
      return null;
    } else if (command === "project") {
      if (!arg) {
        setHistory(prev => [...prev, { input: cmd, output: "Usage: project <id>" }]);
        return null;
      }

      const projectData: Record<string, DelayedLine[]> = {
        fitness: [
          { text: "[ 💾 Mounting FITNESS.DSK... ]\n", delay: 0 },
          { text: "[ ✓ Disk loaded successfully ]\n", delay: 1000 },
          { image: "/download.png", imageAlt: "Fitness.DSK", delay: 400 },
          { text: "\nProject: Fitness Tracker App\n", delay: 100 },
          { text: "Tech: C#, MVC, .NET 8\n", delay: 300 },
          { text: "Description:\n", delay: 300 },
          { text: "Gamified fitness tracker with calorie and workout logging.\n", delay: 300 },
          { text: "Achievements unlock as users reach milestones.\n", delay: 0 }
        ],
        peaky: [
          { text: "[ 💾 Mounting PEAKY.DSK... ]\n", delay: 0 },
          { text: "[ ✓ Disk loaded successfully ]\n", delay: 1000 },
          { image: "/download.png", imageAlt: "Peaky.DSK", delay: 400 },
          { text: "\nProject: Fitness Tracker App\n", delay: 100 },
          { text: "Tech: Godot, C#\n", delay: 300 },
          { text: "Description:\n", delay: 300 },
          { text: "Boardgame inspired by Mario Party and Peaky Blinders.\n", delay: 300 }
        ],

        
        "1": [],
        "2": []
      };

      projectData["1"] = projectData.fitness;
      projectData["2"] = projectData.peaky;

      const selectedProject = projectData[arg];

      if (!selectedProject) {
        setHistory(prev => [...prev, { input: cmd, output: `Unknown project: ${arg}` }]);
        return null;
      }

      await animateDelayedOutput(selectedProject, cmd);
      return null;

    } else if (command === "clear") {
      setHistory([]);
      setLastInput(history.length)
      setTimeout(() => {
          focusAndSetCursorToEnd();
        }, 0);
      return "";
    } else {
      return `Unknown command: ${cmd}`;
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    setIsProcessing(true);
    const currentInput = input;
    setInput("");

    if (currentInput.toLowerCase() === "clear") {
      await handleCommand(currentInput);
      setIsProcessing(false);
      inputRef.current?.focus();
      return;
    }

    const output = await handleCommand(currentInput);

    // Only add to history if not handled by animation
    if (output !== null) {
      setHistory(prev => [...prev, { input: currentInput, output }]);
    }

    setLastInput(inputNr + 1)

    setIsProcessing(false);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
  scrollToBottom();
}, [history]);

  return (
    <div className={`${DOSFONT.className} min-h-screen bg-black text-xl text-white p-4`}
      onClick={() => inputRef.current?.focus()}
    >
      <span style={{ whiteSpace: 'pre-line' }}>{'Type "'}
        <span
        onClick={onClick("help")} className="cursor-pointer">{'help'}</span>
        <span>{'" for a list of commands\n\n'}</span>
      </span>
      
      {history.map((item, i) => (
        <div key={i}>
          <div key={"input-" + i}>C:\Maarten\Portfolio&gt; {item.input}</div>
          <div key={"output-" + i} className={`${DOSFONT.className}`}>
            {item.output}
            {item.isAnimating && <span className="animate-pulse">█</span>}
          </div>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <span>C:\Maarten\Portfolio&gt; </span>
        <input
          ref={inputRef}
          value={input}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none text-xl text-white w-3/4"
          autoFocus
          disabled={isProcessing}
        />
      </form>

      <div ref={bottomRef} />
    </div>
  );
}
