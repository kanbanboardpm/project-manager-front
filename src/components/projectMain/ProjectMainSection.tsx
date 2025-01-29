import CardSection from './CardSection'
import ProjectHeader from './ProjectHeader'
import SettingMenuBar from './SettingMenuBar'

export default function ProjectMainSection() {
  return (
    <section className="h-full flex flex-col">
      <ProjectHeader />
      <SettingMenuBar page="project" />
      <CardSection />
    </section>
  )
}
