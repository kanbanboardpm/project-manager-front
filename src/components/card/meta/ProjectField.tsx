import MetaInfoField from './MetaInfo'

interface ProjectFieldProps {
  projectName: string
  projectCategory: string
}

export function ProjectField({
  projectName,
  projectCategory,
}: ProjectFieldProps) {
  return (
    <MetaInfoField label="프로젝트">
      <div className="w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 rounded-full bg-primary" />
      <span className="text-xs sm:text-sm text-cardDate whitespace-nowrap overflow-hidden">
        {projectName}
      </span>
      <span className="text-xs sm:text-sm text-cardDate">·</span>
      <span className="text-xs sm:text-sm text-cardDate">
        {projectCategory}
      </span>
    </MetaInfoField>
  )
}
