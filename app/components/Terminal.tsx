"use client";

import React, { useState, useRef, useEffect } from "react";
import { DOSFONT } from "../fonts";
import Image from "next/image";
import { commandAliases } from "@/lib/commandAlias";
import { aboutLines } from "@/lib/commandResponses/aboutLines";
import { helpLines } from "@/lib/commandResponses/helpLines";
import { getProjectsLines } from "@/lib/commandResponses/projectLines";

interface Command {
  input: string;
  output: React.ReactNode;
  isAnimating?: boolean;
}

export type DelayedLine = {
  text?: string;
  clickabletext?: string;
  image?: string;
  video?: string;
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
  const [currentImage, setCurrentImage] = useState<{ src: string; alt?: string } | null>(null);
  const [currentVideo, setCurrentVideo] = useState<{ src: string; alt?: string } | null>(null);


  const bottomRef = useRef<HTMLDivElement>(null);

  const commandList = ["help", "about", "projects", "project + <id>", "clear"];
  const [trimmedInput, setTrimmedInput] = useState("");


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  function SetCurrentVideo(source: string, alt: string) {
    setCurrentImage(null);
    setCurrentVideo({ src: source!, alt: alt! })
  };

  function SetCurrentImage(source: string) {
    setCurrentVideo(null);
    setCurrentImage({ src: source! })
  };

  const focusAndSetCursorToEnd = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  };

  function onClick(inputText: string | undefined) {
    console.log(inputText)
    if (inputText) {
      const firstWord = inputText.trim()[2]; //index 2 gets the number infront of the message 
      console.log(firstWord)

      if (!isNaN(Number(firstWord))) {
        inputText = "project " + firstWord;
      }
      setInput(inputText);
    }
  }




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

      let newIndex = matchIndex + 1;
      if (newIndex >= length) {
        newIndex = 0;
      }

      setMatchIndex(newIndex)


      if (matches[matchIndex]) {
        setInput(matches[matchIndex])

      }

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
    const commandIndex = history.length;
    setHistory(prev => [...prev, { input: commandInput, output: [], isAnimating: true }]);

    const accumulatedOutput: React.ReactNode[] = [];

    for (let i = 0; i < lines.length; i++) {

      const line: DelayedLine = lines[i];


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
            onClick={() => onClick(line.clickabletext)} className="cursor-pointer">{line.clickabletext}</span>
        );
      }

      if (line.image) {
        accumulatedOutput.push(
          <div
            key={`imagecontainer-${commandIndex}-${i}`}
            className="inline-block border border-white ml-22 p-2 text-center cursor-pointer hover:bg-gray-800 transition"
            onClick={() => SetCurrentImage(line.image!)}
            title="Click to preview"
          >
            <Image
              src={line.image}
              alt={line.imageAlt || "Terminal image"}
              className="max-w-full h-auto my-2"
              width={128}
              height={128}
              style={{ imageRendering: "pixelated" }}
            />
            <span className="block mt-1 text-sm text-white">
              {line.imageAlt}
            </span>
          </div>
        );
      }

      if (line.video) {

        const trans1 = line.video.replace("/upload/", "/upload/so_auto/");
        const videoThumbnail = trans1.replace(/\.(mp4|mov|avi|mkv)$/, ".jpg");
        accumulatedOutput.push(
          <div
            key={`imagecontainer-${commandIndex}-${i}`}
            className="inline-block border border-white ml-22 p-2 text-center cursor-pointer hover:bg-gray-800 transition"
            onClick={() => SetCurrentVideo(line.video!, line.imageAlt!)}
            title="Click to preview"
          >
            <div className="relative inline-block group cursor-pointer my-2">
              <div className="relative w-[128px] h-[128px]">
                <Image
                  src={videoThumbnail}
                  alt={line.imageAlt!}
                  fill
                  className="object-cover rounded-md"
                  style={{ imageRendering: "pixelated" }}
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    className="w-12 h-12 opacity-80 group-hover:opacity-100"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>



            <span className="block mt-1 text-sm text-white">
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

  // Command aliases (Windows, Linux, macOS variants)



  const handleCommand = async (cmd: string) => {
    const parts = cmd.trim().toLowerCase().split(" ");
    let command = parts[0];
    const arg = parts[1];

    // Resolve command alias if it exists
    if (commandAliases[command]) {
      command = commandAliases[command];
    }


    if (command === "help") {
      await animateDelayedOutput(helpLines, cmd);
      return null;
    } else if (command === "about") {
      await animateDelayedOutput(aboutLines, cmd);
      return null;
    } else if (command === "projects") {

      // Assuming projectData is Record<string, DelayedLine[]>
      const projectsLines: DelayedLine[] = getProjectsLines(projectData);

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
    <div className="flex min-h-screen bg-black text-white">
      {/* LEFT SIDE — Terminal (2/3 width) */}
      <div
        className={`${DOSFONT.className} w-2/3 p-4 text-xl overflow-y-auto`}
        onClick={() => inputRef.current?.focus()}
      >
        <span style={{ whiteSpace: "pre-line" }}>
          {'Type "'}
          <span onClick={() => onClick("help")} className="cursor-pointer">{'help'}</span>

          {'" for a list of commands\n\n'}
        </span>

        {history.map((item, i) => (
          <div key={i}>
            <div>C:\Maarten\Portfolio&gt; {item.input}</div>
            <div className={DOSFONT.className}>
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
      <div className="fixed right-0 top-0 h-screen w-1/3 flex items-center justify-center p-4 border-l border-gray-700 bg-black">
        {currentImage ? (
          <div className="flex flex-col items-center">
            <Image
              src={currentImage.src}
              alt={currentImage.alt || "Project image"}
              width={512}
              height={512}
              className="rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105"
              style={{ imageRendering: "pixelated" }}
              onClick={() => setCurrentImage(null)}
            />
            {currentImage.alt && (
              <span className="mt-2 text-sm text-gray-300">{currentImage.alt}</span>
            )}
            <span className="mt-1 text-xs text-gray-500 italic">(Click image to close)</span>
          </div>
        ) : currentVideo ? (
          <div className="flex flex-col items-center">
            <video
              src={currentVideo.src}
              width={512}
              height={512}
              controls
              autoPlay
              loop
              muted
              className="rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105"
              onClick={() => setCurrentVideo(null)}
            />
            <span className="mt-1 text-xs text-gray-500 italic">(Click video to close)</span>
          </div>
        ) : (
          <span className="text-gray-600 italic">Click an image or video to preview it here</span>
        )}
      </div>

    </div>

  );


}
