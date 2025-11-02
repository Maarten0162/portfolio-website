import { DelayedLine } from "@/app/components/Terminal";

export const  aboutLines: DelayedLine[] = [
  { text: "\n*** SYSTEM BOOT: USER PROFILE INITIALIZATION ***\n\n", delay: 0 },
  { text: "[ 💾 Reading MAARTEN.DAT ... OK ]\n", delay: 400 },
  { text: "[ ⚙️ Loading configuration... ]\n", delay: 400 },
  { text: "[ ✅ Environment stable ]\n\n", delay: 400 },

  { text: "> Name: Maarten\n", delay: 300 },
  { text: "> Role: ICT Student @ Fontys University of Applied Sciences\n", delay: 300 },
  { text: "> Focus: Software & Game Development\n\n", delay: 300 },

  { text: "─────────────────────────────────────────────\n", delay: 200 },
  { text: "SUMMARY:\n", delay: 200 },
  { text: "Maarten is a dedicated software developer with a strong focus on creating interactive and well-structured digital experiences.\n", delay: 400 },
  { text: "He combines creativity and technical precision to design software that feels engaging, scalable, and maintainable.\n\n", delay: 400 },

  { text: "─────────────────────────────────────────────\n", delay: 200 },
  { text: "CORE SKILLS:\n", delay: 200 },
  { text: "> Programming: C#, JavaScript/TypeScript, SQL\n", delay: 300 },
  { text: "> Frameworks: .NET, ASP.NET MVC, Next.js, Godot\n", delay: 300 },
  { text: "> Databases: Supabase, Microsoft SQL Server\n", delay: 300 },
  { text: "> Tools: Git, Visual Studio, VS Code, Figma\n\n", delay: 300 },

  { text: "─────────────────────────────────────────────\n", delay: 200 },
  { text: "INTERESTS:\n", delay: 200 },
  { text: "> Building game systems and event-driven logic\n", delay: 300 },
  { text: "> Designing intuitive interfaces and player experiences\n", delay: 300 },
  { text: "> Experimenting with full-stack web architectures\n", delay: 300 },
  { text: "> Learning new technologies and improving workflow efficiency\n\n", delay: 300 },

  { text: "─────────────────────────────────────────────\n", delay: 200 },
  { text: "FOCUS:\n", delay: 200 },
  { text: "Constantly refining code quality, learning new technologies,\n", delay: 300 },
  { text: "and delivering solutions that feel both efficient and well-crafted.\n\n", delay: 400 },

  { text: "[ SYSTEM STATUS: ONLINE ]\n", delay: 400 },
  { text: "[ Awaiting next command... ]\n", delay: 600 },
];
