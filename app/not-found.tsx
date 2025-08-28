
import css from './not-found.module.css'
import Link from 'next/link';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | NoteHub',
  description: 'The page you are looking for does not exist. Please check the URL or return to the homepage.',
   alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Page Not Found | NoteHub',
    description: 'The page you are looking for does not exist. Please check the URL or return to the homepage.',
    url: '/not-found',
    images: [
      {
        url: '../public/page_404.jpg',
        width: 1200,
        height: 630,
        alt: '404 Page Not Found',
      },
    ],
  },
};

const NotFound = () => {
    return ( 
    <div className={css.container}>
      <h1 className={css.errorCode}>404</h1>
      <h2 className={css.title}>Page Not Found</h2>
      <p className={css.description}>
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link href="/" className={css.homeButton}>
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;