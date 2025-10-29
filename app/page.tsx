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
    //console.log(projects);

  const projData: Record<string, DelayedLine[]> = {};

  projects?.forEach((p) => {
    projData[p.nickname] = p.data.lines; // each project gets its own key
  });

  console.log(projData);

  
  return (
    <Terminal projectData={projData} ></Terminal>
  );
}
