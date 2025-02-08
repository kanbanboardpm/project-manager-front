import {
  createProject,
  CreateProjectRequest,
  Project,
} from '@/services/projects.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const QUERY_KEYS = {
  projects: {
    all: ['projects'] as const,
    lists: () => [...QUERY_KEYS.projects.all, 'list'] as const,
    detail: (id: number) => [...QUERY_KEYS.projects.all, id] as const,
  },
} as const

const useMutationCreateProject = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<Project, Error, CreateProjectRequest>({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects.lists() })
    },
  })
  return mutation
}

export { QUERY_KEYS, useMutationCreateProject }
