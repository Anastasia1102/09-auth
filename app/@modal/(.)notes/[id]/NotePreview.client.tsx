'use client'

import css from "./NotePreview.module.css"
import { useRouter, useParams  } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { useQuery,  HydrationBoundary, DehydratedState, } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import Loader from "@/app/loading";

interface Props {
 dehydratedState: DehydratedState;
}

export default function NotePreviewClient({dehydratedState}:Props) {

  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const goBack = () => router.back();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: typeof id === 'string' && id.length > 0,
    refetchOnMount: false,
  });
    

  return (
       <HydrationBoundary state={dehydratedState}>
        <Modal onClose={goBack}>
        <div className={css.container}>
          <div className={css.item}>
             {isLoading && <Loader/>}
             {isError && <p>Failed to load note.</p>}
            
            {note && (
              <>
                <div className={css.header}>
                  <h2>{note.title}</h2>
                </div>
                <p className={css.content}>{note.content}</p>
                {note.createdAt && (
                  <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
                )}
                <span className={css.tag}>{note.tag}</span>
              </>
            )}

            <button
              type="button"
                className={css.backBtn}
                onClick={goBack}
            >
              Go Back
            </button>
        </div>
            </div>
      </Modal>
    </HydrationBoundary>);
}

