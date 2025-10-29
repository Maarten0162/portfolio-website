import Image from "next/image";
import Terminal from "./components/Terminal";
import { createServer } from "@/lib/supabase/server";
import { DelayedLine } from "./components/Terminal";


export default async function Home() {
  const supabase = await createServer();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_hidden", false);

  if (error) console.error(error);

  const projData: Record<string, DelayedLine[]> = {};

  projects?.forEach((p) => {
    if (Array.isArray(p.data.lines)) {
      // Normalize each line from Supabase JSON
      const normalizedLines: DelayedLine[] = p.data.lines.map((l: any) => {
        switch (l.type) {
          case "text":
            const realText = l.content.replace(/\\n/g, "\n");

            return { text: realText, delay: l.delay ?? 0 };
          case "clickabletext":
            const realClickableText = l.content.replace(/\\n/g, "\n");

            return { clickabletext: realClickableText, delay: l.delay ?? 0 };
          case "image":
            return { image: l.content, imageAlt: l.alt ?? "", delay: l.delay ?? 0 };
          default:
            return { text: l.content, delay: l.delay ?? 0 }; // fallback
        }
      });

      projData[p.nickname] = normalizedLines;
    } else {
      console.warn(`Project ${p.nickname} lines is not an array`, p.data.lines);
    }
  });

  console.log(projData);

  return <Terminal projectData={projData} />;
}
