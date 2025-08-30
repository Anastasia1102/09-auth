import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/serverApi";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

type NoteDetailsProps = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: NoteDetailsProps):Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);
  
  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 100),
      url: `https://08-zustand-pi-ruby.vercel.app/notes/${id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://placehold.co/1200x630',
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
      type: 'article',
    },
    twitter: {
	    card: 'summary_large_image',
      title: `${note.title}`,
      description: note.content.slice(0, 3),
      images: ['https://ac.goit.global/fullstack/react/og-meta.jpg'],
    },
  }
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    });
    
    return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

export default NoteDetails;