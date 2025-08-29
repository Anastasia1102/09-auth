
'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { checkSession, getMe, logOut } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

type Props = { children: React.ReactNode };
const PRIVATE_PREFIXES = ['/profile', '/notes'];

export default function AuthProvider({ children }: Props) {
  const pathname = usePathname();
  const isPrivate = useMemo(
    () => PRIVATE_PREFIXES.some((p) => pathname?.startsWith(p)),
    [pathname]
  );

  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearIsAuthenticated);

  const [blocking, setBlocking] = useState(false); 

  useEffect(() => {
    let active = true;
    const syncAuth = async () => {
      if (isPrivate) setBlocking(true);
      try {
        const ok = await checkSession(); 
        if (!active) return;

        if (!ok) throw new Error('no-session');

        const user = await getMe(); 
        if (!active) return;
        setUser(user);
      } catch {
        try { await logOut(); } catch {}
        clearAuth();
        if (!active) return;
        if (isPrivate) setBlocking(true); else setBlocking(false);
        return;
      }
      if (isPrivate) setBlocking(false);
    };

    syncAuth();
    return () => { active = false; };
  }, [isPrivate, pathname, setUser, clearAuth]);

  if (isPrivate && blocking) {
    return (
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          minHeight: '40vh',
          fontSize: 16,
          opacity: 0.8,
        }}
      >
        Checking session…
      </div>
    );
  }

  return <>{children}</>;
}
