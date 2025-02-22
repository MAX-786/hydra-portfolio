'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getFullProjectList } from '@/lib/cms/client';
import { ProjectDetails } from '@/types/cms';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function ProjectSection() {
  const [activeProject, setActiveProject] = useState(0);
  const [projects, setProjects] = useState<ProjectDetails[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageKey, setImageKey] = useState(0); // Add key to force image reload

  useEffect(() => {
    const fetchProjects = async () => {
      const pr: ProjectDetails[] = await getFullProjectList();
      setProjects(pr);
      setIsLoading(false);
    };
    fetchProjects();
  }, []);

  // Set loading state when activeProject changes
  useEffect(() => {
    setIsLoading(true);
    setImageKey((prev) => prev + 1); // Force image reload
  }, [activeProject]);

  const imageURL = new URL(
    projects[activeProject]?.image?.download ||
      'http://localhost:3000/placeholder.svg',
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const imageLoader = ({ src, width }) => {
    return `${imageURL?.origin || ''}/${src}?w=${width}`;
  };

  return (
    <section id="projects" className="py-16 h-[768]">
      <h2 className="mb-8 text-center text-3xl font-bold">Projects</h2>
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-center lg:flex-row">
          <motion.div
            className="mb-8 w-full lg:mb-0 lg:w-1/2 hover:bg-gray-100 dark:hover:bg-gray-800 p-4 rounded-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.15,
              transition: { duration: 0.3 },
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <Link
              href={
                projects[activeProject]?.demo ||
                projects[activeProject]?.github_url ||
                '/'
              }
              passHref
              target="_blank"
            >
              <div className="relative">
                {/* Add key prop to force remount */}
                <Image
                  key={imageKey}
                  loader={imageLoader}
                  src={imageURL?.pathname || '/placeholder.svg'}
                  alt={projects[activeProject]?.title || 'Project Image'}
                  className="w-[500px] h-[272px] rounded-lg object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
                  width={500}
                  height={300}
                  onLoad={() => setIsLoading(false)}
                  onError={() => setIsLoading(false)}
                  priority={true}
                />
                {isLoading && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Loader2 className="w-12 h-12 text-white animate-spin" />
                  </div>
                )}
              </div>
            </Link>
            <motion.div
              className="mt-4 text-center lg:text-left text-black dark:text-gray-300"
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20,
              }}
              transition={{ duration: 0.3 }}
              dangerouslySetInnerHTML={{
                __html: projects[activeProject]?.abstract.data || '',
              }}
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
