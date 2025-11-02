'use client';

import { FormEvent, useState, useEffect, useRef } from 'react';
import styles from './Newsletter.module.sass';

export default function Newsletter() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when active becomes true
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  // Reset to initial state after 5 seconds when message appears
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setIsActive(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  // Reset to initial state if active but no input for 5 seconds
  useEffect(() => {
    if (isActive && !inputValue && !message) {
      const timer = setTimeout(() => {
        setIsActive(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isActive, inputValue, message]);

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

    setMessage('Thank you!');
    setIsLoading(false);
    // Reset form and input value
    e.currentTarget.reset();
    setInputValue('');
    return data;
  };

  return (
    <div className={styles.newsletter}>
      {/* Initially show Newsletter button */}
      {!isActive ? (
        <button
          onClick={() => setIsActive(true)}
          className={styles.activateButton}
        >
          Newsletter
        </button>
      ) : message ? (
        <p className={styles.message}>{message}</p>
      ) : (
        <form onSubmit={subscribeUser} className={styles.form}>
          <div className={styles.inputWrapper}>
            <input
              ref={inputRef}
              name="email"
              type="email"
              placeholder="Enter your email"
              className={styles.input}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Submitting' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
}
