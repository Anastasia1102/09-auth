import CreateNote from "@/components/CreateNote/CreateNote";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description: "Start a new note in NoteHub. Add a title, content and tag to create your personal note.",
  openGraph: {
    type: "website",
    title: "Create Note | NoteHub",
    description: "Start a new note in NoteHub. Add a title, content and tag to create your personal note.",
    url: "https://08-zustand-pi-ruby.vercel.app/notes/action/create",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create a new note",
      },
    ],
  },
};

export default function CreateNotePage() {
  return <CreateNote />;
}
