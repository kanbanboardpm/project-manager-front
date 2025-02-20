import { useSearchParams, useNavigate } from 'react-router-dom'
import TaskList from './TaskList'
import {
  useQueryCompletedTaskList,
  useQueryInProgressTaskList,
} from '@/shared/queries/useQueryTaskList'
import { useQueryProjectList } from '@/shared/queries/useQueryProjectList'
import { useQueryUser } from '@/shared/queries/useQueryUser'

export default function HomePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const inProgressPage = Number(searchParams.get('inProgressPage')) || undefined
  const completedPage = Number(searchParams.get('completedPage')) || undefined
  const { data: inProgressTasksData } =
    useQueryInProgressTaskList(inProgressPage)
  const { data: completedTasksData } = useQueryCompletedTaskList(completedPage)
  const { data: userData } = useQueryUser()
  const { data: projectsData } = useQueryProjectList()

  const user = userData?.data
  const projects = projectsData?.data
  const inProgressTasks = inProgressTasksData?.data
  const completedTasks = completedTasksData?.data
  const totalCard =
    (inProgressTasks?.content?.length ?? 0) +
    (completedTasks?.content?.length ?? 0)
  const handlePageChange = (
    type: 'inProgress' | 'completed',
    value: number,
  ) => {
    const params = new URLSearchParams(searchParams)
    if (type === 'inProgress') {
      params.set('inProgressPage', value.toString())
    } else {
      params.set('completedPage', value.toString())
    }
    navigate(`?${params.toString()}`)
  }

  const formatDate = () => {
    const now = new Date()
    const month = now.getMonth() + 1
    const date = now.getDate()
    const dayNames = ['일', '월', '화', '수', '목', '금', '토']
    const day = dayNames[now.getDay()]
    return `${month}월 ${date}일 ${day}요일`
  }

  return (
    <div className="w-full  bg-white rounded-l-lg">
      <div className="flex flex-col w-full items-center py-5 gap-4 px-4 sm:px-2 ">
        <div className="text-center text-base">
          {formatDate()} <span className="font-semibold">{user?.nickname}</span>
          님 안녕하세요!
        </div>

        <div className="flex justify-center gap-4 px-4 py-2 border border-primary rounded-full sm:text-sm">
          <div className="text-primary font-bold">total</div>
          <div className="text-primary font-bold">
            {projects?.length} 프로젝트
          </div>
          <div className="text-primary font-bold">{totalCard} 카드</div>
        </div>

        <div className="flex flex-col items-center gap-3 w-full ">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm lg:text-xl font-bold">
              {`${user?.nickname} 님의 진행중인 작업`}
            </h2>
            <TaskList
              taskData={inProgressTasks ?? undefined}
              onPageChange={(page) => handlePageChange('inProgress', page)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-sm lg:text-xl font-bold">
              {`${user?.nickname} 님의 완료된 작업`}
            </h2>
            <TaskList
              taskData={completedTasks ?? undefined}
              onPageChange={(page) => handlePageChange('completed', page)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
