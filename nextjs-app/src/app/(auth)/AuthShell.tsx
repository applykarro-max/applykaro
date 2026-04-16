import Link from "next/link";
import styles from "./auth.module.css";

type AuthShellProps = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export default function AuthShell({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className={styles.page} suppressHydrationWarning>
      <header className={styles.header}>
        <Link className={styles.brand} href="/">
          <span className={styles.brandIcon} aria-hidden>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 3 3 8v2h18V8l-9-5Zm-7 9v7h3v-7H5Zm5 0v7h4v-7h-4Zm6 0v7h3v-7h-3ZM3 20v2h18v-2H3Z"
              />
            </svg>
          </span>
          <span>GovtJobSimplified</span>
        </Link>
        <div className={styles.headerActions}>
          <nav className={styles.nav}>
            <Link href="/how-it-works">How it Works</Link>
            <Link href="/about">About</Link>
          </nav>
          <Link className={styles.cta} href={ctaHref}>
            {ctaLabel}
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.shell}>
          <section className={styles.card}>
            <div className={styles.formHeader}>
              <h1>{title}</h1>
              <p>{subtitle}</p>
            </div>
            {children}
            <div className={styles.formFooter}>{footer}</div>
          </section>

          <aside className={styles.aside}>
            <div className={styles.asideBadge}>
              <span className={styles.badgeIcon} aria-hidden>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2 4 5v6c0 5.5 3.8 9.7 8 11 4.2-1.3 8-5.5 8-11V5l-8-3Zm0 4.1 4 1.6V11c0 3.3-2.2 6.2-4 7.1-1.8-.9-4-3.8-4-7.1V7.7l4-1.6Z"
                  />
                </svg>
              </span>
              AI-POWERED RECRUITMENT
            </div>
            <div className={styles.featureList}>
              <div className={styles.feature}>
                <span className={styles.featureIcon} aria-hidden>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5"
                    />
                  </svg>
                </span>
                <div>
                  <h3>OCR-Driven Profile Building</h3>
                  <p>
                    Upload your ID and certificates. We automatically extract
                    details and build your verified profile in seconds.
                  </p>
                </div>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon} aria-hidden>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 6a6 6 0 0 1 6 6h2l-3 3-3-3h2a4 4 0 1 0-4 4 4 4 0 0 0 3.4-1.9l1.6 1.2A6 6 0 1 1 12 6Z"
                    />
                  </svg>
                </span>
                <div>
                  <h3>One-Click Applications</h3>
                  <p>
                    Stop filling the same forms. Apply to multiple government
                    departments with a single verified profile.
                  </p>
                </div>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon} aria-hidden>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M7 11a4 4 0 1 1 4-4 4 4 0 0 1-4 4Zm10 2a3 3 0 1 1 3-3 3 3 0 0 1-3 3ZM2 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1H2Zm12 0v-1a5 5 0 0 1 3-4.6 5 5 0 0 1 5 4.6v1Z"
                    />
                  </svg>
                </span>
                <div>
                  <h3>Join 50,000+ Candidates</h3>
                  <p>
                    Be part of India&apos;s fastest growing network for
                    streamlined government job placements.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.testimonial}>
              <p>
                &quot;The Aadhaar integration made verification so simple. I
                applied to 5 jobs in under 10 minutes!&quot;
              </p>
              <div className={styles.testimonialUser}>
                <span className={styles.avatar} aria-hidden>
                  RS
                </span>
                <div>
                  <strong>Rahul Sharma</strong>
                  <span>Junior Engineer Applicant</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Help Center</a>
        </div>
        <p>© 2024 GovtJobSimplified. All rights reserved.</p>
      </footer>
    </div>
  );
}
