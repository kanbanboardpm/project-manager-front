import { useModalStore } from '@/store/useModalStore'
import { Fragment, ReactNode } from 'react'
import CreateCardModal from './CreateCardModal'
import CreateProjectModal from './CreateProjectModal'
import CreateSectionModal from './CreateSectionModal'
import UpdateSectionModal from './UpdateSectionModal'

export type ModalKey =
  | 'create-card'
  | 'create-project'
  | 'create-section'
  | 'update-section'

const MODALS: Record<ModalKey, ReactNode> = {
  'create-card': <CreateCardModal modalId="create-card" />,
  'create-project': <CreateProjectModal modalId="create-project" />,
  'create-section': <CreateSectionModal modalId="create-section" />,
  'update-section': <UpdateSectionModal modalId="update-section" />,
}

export default function ModalController() {
  const { activeModals } = useModalStore()

  return Object.entries(activeModals).map(([key, value]) => {
    if (value === true) {
      return <Fragment key={key}>{MODALS[key as ModalKey]}</Fragment>
    }
  })
}
