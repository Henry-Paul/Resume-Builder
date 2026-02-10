
import { useState, useEffect } from "react";
import { defaultResume } from "../data/defaultResume";

export function useResume() {
  const [resume, setResume] = useState(() => {
    const saved = localStorage.getItem("resume");
    return saved ? JSON.parse(saved) : defaultResume;
  });

  useEffect(() => {
    localStorage.setItem("resume", JSON.stringify(resume));
  }, [resume]);

  const reorderSections = (sections) =>
    setResume((r) => ({ ...r, sections }));

  return { resume, reorderSections };
}
