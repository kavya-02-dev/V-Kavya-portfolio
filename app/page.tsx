import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceTimeline from '@/components/sections/ExperienceTimeline';
import { SkillsSection, AchievementsSection } from '@/components/sections/SkillsAchievements';
import CTASection from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <ExperienceTimeline />
      <SkillsSection />
      <AchievementsSection />
      <CTASection />
    </>
  );
}
