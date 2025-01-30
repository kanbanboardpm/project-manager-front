import { Icon } from '@/shared/ui/Icon'

interface Task {
  id: string
  projectName: string
  projectColor: string
  sectionName: string
  title: string
  content: string
  startDate: string
  endDate: string
  category: string
  completeDate?: string
}

interface TaskListResponse {
  page: number
  size: number
  data: Task[]
}

interface TaskListProps {
  taskData?: TaskListResponse
  onPageChange: (page: number) => void
}

export default function TaskList({ taskData, onPageChange }: TaskListProps) {
  if (!taskData) {
    return (
      <div className="text-center py-10 text-gray-500">작업이 없습니다.</div>
    )
  }

  const { data: tasks, page, size } = taskData
  function getDateDiff(endDate: string): string {
    const today = new Date()
    const end = new Date(endDate)
    const diffDays = Math.ceil(
      (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    )

    return diffDays === 0
      ? 'D-Day'
      : diffDays < 0
        ? `D+${Math.abs(diffDays)}`
        : `D-${diffDays}`
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        {/* PC */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-[180px_120px_120px_200px_160px]">
            <div className="contents">
              <div className="text-sm text-center py-1 border-b border-bodyBorder">
                프로젝트
              </div>
              <div className="text-sm text-center py-1 border-b border-bodyBorder">
                섹션
              </div>
              <div className="text-sm text-center py-1 border-b border-bodyBorder">
                카테고리
              </div>
              <div className="text-sm text-center py-1 border-b border-bodyBorder">
                카드
              </div>
              <div className="text-sm text-center py-1 border-b border-bodyBorder">
                기간
              </div>
            </div>

            {tasks.map((task) => (
              <div key={`pc-${task.id}`} className="contents">
                <div className="flex items-center px-6 gap-3 py-2 border-b border-bodyBorder">
                  <div
                    className="w-6 h-6 rounded flex-shrink-0"
                    style={{ backgroundColor: task.projectColor }}
                  />
                  <span className="text-sm font-medium truncate">
                    {task.projectName}
                  </span>
                </div>
                <div className="text-sm font-medium text-center py-2 border-b border-bodyBorder">
                  {task.sectionName}
                </div>
                <div className="text-sm font-medium text-center py-2 border-b border-bodyBorder">
                  {task.category}
                </div>
                <div className="text-sm font-medium text-center py-2 border-b border-bodyBorder">
                  {task.title}
                </div>
                <div className="text-xs font-medium text-center py-2 border-b border-bodyBorder">
                  {`${task.startDate} ~ ${task.endDate}`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-[140px_140px_140px_140px]">
            <div className="contents">
              <div className="text-sm text-center py-1 border-b border-bodyBorder">
                프로젝트
              </div>
              <div className="text-sm text-center py-1 border-b border-bodyBorder">
                섹션
              </div>
              <div className="text-sm text-center py-1 border-b border-bodyBorder">
                카드
              </div>
              <div className="text-sm text-center py-1 border-b border-bodyBorder">
                기간
              </div>
            </div>

            {tasks.map((task) => (
              <div key={`tablet-${task.id}`} className="contents">
                <div className="flex items-center justify-center gap-3 py-2 border-b border-bodyBorder">
                  <div
                    className="w-6 h-6 rounded flex-shrink-0"
                    style={{ backgroundColor: task.projectColor }}
                  />
                  <span className="text-sm font-medium truncate">
                    {task.projectName}
                  </span>
                </div>
                <div className="text-sm font-medium text-center py-2 border-b border-bodyBorder">
                  {task.sectionName}
                </div>
                <div className="text-sm font-medium text-center py-2 border-b border-bodyBorder">
                  {task.title}
                </div>
                <div className="text-xs font-medium text-center py-2 border-b border-bodyBorder">
                  {getDateDiff(task.endDate)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="block md:hidden">
          <div className="grid grid-cols-[100px_120px_40px]">
            <div className="contents">
              <div className="text-xs text-center py-1 border-b border-bodyBorder">
                프로젝트
              </div>
              <div className="text-xs text-center py-1 border-b border-bodyBorder">
                카드
              </div>
              <div className="text-xs text-center py-1 border-b border-bodyBorder">
                기간
              </div>
            </div>

            {tasks.map((task) => (
              <div key={`mobile-${task.id}`} className="contents">
                <div className=" whitespace-nowrap text-ellipsis overflow-hidden text-sm font-medium text-center py-2 border-b border-bodyBorder">
                  {task.projectName}
                </div>
                <div className="whitespace-nowrap text-ellipsis overflow-hidden text-sm font-medium text-center py-2 border-b border-bodyBorder ">
                  {task.title}
                </div>
                <div className="text-xs font-medium text-center py-2 border-b border-bodyBorder">
                  {getDateDiff(task.endDate)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center py-3">
          <div className="flex items-center gap-0.5">
            <button
              className={`${page <= 1 ? 'opacity-40' : ''}`}
              onClick={() => onPageChange(1)}
              disabled={page <= 1}
            >
              <Icon icon="AngleDoubleLeft" size={10} />
            </button>
            <button
              className={`${page <= 1 ? 'opacity-40' : ''}`}
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
            >
              <Icon icon="AngleLeft" size={10} />
            </button>
            <div className="flex items-center px-2 gap-3">
              {Array.from({ length: size }, (_, i) => i + 1).map((num) => (
                <span
                  key={num}
                  className={`text-xs font-medium cursor-pointer ${
                    num === page ? 'text-primary' : 'text-black'
                  }`}
                  onClick={() => onPageChange(num)}
                >
                  {num}
                </span>
              ))}
            </div>
            <button
              className={`${page >= size ? 'opacity-40' : ''}`}
              onClick={() => onPageChange(page + 1)}
              disabled={page >= size}
            >
              <Icon icon="AngleRight" size={10} />
            </button>
            <button
              className={`${page >= size ? 'opacity-40' : ''}`}
              onClick={() => onPageChange(size)}
              disabled={page >= size}
            >
              <Icon icon="AngleDoubleRight" size={10} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
