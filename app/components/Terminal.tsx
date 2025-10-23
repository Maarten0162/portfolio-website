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
  image?: string; // URL to image
  imageAlt?: string; // Alt text for accessibility
  delay: number;
}

export default function Terminal() {
  const [history, setHistory] = useState<Command[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputNr, setLastInput] = useState(history.length)

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


  console.log(inputNr)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowUp"){
      if(inputNr > 0){
        setInput(history[inputNr -1].input)
        setLastInput(inputNr);
      }
      console.log("inputNR: " + inputNr)
    } 
    if (event.key === "ArrowDown") console.log("Down arrow pressed");
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
          <span key={`text-${i}`}>{line.text}</span>
        );
      }
      
      if (line.image) {
        accumulatedOutput.push(
          <div className="inline-block border border-white ml-22 p-2 text-center">
            <img
              key={`image-${i}`}
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
          { text: "about, ", delay: 100 },
          { text: "projects, ", delay: 100 },
          { text: "project + ID, ", delay: 100 },
          { text: "clear", delay: 100 }
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
          { text: "[ 💾 Listing mounted disks... ]\n", delay: 0 },
          { text: "FITNESS_TRACKER.DSK\n", delay: 400 },
          { text: "MEMORYBOOK.DSK\n", delay: 300 },
          { text: "PEAKY_BOARDGAME.DSK", delay: 300 }
        ];
        await animateDelayedOutput(projectsLines, cmd);
        return null;
  } else if (command === "project") {
    if (!arg) {
      // No ID provided
      setHistory(prev => [...prev, { input: cmd, output: "Usage: project <id>" }]);
      return null;
    }

    // Define your projects list
    const projectData: Record<string, DelayedLine[]> = {
      fitness: [
        { text: "[ 💾 Mounting FITNESS_TRACKER.DSK... ]\n", delay: 0 },
        { text: "[ ✓ Disk loaded successfully ]\n", delay: 1000 },
        { image: "/download.png", imageAlt: "Fitness.DSK", delay: 400 },
        { text: "\nProject: Fitness Tracker App\n", delay: 100 },
        { text: "Tech: C#, MVC, .NET 8\n", delay: 300 },
        { text: "Description:", delay: 300 },
        { text: "Gamified fitness tracker with calorie and workout logging.", delay: 300 },
        { text: "Achievements unlock as users reach milestones.", delay: 0 }
      ],
      peaky: [
        { text: "[ 💾 Mounting PEAKY_BOARDGAME.DSK... ]\n", delay: 0 },
        { text: "[ ✓ Disk loaded successfully ]\n", delay: 1000 },
        { image: "/download.png", imageAlt: "Peaky.DSK", delay: 400 },
        { text: "\nProject: Fitness Tracker App\n", delay: 100 },
        { text: "Tech: Godot, C#\n", delay: 300 },
        { text: "Description:\n", delay: 300 },
        { text: "Boardgame inspired by Mario Party and Peaky Blinders.", delay: 300 }
      ]
    };

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

    setLastInput(inputNr +1)
    
    setIsProcessing(false);
    
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
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
    </div>
  );
}
