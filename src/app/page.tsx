'use client';

import dynamic from 'next/dynamic';

const PFive = dynamic(() => import('../components/PFive'), {
  ssr: false,
});

export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
        padding: '20px',
      }}
    >
      <h1
        style={{
          color: '#333',
          marginBottom: '20px',
          fontFamily: 'Arial, sans-serif',
          fontSize: '2rem',
        }}
      >
        p5.js Interactive Demo
      </h1>
      <p
        style={{
          color: '#666',
          marginBottom: '30px',
          textAlign: 'center',
          maxWidth: '600px',
          fontSize: '1.1rem',
        }}
      >
        Move your mouse around to see the eyes follow your cursor. This
        demonstrates the use of the <code>atan2()</code> function to calculate
        angles between two positions.
      </p>
      <PFive />
    </div>
  );
}
