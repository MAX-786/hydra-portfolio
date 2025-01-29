"use client";
import { getFullSkillList } from "@/lib/cms/client";
import { SkillDetails } from "@/types/cms";
import { useEffect, useState } from "react";

export default function SkillsSection() {
  const [ skills, setSkills ] = useState<SkillDetails[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const ski: SkillDetails[] = await getFullSkillList();
      setSkills(ski);
    };
    fetchSkills();
  }, []);
  return (
    <section id="skills" className="py-16 h-[768px]">
      <h2 className="mb-8 text-center text-3xl font-bold">Skills</h2>
      <div className="mx-auto max-w-3xl">
        {skills.map((skill) => (
          <div key={skill.name} className="mb-4">
            <div className="flex justify-between">
              <span className="font-semibold">{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="mt-2 h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full rounded-full bg-blue-600 dark:bg-blue-400 transition-all duration-500 ease-out"
                style={{ width: `${skill.level}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
