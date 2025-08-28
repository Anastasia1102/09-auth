"use client";

import { useState } from "react";
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api";
import type { Note } from "../../types/note";
import { useNoteDraft, initialDraft, type DraftType} from "@/lib/store/noteStore"; 

interface NoteFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function NoteForm({ onSuccess, onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraft();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      onSuccess();
    },
  });

  const [errors, setErrors] = useState<{ title?: string; content?: string; tag?: string }>({});

  const handleSubmit = (formData: FormData) => {
    const title = (formData.get("title") as string)?.trim();
    const content = (formData.get("content") as string)?.trim();
    const tag = formData.get("tag") as string||initialDraft.tag;

    const newErrors: typeof errors = {};

    if (!title || title.length < 3 || title.length > 50) {
      newErrors.title = "Title must be between 3 and 50 characters";
    }
    if (content && content.length > 500) {
      newErrors.content = "Content must be at most 500 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    mutation.mutate({ title, content, tag } as Note);
  };

  return (
    <form
      className={css.form}
      action={(formData) => handleSubmit(formData)}
    >
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" className={css.input} value={draft.title??initialDraft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
          required/>
        {errors.title && <span className={css.error}>{errors.title}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={8} className={css.textarea} value={draft.content?? initialDraft.content}
          onChange={(e) => setDraft({ content: e.target.value })}/>
        {errors.content && <span className={css.error}>{errors.content}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={css.select} value={draft.tag ?? initialDraft.tag}
          onChange={(e) => setDraft({ tag: e.target.value as DraftType["tag"] })}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.tag && <span className={css.error}>{errors.tag}</span>}
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
          Create note
        </button>
      </div>
    </form>
  );
}
