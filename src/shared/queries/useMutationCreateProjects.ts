import {
  createProject,
  CreateProjectRequest,
  Project,
} from '@/services/projects.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'

const useMutationCreateProject = () => {
  const queryClient = useQueryClient()

  return useMutation<Project, Error, CreateProjectRequest>({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.projects.all,
      })
    },
  })
}

export { useMutationCreateProject }
