import { cookies } from 'next/headers'
import {  nextServer } from './api'
import { CheckSessionResponse } from './clientApi'
import { User } from '@/types/user'
import { Note, NoteTag } from '@/types/note';
import { AxiosRequestConfig } from 'axios';


interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResp {
  page?: number;
  notes: Note[];
  totalPages: number;
  perPage?: number;
}

export const fetchNotes = async ({ page, perPage, search, tag }: FetchNotesParams, config?: AxiosRequestConfig): Promise<FetchNotesResp> => {
  const params: FetchNotesParams = { page, perPage };
  if (search?.trim()) params.search = search;
  if (tag) params.tag = tag;

  const res = await  nextServer.get<FetchNotesResp>("/notes", { params, ...(config ?? {}), });
  return res.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const res = await  nextServer.get<Note>(`"/notes"/${noteId}`);
  return res.data;
}

export const checkServerSession = async (cookieHeader?: string) => {
  const cookiesData =  cookieHeader ?? (await cookies()).toString();
  return  nextServer.get<CheckSessionResponse>(`/auth/session`, {
    headers: { Cookie: cookiesData.toString() },
  })
}

export const getServerMe = async ():Promise<User>=> {
  const cookiesData = (await cookies()).toString();
  const { data } = await  nextServer.get(`/users/me`, {
    headers: { Cookie: cookiesData},
  })
  return data;
}