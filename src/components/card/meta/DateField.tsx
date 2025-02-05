// src/components/card/meta/DateField.tsx
import { type DateRange } from 'react-day-picker'
import { Icon } from '@/shared/ui/Icon'

import DateRangePicker from '../CardCalendar'
import MetaInfoField from './MetaInfo'

// 기본 공통 props
interface BaseDateFieldProps {
  startDate?: Date
  endDate?: Date
  displayStartDate: string
  displayEndDate: string
}

// 보기 모드 props
interface ViewDateFieldProps extends BaseDateFieldProps {
  isEdit: false
  onRangeSelect?: never
}

// 수정 모드 props
interface EditDateFieldProps extends BaseDateFieldProps {
  isEdit: true
  onRangeSelect: (range: DateRange | undefined) => void
}

type DateFieldProps = ViewDateFieldProps | EditDateFieldProps

export function DateField(props: DateFieldProps) {
  const { startDate, endDate, displayStartDate, displayEndDate, isEdit } = props

  return (
    <MetaInfoField label="마감일">
      {isEdit ? (
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onRangeSelect={props.onRangeSelect}
        />
      ) : (
        <>
          <Icon
            icon="Calendar"
            size={20}
            className="sm:w-6 md:w-7 sm:h-6 md:h-7"
            color="gray"
          />
          <span className="text-xs text-cardDate">
            {displayStartDate} ~ {displayEndDate}
          </span>
        </>
      )}
    </MetaInfoField>
  )
}
