'use client';

import { fetchNoteById} from '@/lib/api/clientApi'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import css from './NoteDetails.module.css'

const NoteDetailsClient = () => {
    const { id } = useParams<{ id: string }>()
    
    const { data: note, isLoading, isError } = useQuery({
      queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
      refetchOnMount: false,
    });
    
    if (isLoading) {
        return <p>Loading, please wait...</p>;
    }

    if (!note || isError) {
        return <p>Something went wrong.</p>;
    }

    const createdAtDate = note.createdAt ? new Date(note.createdAt).toLocaleString() : 'Creation date unknown';

    return (<div className={css.container}>
        <div className={css.item}>
            <div className={css.header}>
                <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{createdAtDate}</p>
        </div>
    </div>);
}

export default NoteDetailsClient;