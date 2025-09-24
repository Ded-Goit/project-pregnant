'use client';

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import styles from './Preloader.module.css';

type LottieAnimation = Record<string, unknown>;

export default function Preloader() {
  const [animationData, setAnimationData] = useState<LottieAnimation | null>(
    null
  );
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetch('/animations/stork-baby.json')
      .then((res) => res.json())
      .then((data: LottieAnimation) => setAnimationData(data));

    const timer = setTimeout(() => setIsVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible || !animationData) return null;

  return (
    <div className={styles.preloader}>
      <Lottie
        animationData={animationData}
        loop={true}
        className={styles.stork}
      />
    </div>
  );
}
