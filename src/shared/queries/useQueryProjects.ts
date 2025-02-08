import { getProjects } from '@/services/projects.service'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from './useMutationCreateProjects'

const useQueryProjects = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: QUERY_KEYS.projects.lists(),
    queryFn: getProjects,
  })
  return { isPending, isError, data, error }
}

export { useQueryProjects }
