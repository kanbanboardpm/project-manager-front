import ProjectHeader from './ProjectHeader'
import SettingMenuBar from './SettingMenuBar'

export default function ProjectMainSection() {
  return (
    <section className="">
      <ProjectHeader />
      <SettingMenuBar page="project" />
    </section>
  )
}
