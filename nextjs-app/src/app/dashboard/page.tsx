"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    router.push("/login");
  };

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.brand}>
              <div className={styles.brandIcon}>
                <span className={styles.materialSymbol}>shield_person</span>
              </div>
              <h2 className={styles.brandTitle}>GovtJobSimplified</h2>
            </div>
            <nav className={styles.nav}>
              <Link className={styles.navActive} href="#">
                Dashboard
              </Link>
              <Link className={styles.navLink} href="#">
                My Applications
              </Link>
              <Link className={styles.navLink} href="#">
                Browse Jobs
              </Link>
              <Link className={styles.navLink} href="/profile">
                My Documents
              </Link>
            </nav>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.notification}>
              <span className={styles.materialSymbol}>notifications</span>
              <span className={styles.notificationDot} />
            </div>
            <div className={styles.user}>
              <div className={styles.userInfo}>
                <p className={styles.userName}>Arjun Sharma</p>
                <p className={styles.userMeta}>Candidate ID: #9921</p>
              </div>
              <div className={styles.userAvatar}>
                <img
                  alt="User Portrait"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgavYkV1YKQ1ahljpJvYgy0hZ4EMCZJHfrz_nCzcKA41YhZiAWNC2XPlwnECgLnyYqyySpjSKtZ9FKkSDyjAea7mPzKovPg3dN_lBvXCPvNC_hDZRck7wK-WbEQCdqsZA8Md5MvFyTpmSlCBrAaNRpqGCBxGHSdk3TYyXDiTqsOOAxqpuSQxPnHzgb3Zx--FI_Mugp7FlEk3_qm9sB8u1ctEo1snI4V_HDxakvl8LMhXiz3TubDMjV5JuDPRF551oWIS3UV8iFQe0"
                />
              </div>
            </div>
            <button className={styles.logoutButton} onClick={handleLogout} type="button">
              Log out
            </button>
          </div>
        </header>

        <main className={styles.main}>
          <section className={styles.stats}>
            <article className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.statIconPrimary}`}>
                <span className={styles.materialSymbol}>description</span>
              </div>
              <div>
                <p className={styles.statLabel}>Active Applications</p>
                <div className={styles.statValueRow}>
                  <span className={styles.statValue}>4</span>
                  <span className={styles.statBadgeGreen}>+1 new</span>
                </div>
              </div>
            </article>
            <article className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.statIconOrange}`}>
                <span className={styles.materialSymbol}>pending_actions</span>
              </div>
              <div>
                <p className={styles.statLabel}>Pending Actions</p>
                <div className={styles.statValueRow}>
                  <span className={styles.statValue}>1</span>
                  <span className={styles.statBadgeOrange}>Requires Attention</span>
                </div>
              </div>
            </article>
            <article className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.statIconGreen}`}>
                <span className={styles.materialSymbol}>verified</span>
              </div>
              <div>
                <p className={styles.statLabel}>Matches Found</p>
                <div className={styles.statValueRow}>
                  <span className={styles.statValue}>12</span>
                  <span className={styles.statBadgePrimary}>New Today</span>
                </div>
              </div>
            </article>
          </section>

          <section className={styles.contentGrid}>
            <div className={styles.applications}>
              <div className={styles.sectionHeader}>
                <h3>Active Applications</h3>
                <button className={styles.sectionAction} type="button">
                  View All <span className={styles.materialSymbol}>arrow_forward</span>
                </button>
              </div>

              <div className={styles.applicationList}>
                <article className={styles.applicationCard}>
                  <div className={styles.applicationInner}>
                    <div className={styles.applicationLogo}>
                      <img
                        alt="Gov Dept Logo"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfj_ooregUYYXB4gFToWiU78M4jEjKlAT6lfLTe19yGpH2jShymDPb4zvj9W5aejGG7kOcR4_j4_vfQYJmIfADQz-MmT5lhN7pGkrLs_Ij7D5jZUTJ-AZvkteGRRkVcxkx8D-ugmXwck3ADcYS1KcNqhcsAmqvW06kFlxhDPpwAUhl2Xi5hjXXbRl7fJQvAlXxCg8g-B58SjhubuNcgNGf8LltoHOHOBYONaDw3l5sBOqPVo90O1ZWKNZO7doUgWDDnitMzqmHXYM"
                      />
                    </div>
                    <div className={styles.applicationBody}>
                      <h4>Staff Selection Commission (SSC)</h4>
                      <p>Combined Graduate Level Exam 2024</p>
                      <div className={styles.stepTrack}>
                        <div className={styles.stepLine} />
                        <div className={styles.stepLineActive} />
                        <span className={`${styles.materialSymbol} ${styles.stepComplete}`}>
                          check_circle
                        </span>
                        <span className={`${styles.materialSymbol} ${styles.stepComplete}`}>
                          check_circle
                        </span>
                        <span className={`${styles.materialSymbol} ${styles.stepActive}`}>
                          pending
                        </span>
                        <span className={`${styles.materialSymbol} ${styles.stepPending}`}>
                          circle
                        </span>
                        <span className={`${styles.materialSymbol} ${styles.stepPending}`}>
                          circle
                        </span>
                        <span className={`${styles.materialSymbol} ${styles.stepPending}`}>
                          circle
                        </span>
                        <span className={`${styles.materialSymbol} ${styles.stepPending}`}>
                          emoji_events
                        </span>
                      </div>
                      <div className={styles.stepLabels}>
                        <span>Applied</span>
                        <span className={styles.stepHighlight}>Admit Card</span>
                        <span>Result</span>
                      </div>
                    </div>
                    <div className={styles.applicationAction}>
                      <button className={styles.primaryButton} type="button">
                        <span className={styles.materialSymbol}>download</span>
                        Download Admit Card
                      </button>
                      <p className={styles.actionNote}>Exam Date: 12 Oct 2024</p>
                    </div>
                  </div>
                </article>

                <article className={`${styles.applicationCard} ${styles.applicationAttention}`}>
                  <div className={styles.applicationInner}>
                    <div className={styles.applicationLogo}>
                      <img
                        alt="Gov Dept Logo"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcL3_Rt_hSzeXWsk5rdQhgIRUteV7kXFEgx1TUkMR5SdBRNf23iuFkbejmgXjPyPauKQVksRTg4WVRFJsX14DDDpjbME3sjoiIl5evzImVQ3S2xisVhaYT1aD77GbVLez_Nc0-6zsBhwbhx3e-QvyvVgkkQwLqWo7oERRuPH08QfaxKDGVCvwzcCvOZImzB5z4Sp5tDFx8HHUb3FM8fS9dCqzPzHbhrtX7TnmZJKRL12xTiiGmC8YLD0cMdZOJGEutBfYKAUKAGB0"
                      />
                    </div>
                    <div className={styles.applicationBody}>
                      <div className={styles.applicationTitleRow}>
                        <h4>Railway Recruitment Board (RRB)</h4>
                        <span className={styles.attentionBadge}>Action Required</span>
                      </div>
                      <p>Junior Engineer (Mechanical) - CEN 03/2024</p>
                      <div className={styles.stepTrack}>
                        <div className={styles.stepLine} />
                        <div className={styles.stepLineShort} />
                        <span className={`${styles.materialSymbol} ${styles.stepComplete}`}>
                          check_circle
                        </span>
                        <span className={`${styles.materialSymbol} ${styles.stepWarning}`}>
                          draw
                        </span>
                        <span className={`${styles.materialSymbol} ${styles.stepPending}`}>
                          circle
                        </span>
                        <span className={`${styles.materialSymbol} ${styles.stepPending}`}>
                          circle
                        </span>
                        <span className={`${styles.materialSymbol} ${styles.stepPending}`}>
                          circle
                        </span>
                        <span className={`${styles.materialSymbol} ${styles.stepPending}`}>
                          circle
                        </span>
                        <span className={`${styles.materialSymbol} ${styles.stepPending}`}>
                          emoji_events
                        </span>
                      </div>
                      <div className={styles.stepLabels}>
                        <span className={styles.stepComplete}>Review</span>
                        <span className={styles.stepWarning}>Sign Form</span>
                        <span>Payment</span>
                      </div>
                    </div>
                    <div className={styles.applicationAction}>
                      <button className={styles.warningButton} type="button">
                        <span className={styles.materialSymbol}>edit</span>
                        Sign Application
                      </button>
                      <p className={styles.actionWarning}>Expires in 2 days</p>
                    </div>
                  </div>
                </article>

                <article className={styles.applicationCard}>
                  <div className={styles.applicationInner}>
                    <div className={styles.applicationLogo}>
                      <img
                        alt="Gov Dept Logo"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBylzoOq6olK8iy75wC_7RHyEQ-V047RuEycq6FonvjtElfZuzh1oVkDiJ8WgKcY4z4ecHSb28Ba8n6LwDFa7xS1mdkACShZ4dQPl9LfIIy8vci2izC7N4WR4w9VbdJJv8gwqMsBtqH28RC4rvL2rpDMzP8221x_QZhOsvkM0QVrKTFWJpySvl1a_HtamBDK1NjS_BIDwyp2scxtbMCn1r5bgnXkNkSSydDyqVvtMkSVyBq8_ZtCUY2YauZOYlxQMm1OwIZdHSHxok"
                      />
                    </div>
                    <div className={styles.applicationBody}>
                      <h4>UPSC - Civil Services 2024</h4>
                      <p>Assistant Commandant Entry</p>
                      <div className={styles.stepTrack}>
                        <div className={styles.stepLine} />
                        <div className={styles.stepLineFull} />
                        <span className={`${styles.materialSymbol} ${styles.stepComplete}`}>
                          check_circle
                        </span>
                        <span className={`${styles.materialSymbol} ${styles.stepComplete}`}>
                          check_circle
                        </span>
                        <span className={`${styles.materialSymbol} ${styles.stepComplete}`}>
                          check_circle
                        </span>
                        <span className={`${styles.materialSymbol} ${styles.stepComplete}`}>
                          check_circle
                        </span>
                        <span className={`${styles.materialSymbol} ${styles.stepComplete}`}>
                          check_circle
                        </span>
                        <span className={`${styles.materialSymbol} ${styles.stepComplete}`}>
                          check_circle
                        </span>
                        <span className={`${styles.materialSymbol} ${styles.stepComplete}`}>
                          emoji_events
                        </span>
                      </div>
                      <div className={styles.stepLabels}>
                        <span className={styles.stepComplete}>Completed</span>
                        <span className={styles.stepComplete}>Final Result Declared</span>
                      </div>
                    </div>
                    <div className={styles.applicationAction}>
                      <button className={styles.secondaryButton} type="button">
                        <span className={styles.materialSymbol}>visibility</span>
                        View Merit List
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.profileCard}>
                <div className={styles.profileHeader}>
                  <h4>Profile Health</h4>
                  <span className={styles.profileBadge}>OPTIMIZED</span>
                </div>
                <div className={styles.profileChart}>
                  <svg viewBox="0 0 36 36">
                    <path
                      className={styles.profileTrack}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeWidth="3"
                    />
                    <path
                      className={styles.profileProgress}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeDasharray="88, 100"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                  </svg>
                  <div className={styles.profileCenter}>
                    <span className={styles.profilePercent}>88%</span>
                    <span className={styles.profileText}>OCR Ready</span>
                  </div>
                </div>
                <div className={styles.profileList}>
                  <div className={styles.profileItem}>
                    <span>
                      <span className={`${styles.materialSymbol} ${styles.stepComplete}`}>
                        check_circle
                      </span>
                      Personal Details
                    </span>
                    <strong>Verified</strong>
                  </div>
                  <div className={styles.profileItem}>
                    <span>
                      <span className={`${styles.materialSymbol} ${styles.stepComplete}`}>
                        check_circle
                      </span>
                      Educational Records
                    </span>
                    <strong>6/6 Uploaded</strong>
                  </div>
                  <div className={styles.profileItem}>
                    <span>
                      <span className={`${styles.materialSymbol} ${styles.stepWarning}`}>
                        error
                      </span>
                      Experience Certificates
                    </span>
                    <strong className={styles.warningText}>1 Missing</strong>
                  </div>
                </div>
                <button className={styles.profileButton} type="button">
                  Complete Profile
                </button>
              </div>

              <div className={styles.recommended}>
                <h4>Recommended for You</h4>
                <div className={styles.recommendList}>
                  <article className={styles.recommendCard}>
                    <div className={styles.recommendHeader}>
                      <span className={styles.recommendBadge}>94% MATCH</span>
                      <span className={`${styles.materialSymbol} ${styles.bookmark}`}>
                        bookmark
                      </span>
                    </div>
                    <h5>ISRO Scientific Assistant</h5>
                    <p>Group B Non-Gazetted</p>
                    <div className={styles.recommendFooter}>
                      <span>
                        <span className={styles.materialSymbol}>location_on</span>
                        Bengaluru
                      </span>
                      <button type="button">One-Click Apply</button>
                    </div>
                  </article>
                  <article className={styles.recommendCard}>
                    <div className={styles.recommendHeader}>
                      <span className={`${styles.recommendBadge} ${styles.recommendBadgeGreen}`}>
                        89% MATCH
                      </span>
                      <span className={`${styles.materialSymbol} ${styles.bookmark}`}>
                        bookmark
                      </span>
                    </div>
                    <h5>SBI Probationary Officer</h5>
                    <p>2000+ Vacancies</p>
                    <div className={styles.recommendFooter}>
                      <span>
                        <span className={styles.materialSymbol}>location_on</span>
                        PAN India
                      </span>
                      <button type="button">One-Click Apply</button>
                    </div>
                  </article>
                  <article className={styles.recommendCard}>
                    <div className={styles.recommendHeader}>
                      <span className={styles.recommendBadge}>85% MATCH</span>
                      <span className={`${styles.materialSymbol} ${styles.bookmark}`}>
                        bookmark
                      </span>
                    </div>
                    <h5>RBI Grade B Officer</h5>
                    <p>Finance &amp; Management</p>
                    <div className={styles.recommendFooter}>
                      <span>
                        <span className={styles.materialSymbol}>location_on</span>
                        Mumbai
                      </span>
                      <button type="button">One-Click Apply</button>
                    </div>
                  </article>
                </div>
              </div>
            </aside>
          </section>
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <div className={styles.footerBrand}>
              <span className={styles.materialSymbol}>shield_person</span>
              <span>GovtJobSimplified</span>
            </div>
            <div className={styles.footerLinks}>
              <Link href="#">Help Center</Link>
              <Link href="#">Terms of Service</Link>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Support</Link>
            </div>
            <p className={styles.footerCopy}>
              © 2024 GJ Automation Tech. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
