'use client';

import React from 'react';
import styles from './Tags.module.css';

interface Tag {
  label: string;
  closable?: boolean;
}

interface TagsProps {
  tags: Tag[];
  onClose?: (label: string) => void;
}

export default function Tags({ tags, onClose }: TagsProps) {
  return (
    <div className={styles.tagsWrapper}>
      {tags.map((tag, index) => (
        <span key={index} className={styles.tag}>
          {tag.label}
          {tag.closable && onClose && (
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => onClose(tag.label)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 5L5 11M5 5L11 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </span>
      ))}
    </div>
  );
}
