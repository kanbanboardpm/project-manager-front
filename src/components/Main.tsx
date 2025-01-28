import { useModalStore } from '@/store/useModalStore'

export default function Main() {
  const { openModal } = useModalStore()

  return (
    <div className="flex flex-col gap-4">
      Main Page
      <button
        className="p-4 border bg-white rounded-xl border-primary"
        onClick={() => openModal('create-card')}
      >
        create card
      </button>
      <button
        className="p-4 border bg-white rounded-xl border-primary"
        onClick={() => openModal('create-section')}
      >
        create section
      </button>
      <button
        className="p-4 border bg-white rounded-xl border-primary"
        onClick={() => openModal('update-section')}
      >
        update section
      </button>
      <button
        className="p-4 border bg-white rounded-xl border-primary"
        onClick={() => openModal('create-project')}
      >
        create project
      </button>
    </div>
  )
}
