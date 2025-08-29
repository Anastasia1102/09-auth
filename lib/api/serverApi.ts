import { cookies } from 'next/headers'
import { nextServer } from './api'
import { CheckSessionResponse } from './clientApi'
import { User } from '@/types/user'

export const checkServerSession = async (cookieHeader?: string) => {
  const cookiesData =  cookieHeader ?? (await cookies()).toString();
  return nextServer.get<CheckSessionResponse>(`/auth/session`, {
    headers: { Cookie: cookiesData.toString() },
  })
}

export const getServerMe = async ():Promise<User>=> {
  const cookiesData = (await cookies()).toString();
  const { data } = await nextServer.get(`/users/me`, {
    headers: { Cookie: cookiesData},
  })
  return data;
}