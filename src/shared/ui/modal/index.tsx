import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../alert-dialog'
import { Button } from '../button'

interface ModalProps {
  title: string
  children: React.ReactNode
  disabled?: boolean
  width?: string
}

export function Modal({ title, children, disabled, width }: ModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="modalOutline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className={width}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{children}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction disabled={disabled}>생성</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
