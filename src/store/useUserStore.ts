// stores/useUser.ts
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  nickName: string
  imageUrl?: string
  // 다른 사용자 관련 필드들...
}

interface UserState {
  user: User | null
}

interface UserStore extends UserState {
  setUser: (user: User | null) => void
  updateUser: (userData: Partial<User>) => void
  clearUser: () => void
}

const userInitData: UserState = {
  user: null,
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...userInitData,
      setUser: (user: User | null) => {
        set({ user })
      },
      updateUser: (userData: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }))
      },
      clearUser: () => {
        set(userInitData)
      },
    }),
    {
      name: 'projectmanager-user',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

// 편의성 훅
export const useUser = () => useUserStore((state) => state.user)

export default useUserStore
