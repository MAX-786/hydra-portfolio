import { getFullProjectList, getFullSkillList } from '@/services/cms/client';
import ProjectCard from '@/components/common/ProjectCard';

export default async function Home() {
  const [projects, skills] = await Promise.all([
    getFullProjectList(),
    getFullSkillList()
  ]);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Projects Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.UID} project={project} />
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-8">Technical Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <div 
              key={skill.UID}
              className="bg-secondary p-4 rounded-lg"
            >
              <h3 className="font-medium mb-2">{skill.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  Confidence: {skill.confidence}/5
                </span>
                <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full">
                  {skill.status[0]?.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}