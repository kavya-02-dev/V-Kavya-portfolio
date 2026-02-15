import { projects } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProjectCaseStudy from './ProjectCaseStudy';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();
  return <ProjectCaseStudy project={project} />;
}
