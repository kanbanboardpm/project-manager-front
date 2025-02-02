import MetaInfoField from './MetaInfo'

interface AssigneeFieldProps {
  name: string
}

export function AssigneeField({ name }: AssigneeFieldProps) {
  return (
    <MetaInfoField label="담당자">
      <div className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 bg-primary rounded-full" />
      <span className="text-xs text-cardDate">{name}</span>
    </MetaInfoField>
  )
}
