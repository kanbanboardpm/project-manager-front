import Modal from '@/shared/ui/Modal'
import { ModalKey } from './ModalController'

export default function AccountWithdrawal({ modalId }: { modalId: ModalKey }) {
  return (
    <Modal modalId={modalId} width="w-[300px] md:w-[400px]">
      <div className="font-semibold text-base">회원 탈퇴</div>
    </Modal>
  )
}
