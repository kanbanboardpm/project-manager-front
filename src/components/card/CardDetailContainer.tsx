import { useProjectId } from '@/shared/hooks/useProjectId'
import ProjectHeader from '../projectMain/ProjectHeader'
import CardContent from './CardContent'

interface CardDetailProps {
  mode?: 'view' | 'edit'
}
export default function CardDetailContainer({
  mode = 'view',
}: CardDetailProps) {
  const projectId = useProjectId()
  return (
    <div className="min-h-screen bg-white w-full rounded-card">
      <ProjectHeader projectId={projectId} />
      <CardContent projectId={projectId} mode={mode} />
    </div>
  )
}
