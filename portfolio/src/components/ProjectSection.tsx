'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getFullProjectList } from '@/lib/cms/client';
import { ProjectDetails } from '@/types/cms';

export default function ProjectSection() {
  const [activeProject, setActiveProject] = useState(0);
  const [projects, setProjects] = useState<ProjectDetails[]>([]);
  useEffect(() => {
    const fetchSkills = async () => {
      const pr: ProjectDetails[] = await getFullProjectList();
      setProjects(pr);
    };
    fetchSkills();
  }, []);

  return (
    <section id="projects" className="py-16 h-[768]">
      <h2 className="mb-8 text-center text-3xl font-bold">Projects</h2>
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-center lg:flex-row">
          <motion.div
            className="mb-8 w-full lg:mb-0 lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={
                projects[activeProject]?.image?.download || '/placeholder.svg'
              }
              alt={projects[activeProject]?.title || 'Project Image'}
              width={600}
              height={400}
              className="rounded-lg object-cover shadow-lg"
            />
          </motion.div>
          <div className="w-full lg:w-1/2 lg:pl-12">
            <motion.h3
              className="mb-4 text-2xl font-semibold"
              key={projects[activeProject]?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {projects[activeProject]?.title}
            </motion.h3>
            <motion.p
              className="mb-6 text-gray-600"
              key={`desc-${projects[activeProject]?.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {projects[activeProject]?.description}
            </motion.p>
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              {projects.map((project, index) => (
                <motion.button
                  key={project.id}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    index === activeProject
                      ? 'bg-blue-600 dark:bg-blue-700 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setActiveProject(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {project.title}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
