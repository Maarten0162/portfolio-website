import { DelayedLine } from "@/app/components/Terminal";

export function getProjectsLines(projectData: Record<string, DelayedLine[]>): DelayedLine[] {
  return [
    { text: "─────────────────────────────────────────────\n", delay: 200 },
    { text: "PROJECTS:\n", delay: 200 },
    { text: "> Listing all projects mounted on the system...\n", delay: 150 },
    ...Object.keys(projectData).map((key, index) => ({
      clickabletext: `> ${index + 1} ${key.toUpperCase()}\n`,
      delay: 100 + index * 50
    })),
    { text: "\n─────────────────────────────────────────────\n", delay: 200 }
  ];
}
