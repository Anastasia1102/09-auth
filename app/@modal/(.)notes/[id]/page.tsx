import { QueryClient, dehydrate } from '@tanstack/react-query';
import {fetchNoteById}  from '@/lib/api/serverApi';
import NotePreviewClient from './NotePreview.client';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return <NotePreviewClient dehydratedState={dehydratedState} />;
}
