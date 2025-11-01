'use client';

import { FormEvent, useState } from 'react';
import styles from './Newsletter.module.sass';

export default function Newsletter() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const subscribeUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');

    const response = await fetch('/api/newsletter/subscribe', {
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const json = await response.json();
    const { data, error } = json;

    if (error) {
      setIsLoading(false);
      setMessage(error);
      return;
    }

    setMessage('Successfully subscribed!');
    setIsLoading(false);
    // Reset form
    e.currentTarget.reset();
    return data;
  };

  return (
    <div className={styles.newsletter}>
      {message ? (
        <p className={styles.message}>{message}</p>
      ) : (
        <form onSubmit={subscribeUser} className={styles.form}>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className={styles.input}
            required
            disabled={isLoading}
          />
          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}
    </div>
  );
}
