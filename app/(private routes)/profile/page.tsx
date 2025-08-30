import css from './ProfilePage.module.css'
import Link from 'next/link';
import { getServerMe } from '@/lib/api/serverApi';
import Image from 'next/image';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();
  const username = user.username.split('@')[0];

  return {
    title: `${username} | Profile — NoteHub`,
    description: `Profile page of ${username} on NoteHub. View and manage your account details.`,
    openGraph: {
      title: `${username} | Profile — NoteHub`,
      description: `Profile page of ${username} on NoteHub. View and manage your account details.`,
      url: '/profile',
      siteName: 'NoteHub',
      images: [
        {
          url: user.avatar || '/avatar-min.png',
          width: 1200,
          height: 630,
          alt: `${username}'s avatar`,
        },
      ],
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${username} | Profile — NoteHub`,
      description: `Profile page of ${username} on NoteHub.`,
      images: [user.avatar || '/avatar-min.png'],
    }
  };
}
const Profile = async () => {
  const user = await getServerMe();

  return (
    <section>
      <main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	     <Link href='/profile/edit' className={css.editProfileButton}>
	       Edit Profile
	     </Link>
	   </div>
     <div className={css.avatarWrapper}>
            <Image
              src={user.avatar}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username: {user.username.split('@')[0]}
      </p>
      <p>
        Email: {user.email}
      </p>
    </div>
  </div>
</main>
    </section>
  );
};

export default Profile;
