'use client'

import { useRouter } from 'next/navigation'
import NoteForm from '../NoteForm/NoteForm'
import css from './CreateNote.module.css'

const CreateNote = () => {
  const router = useRouter();

    return (<main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
        {<NoteForm onSuccess={() => router.push('/notes/filter/all')}
          onCancel={() => router.back()} />}
  </div>
</main>
)
}

export default CreateNote;