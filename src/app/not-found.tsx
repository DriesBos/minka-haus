import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h1>404 - Page Not Found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist in Storyblok.</p>
      <Link
        href="/"
        style={{
          marginTop: '20px',
          textDecoration: 'underline',
        }}
      >
        Go back home
      </Link>
    </div>
  );
}
