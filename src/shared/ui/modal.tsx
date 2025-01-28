import { ModalKey } from '@/components/modal/ModalController'
import { useModalStore } from '@/store/useModalStore'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './alert-dialog'

interface ModalProps {
  title: string
  children: React.ReactNode
  disabled?: boolean
  width?: string
  modalId: ModalKey
}

export function Modal({
  title,
  children,
  disabled,
  width,
  modalId,
}: ModalProps) {
  const { closeModal } = useModalStore()
  return (
    <AlertDialog open>
      <AlertDialogContent className={width}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{children}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => closeModal(modalId)}>
            취소
          </AlertDialogCancel>
          <AlertDialogAction disabled={disabled}>생성</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
