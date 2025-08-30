'use client'

import css from './EditProfilePage.module.css'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { User } from '@/types/user';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMe, updateProfile } from '@/lib/api/clientApi'; 
import Loader from '@/app/loading';
import { useAuthStore } from '@/lib/store/authStore';

const baseUserName = (value: string) => (value?.includes('@') ? value.split('@')[0] : value);

export default function EditProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const setUserInStore = useAuthStore((s) => s.setUser);

  const { data: user, isLoading, isError } = useQuery<User>({
    queryKey: ['me'],
    queryFn: getMe,
    refetchOnMount: false,
  });

  const [username, setUsername] = useState('');

  useEffect(() => {
    if (user?.username) setUsername(baseUserName(user.username));
  }, [user?.username]);

 
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: {username: string;}) => updateProfile(payload),
    onSuccess: (updatedUser) => {
      setUserInStore(updatedUser);
      queryClient.setQueryData(['me'], updatedUser);
      router.push('/profile');
    },
  });

  const onSubmit = async (formData: FormData) => {
    const userName = (formData.get('username') as string)?.trim() || '';
    if (!userName) return;
    await mutateAsync({ username:userName });
  };

  const onCancel = () => {
    router.back();
  };

  if (isLoading) {
    return <Loader/>;
  }

  if (isError || !user) {
    return <main className={css.mainContent}><p>Failed to load profile.</p></main>;
  }

  // const avatarSrc = '/avatar-min.png';

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          priority={true}
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={onSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton} disabled={isPending}>
              {isPending ? 'Saving…' : 'Save'}
            </button>
            <button type="button" className={css.cancelButton} onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
