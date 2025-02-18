import { useProjectId } from '@/shared/hooks/useProjectId'
import ProjectHeader from '../projectMain/ProjectHeader'
import CardContent from './CardContent'
import { useQueryProject } from '@/shared/queries/useQueryProject'

interface CardDetailProps {
  mode?: 'view' | 'edit'
}
export default function CardDetailContainer({
  mode = 'view',
}: CardDetailProps) {
  const projectId = useProjectId()
  const { data: project } = useQueryProject(projectId)

  if (project?.data)
    return (
      <div className="min-h-screen bg-white w-full rounded-card">
        <ProjectHeader {...project?.data} />
        <CardContent projectId={projectId} mode={mode} />
      </div>
    )
}
