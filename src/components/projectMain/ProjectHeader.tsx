import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icons/Icon'

export default function ProjectHeader() {
  return (
    <div className="flex justify-between p-3 border-b border-bodyBorder">
      <div className="flex items-center gap-3">
        <div className="bg-category-red w-5 h-5 md:w-10 md:h-10 rounded-button"></div>
        <div className="text-base md:text-xl">Project Manager</div>
        <Icon
          icon="Setting"
          className="w-[14px] h-[14px] md:w-5 md:h-5 cursor-pointer"
          onClick={() => {}}
        />
      </div>
      <Button variant="member">
        <Icon icon="Member" size={10} />
        멤버
      </Button>
    </div>
  )
}
