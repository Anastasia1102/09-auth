import NotesClient from "./Notes.client";
import type { Metadata } from "next";
import { fetchNotes,type FetchNotesResp } from "@/lib/api/serverApi";
import { NoteTag } from "@/types/note";
import { cookies } from 'next/headers';


type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

const allowedTags = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;
type AllowedTag = (typeof allowedTags)[number];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug?.join(" / ") || "All";

  return {
    title: `Notes — ${filter} | NoteHub`,
    description: `Browse notes filtered by: ${filter}.`,
    openGraph: {
      title: `Notes — ${filter} | NoteHub`,
      description: `Browse notes filtered by: ${filter}.`,
      url: `/notes/filter/${slug?.join("/") || "all"}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Filtered notes: ${filter}`,
        },
      ],
      type: "website",
    },
  };
}
export default async function NotesPage({ params }: PageProps) {
  const { slug } = await params;
  const initialPage = 1;
  const initialSearch = "";

  const raw = slug?.[0];
  let selectedTag: NoteTag | undefined = undefined;

  if (raw && raw !== "all" && (allowedTags as readonly string[]).includes(raw)) {
    selectedTag = raw as AllowedTag;
  }

  const cookieHeader = (await cookies()).toString();

  const initialData: FetchNotesResp = await fetchNotes({
    page: initialPage,
    perPage: 12,
    search: initialSearch,
    tag: selectedTag,
  },
    { headers: { Cookie: cookieHeader } }
  );


  return (
     <NotesClient
       initialPage={initialPage}
       initialSearch={initialSearch}
       initialData={initialData}
       initialTag={selectedTag}
    />
  );
}
