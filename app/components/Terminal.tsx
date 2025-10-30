"use client";

import React, { useState, useRef, useEffect } from "react";
import { DOSFONT } from "../fonts";
import Image from "next/image";

interface Command {
  input: string;
  output: React.ReactNode;
  isAnimating?: boolean;
}

export type DelayedLine = {
  text?: string;
  clickabletext?: string;
  image?: string;
  imageAlt?: string;
  delay: number;
}


export default function Terminal({ projectData }: { projectData: Record<string, DelayedLine[]> }) {

  const [history, setHistory] = useState<Command[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputNr, setLastInput] = useState(history.length);
  const [matchIndex, setMatchIndex] = useState(0);
  const [isTabbing, setIsTabbing] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const commandList = ["help", "about", "projects", "project + <id>", "clear"];
  const [trimmedInput, setTrimmedInput] = useState("");



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
    if (event.key === "Tab") {
      event.preventDefault();
      if (!isTabbing) {
        setTrimmedInput(input.trim());
        setIsTabbing(true);
      }
      const matches = commandList.filter((cmd) =>
        cmd.toLowerCase().startsWith(trimmedInput.toLowerCase()), 0);

      const length = matches.length;
      setMatches(length);

      let newIndex = matchIndex + 1;
      if (newIndex >= length) {
        newIndex = 0;
      }

      setMatchIndex(newIndex)


      if (matches[matchIndex]) {
        setInput(matches[matchIndex])

      } else console.log("matchindex invallid " + matchIndex + "matches lenght " + matches.length + " " + matches)

    }
    else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsTabbing(false);

      if (inputNr > 0) {
        const previousInput = history[inputNr - 1].input;
        setInput(previousInput);
        setLastInput(inputNr - 1);
        setTimeout(() => {
          focusAndSetCursorToEnd();
        }, 0);
      }
      console.log("inputNR: " + inputNr)
    }
    else if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsTabbing(false);

      if (inputNr < history.length - 1) {
        setInput(history[inputNr + 1].input)
        setLastInput(inputNr + 1);
        setTimeout(() => {
          focusAndSetCursorToEnd();
        }, 0);
      }
    } else {
      setLastInput(history.length);
      setIsTabbing(false);

    }
  };

  const animateDelayedOutput = async (lines: DelayedLine[], commandInput: string) => {
    console.log(lines[0]); // inside animateDelayedOutput

    console.log(lines)

    const commandIndex = history.length;
    setHistory(prev => [...prev, { input: commandInput, output: [], isAnimating: true }]);

    const accumulatedOutput: React.ReactNode[] = [];

    for (let i = 0; i < lines.length; i++) {

      const line: DelayedLine = lines[i];
      console.log(line.text)


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
          <div key={`imagecontainer-${commandIndex}`} className="inline-block border border-white ml-22 p-2 text-center">
            <Image
              key={`image-${commandIndex}-${i}`}
              src={line.image}
              alt={line.imageAlt || "Terminal image"}
              className="max-w-full h-auto my-2 "
              width={128}
              height={128}
              style={{ imageRendering: 'pixelated' }}>

            </Image>
            <span
              className="block mt-1 text-sm text-white"
              key={`image-desc-${commandIndex}-${i}`}>
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

    setHistory(prev => {
      const newHistory = [...prev];
      newHistory[commandIndex].isAnimating = false;
      return newHistory;
    });
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
        { clickabletext: "project <id>", delay: 100 },
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

      // Assuming projectData is Record<string, DelayedLine[]>
      const projectsLines: DelayedLine[] = [
        { text: "\n[ 💾 Listing mounted disks... ]\n", delay: 0 },
        // dynamically add each project
        ...Object.keys(projectData).map((key, index) => ({
          text: `${index + 1} ${key.toUpperCase()}.DSK\n`,
          delay: 300 + index * 100 // optional: stagger delays
        }))
      ];

      await animateDelayedOutput(projectsLines, cmd);
      return null;
    } else if (command === "project") {
      if (!arg) {
        setHistory(prev => [...prev, { input: cmd, output: "Usage: project <id>" }]);
        return null;
      }

      // Build a lookup table for both names and numbers
      const keys = Object.keys(projectData);
      const lookup: Record<string, DelayedLine[]> = {};

      keys.forEach((key, i) => {
        lookup[key.toLowerCase()] = projectData[key];         // access by name
        lookup[(i + 1).toString()] = projectData[key];         // access by number
      });

      const selectedProject = lookup[arg.toLowerCase()]; // match by name or number

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
