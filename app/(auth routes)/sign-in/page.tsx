'use client';

import { logIn, LoginRequestData } from '@/lib/api/clientApi'
import { useAuthStore } from '@/lib/store/authStore'
import { useRouter } from 'next/navigation'

import css from './SignInPage.module.css'
import { useState } from 'react';
import { ApiError } from '@/app/api/api';

const SignIn = () => {

    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setUser)
    const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    try {
      const data = Object.fromEntries(formData) as LoginRequestData
      const user = await logIn(data)
      if (user) {
      setAuth(user)
      router.push('/profile')
      }else {
        setError('Invalid email or password');
      }
    } catch (error) {
    setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error'
      )
  }};

  return (
    <><main className={css.mainContent}>
 <form className={css.form} action={handleSubmit}>
    <h1 className={css.formTitle}>Sign in</h1>

    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={css.input} required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton}>
        Log in
      </button>
    </div>

     {error && <p className={css.error}>{error}</p>}
  </form>
</main>
</>
  );
};

export default SignIn;
