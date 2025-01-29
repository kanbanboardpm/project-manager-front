import { ModalKey } from '@/components/modal/ModalController'
import { create } from 'zustand'

interface ModalStore {
  activeModals: Record<ModalKey, boolean>
  openModal: (key: ModalKey) => void
  closeModal: (key: ModalKey) => void
}

export const useModalStore = create<ModalStore>((set) => ({
  activeModals: {
    'create-card': false,
    'create-project': false,
    'create-section': false,
    'update-section': false,
  },
  openModal: (key) =>
    set((state) => ({
      activeModals: { ...state.activeModals, [key]: true },
    })),
  closeModal: (key) =>
    set((state) => ({
      activeModals: { ...state.activeModals, [key]: false },
    })),
}))
