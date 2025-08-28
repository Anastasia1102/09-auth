'use client'

import css from "./NotePreview.module.css"
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { Note } from "@/types/note";

export default function NotePreviewClient({ note }: { note:Note }) {

    const router = useRouter();
    const goBack = () => router.back();

    const createdAtDate = note.createdAt ? new Date(note.createdAt) : null;

    return (
        <Modal onClose={goBack}>
        <div className={css.container}>
        <div className={css.item}>
            <div className={css.header}>
                <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
             {createdAtDate && (
            <p className={css.date}>{createdAtDate.toLocaleString()}</p>
          )}
            <span className={css.tag}>{note.tag}</span>
            <button
              type="button"
                className={css.backBtn}
                onClick={goBack}
            >
              Go Back
            </button>
        </div>
            </div>
        </Modal>);
}

