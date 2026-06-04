import { createFileRoute, Link } from '@tanstack/react-router';
import styles from './../styles/notfound.module.scss';
export const Route = createFileRoute('/$')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>

        <h2 className={styles.title}>Page Not Found</h2>

        <p className={styles.description}>
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <Link to="/" className={styles.button}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
