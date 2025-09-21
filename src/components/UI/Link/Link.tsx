'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Link.module.css';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function CustomLink({
  href,
  children,
  disabled = false,
}: LinkProps) {
  if (disabled) {
    return (
      <span className={styles.link} style={{ opacity: 0.3 }}>
        {children}
      </span>
    );
  }

  return (
    <Link href={href} className={styles.link}>
      {children}
    </Link>
  );
}
