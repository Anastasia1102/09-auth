import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { NoteTag } from '@/types/note'

export type DraftType = {
  title: string;
  content: string;
  tag:NoteTag
}

export const initialDraft: DraftType = {
  title: '',
  content: '',
  tag: 'Todo',
}

type CreateNoteDraft = {
    draft: DraftType;
    setDraft: (newData: Partial <DraftType>) => void;
    clearDraft: () => void;
}


export const useNoteDraft = create<CreateNoteDraft>()(
  persist(
    (set) => ({
        draft: initialDraft,
        setDraft:(newData: Partial<DraftType>) => set((state) => ({ draft: { ...state.draft, ...newData } })),
        clearDraft: () => set({ draft: initialDraft }),
      }),
    {
        name: 'notehub:create-note-draft',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ draft: state.draft }),
    }
  )
)
