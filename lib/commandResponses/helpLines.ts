import { DelayedLine } from "@/app/components/Terminal";

export const  helpLines: DelayedLine[] = [
  { text: "─────────────────────────────────────────────\n", delay: 200 },
  { text: "Available commands: \n>", delay: 200 },
  { clickabletext: " about", delay: 100 },
  { text: " -Displays user profile\n> ", delay: 0 },
  { clickabletext: "projects", delay: 100 },
  { text: " -Lists all projects\n> ", delay: 0 },
  { clickabletext: "project <id>", delay: 100 },
  { text: " -Shows details of a project\n> ", delay: 0 },
  { clickabletext: "clear", delay: 100 },
  { text: " -Clears the terminal", delay: 0 },
  { text: "\n─────────────────────────────────────────────\n", delay: 200 }

];