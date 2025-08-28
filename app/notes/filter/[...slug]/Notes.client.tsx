'use client';

import { useState} from "react";
import { keepPreviousData, useQuery} from "@tanstack/react-query";
import { fetchNotes, type FetchNotesResp } from "@/lib/api";
import { useDebounce } from "use-debounce";
import { NoteTag } from "@/types/note";

import css from "./NotesPage.module.css";

import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";


interface NotesClientProps {
  initialPage: number;
  initialSearch: string;
  initialData: FetchNotesResp;
  initialTag?: NoteTag;
}

export default function NotesClient({initialPage,initialSearch,initialData, initialTag}:NotesClientProps) {
  const [page, setPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const [debouncedSearch] = useDebounce(searchQuery, 300);


  const { data } = useQuery<FetchNotesResp>({
    queryKey: ["notes", page, debouncedSearch, initialTag ?? 'All'],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch, tag:initialTag }),
    placeholderData: keepPreviousData,
    initialData:page===initialPage && debouncedSearch===initialSearch ? initialData:undefined,
  });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            setPage={setPage}
          />
        )}
         <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {notes.length > 0 && <NoteList notes={notes} />}
      {notes.length === 0 && (
        <p className={css.noResults}>No matching notes found.</p>
      )}

    </div>
  );
}