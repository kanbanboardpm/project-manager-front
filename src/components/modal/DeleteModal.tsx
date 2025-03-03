import { Button } from '@/shared/ui/common/button'
import { Icon } from '@/shared/ui/Icon'
import Modal from '@/shared/ui/Modal'
import { useModalStore } from '@/store/useModalStore'
import { ModalKey } from './ModalController'

export default function DeleteModal({ modalId }: { modalId: ModalKey }) {
  const { getModalData } = useModalStore()
  const modalData = getModalData('delete-alert')
  return (
    <Modal modalId={modalId} width="w-[300px] md:w-[400px]">
      <div className="flex gap-2">
        <Icon icon="Warning" className="text-[#F4B400]" /> 주의
      </div>

      <p className="whitespace-pre-line">{modalData?.modalText}</p>
      <Button
        onClick={modalData?.onClickHandler}
        variant="categoryDelete"
        className="!py-2"
      >
        삭제
      </Button>
    </Modal>
  )
}
