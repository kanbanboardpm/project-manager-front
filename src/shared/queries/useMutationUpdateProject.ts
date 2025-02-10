import {
  Project,
  updateProject,
  UpdateProjectRequest,
} from '@/services/projects.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'

const useMutationUpdateProject = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<Project, Error, UpdateProjectRequest>({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects.lists('') })
    },
    onError: (error) => {
      console.error('Update project failed: ', error)
    },
  })
  return mutation
}

export { useMutationUpdateProject }
