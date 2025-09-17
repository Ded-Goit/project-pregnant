import styles from './SpinnerFlowersLine.module.css';

export default function SpinnerFlowersLine() {
  const sizes = [8, 14, 20, 26, 32, 26, 20, 14, 8];

  return (
    <div className={styles.container}>
      {sizes.map((size, i) => {
        // знаходимо центр масиву
        const center = Math.floor(sizes.length / 2);
        // відстань від центру
        const delay = Math.abs(i - center) * 0.2;

        return (
          <span
            key={i}
            className={styles.flower}
            style={{
              fontSize: `${size}px`,
              animationDelay: `${delay}s`,
            }}
          >
            🌸
          </span>
        );
      })}
    </div>
  );
}
