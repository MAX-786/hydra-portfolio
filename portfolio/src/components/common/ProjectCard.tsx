import { ProjectDetails } from '@/types/cms';

export default function ProjectCard({ project }: { project: ProjectDetails }) {
  return (
    <div className="bg-secondary p-6 rounded-lg hover:transform hover:scale-105 transition-all">
      <div className="mb-4">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-400">
            {new Date(project.date).toLocaleDateString()}
          </span>
          <span className="text-xs px-2 py-1 bg-green-500/20 text-green-500 rounded-full">
            {project.review_state}
          </span>
        </div>
      </div>
      
      {project.description && (
        <p className="text-gray-400 mb-4">{project.description}</p>
      )}

      {project.tech_stack?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.tech_stack.map((tech) => (
            <span 
              key={tech}
              className="px-2 py-1 bg-accent/20 text-accent rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {project.live_demo_url && (
        <a
          href={project.live_demo_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-accent hover:underline"
        >
          Live Demo →
        </a>
      )}
    </div>
  );
}