// stores/useSession.ts
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import useUserStore from './useUserStore'

interface SessionState {
  access_token: string // Bearer 토큰 전체를 저장
  isAuthenticated: boolean
}

interface SessionStatePatch {
  access_token?: string
}

interface SessionStore extends SessionState {
  setSessionInfo: (session: SessionState) => void
  patchSessionInfo: (session: SessionStatePatch) => void
  logout: () => void
}

const sessionInitData: SessionState = {
  access_token: '',
  isAuthenticated: false,
}

const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      ...sessionInitData,
      setSessionInfo: (session: SessionState) => {
        set((state) => ({
          ...state,
          ...session,
          isAuthenticated: true,
        }))
      },
      patchSessionInfo: (session: SessionStatePatch) => {
        set((state) => ({
          ...state,
          access_token: session?.access_token || state.access_token,
        }))
      },
      logout: () => {
        set(sessionInitData)
        useUserStore.getState().clearUser()
      },
    }),
    {
      name: 'projectmanager-session',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        access_token: state.access_token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)

export const useIsAuthenticated = () =>
  useSessionStore((state) => state.isAuthenticated)

export default useSessionStore
