import {
  createProject,
  CreateProjectRequest,
  deleteProject,
  GetProjectRequest,
  updateProject,
  UpdateProjectRequest,
} from '@/services/projects.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { APIResponse } from '../types/response'

interface Data {
  id: number
}

const useMutationCreateProject = () => {
  const queryClient = useQueryClient()

  return useMutation<APIResponse<Data>, Error, CreateProjectRequest>({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.projects.all,
      })
    },
    onError: (error) => {
      console.error('Create project failed: ', error)
    },
  })
}

const useMutationUpdateProject = () => {
  const queryClient = useQueryClient()

  return useMutation<APIResponse<null>, Error, UpdateProjectRequest>({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.projects.all,
      })
    },
    onError: (error) => {
      console.error('Update project failed: ', error)
    },
  })
}

const useMutationDeleteProject = () => {
  const queryClient = useQueryClient()

  return useMutation<APIResponse<null>, Error, GetProjectRequest>({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.projects.all,
      })
    },
    onError: (error) => {
      console.error('Delete project failed: ', error)
    },
  })
}

export {
  useMutationCreateProject,
  useMutationDeleteProject,
  useMutationUpdateProject,
}
