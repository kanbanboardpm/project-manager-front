import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar } from '@/shared/ui/common/calendar'
import { Icon } from '@/shared/ui/Icon'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/common/popover'
import { Button } from '@/shared/ui/common/button'
import { DateRange } from 'react-day-picker'
import { cn } from '@/shared/lib/utils'

interface DateRangePickerProps {
  startDate: Date | undefined
  endDate: Date | undefined
  onRangeSelect: (range: DateRange | undefined) => void
}

export default function DateRangePicker({
  startDate,
  endDate,
  onRangeSelect,
}: DateRangePickerProps) {
  const [calendarOpen, setCalendarOpen] = useState(false)

  return (
    <div className="flex items-center gap-2">
      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              'justify-start text-left font-normal p-0 h-auto hover:bg-transparent',
              !startDate && 'text-muted-foreground',
            )}
          >
            <div className="flex items-center gap-2">
              <Icon
                icon="Calendar"
                size={18}
                color="gray"
                className="sm:w-5 sm:h-5"
              />
              <span className="text-xs text-cardDate">
                {startDate ? (
                  endDate ? (
                    <>
                      {format(startDate, 'yyyy-MM-dd')} ~{' '}
                      {format(endDate, 'yyyy-MM-dd')}
                    </>
                  ) : (
                    format(startDate, 'yyyy-MM-dd')
                  )
                ) : (
                  '날짜를 선택하세요'
                )}
              </span>
              <Icon
                icon="ChevronDown"
                size={12}
                color="gray"
                className="sm:w-5 sm:h-5"
              />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={startDate}
            selected={{
              from: startDate,
              to: endDate,
            }}
            onSelect={(range) => {
              onRangeSelect(range)
              setCalendarOpen(false)
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
