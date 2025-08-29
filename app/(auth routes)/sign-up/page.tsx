'use client'

import { register, type RegisterRequestData } from '@/lib/api/clientApi'
import { useAuthStore } from '@/lib/store/authStore'
import { useRouter } from 'next/navigation'
import { ApiError } from '@/app/api/api'

import css from './SignUpPage.module.css'
import { useState } from 'react'

const SignUp = () => {
    const router = useRouter()
    const [error, setError] = useState('');
    const setAuth = useAuthStore((state) => state.setUser)

    const handleSubmit = async (formData: FormData) => {
    try {
        const data = Object.fromEntries(formData) as RegisterRequestData
    const res = await register(data)
    if (res) {
      setAuth(res)
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
    }
    
    }
    
    return(<><main className={css.mainContent}>
  <h1 className={css.formTitle}>Sign up</h1>
	<form className={css.form} action={handleSubmit}>
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
        Register
      </button>
            </div>
            {error && <p className={css.error}>{error}</p>}
        </form>
</main>
</>)
}

export default SignUp;