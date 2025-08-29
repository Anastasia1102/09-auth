
import type {Note, NoteTag} from "@/types/note";
import {nextServer} from "./api";
import { User } from "@/types/user";
import type { AxiosRequestConfig } from 'axios';

const NOTES_ENDPOINT = "/notes";

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

export type RegisterRequestData ={
  email: string;
  password: string;
  userName: string;
}

export type LoginRequestData = {
  email: string;
  password: string;
}

export interface CheckSessionResponse {
  success: boolean;
}

export const fetchNotes = async ({ page, perPage, search, tag }: FetchNotesParams, config?: AxiosRequestConfig): Promise<FetchNotesResp> => {
  const params: FetchNotesParams = { page, perPage };
  if (search?.trim()) params.search = search;
  if (tag) params.tag = tag;

  const res = await nextServer.get<FetchNotesResp>(NOTES_ENDPOINT, { params, ...(config ?? {}), });
  return res.data;
};

export const createNote = async (noteData: Omit<Note, "id" | "createdAt" | "updatedAt">): Promise<Note> => {
  const res = await nextServer.post<Note>(NOTES_ENDPOINT, noteData);
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`${NOTES_ENDPOINT}/${noteId}`);
  return res.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`${NOTES_ENDPOINT}/${noteId}`);
  return res.data;
}

export const fetchTagList = async (): Promise<NoteTag[]> => {
  return ["Work","Personal","Meeting","Shopping","Ideas","Travel","Finance","Health","Important","Todo"];
};

export const register = async (payload: RegisterRequestData) => {
    const { data } = await nextServer.post<User>(`/auth/register`, payload)
    return data
}
    
export const logIn = async (payload: LoginRequestData) => {
  const { data } = await nextServer.post<User>(`/auth/login`, payload)
  return data
}

export const logOut = async () => {
  const { data } = await nextServer.post(`/auth/logout`)
  return data
}

export const checkSession = async () => {
  const { data } = await nextServer.get<CheckSessionResponse>(`/auth/session`)
  return data.success
}

export const getMe = async () => {
  const { data } = await nextServer.get<User>(`/users/me`)
  return data
}

export const updateProfile = async (payload: { username: string }): Promise<User> => {
  const { data } = await nextServer.patch<User>('/users/me', payload);
  return data;
};
