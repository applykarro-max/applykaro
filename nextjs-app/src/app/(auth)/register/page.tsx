"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../login/login.module.css";

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      username: String(formData.get("username") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let message = "We could not create your account. Please try again.";
        try {
          const errorBody = (await response.json()) as { message?: string };
          if (errorBody?.message?.toLowerCase().includes("already exists")) {
            message = "An account already exists with that email or username.";
          }
        } catch {
          // Keep friendly default message.
        }
        throw new Error(message);
      }

      setStatusMessage("Account created successfully. You can sign in now.");
      form.reset();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to register.";
      setStatusMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <span className={styles.materialSymbol}>account_balance</span>
          </div>
          <h2 className={styles.brandTitle}>GovtJobSimplified</h2>
        </div>
        <div className={styles.headerRight}>
          <nav className={styles.nav}>
            <Link className={styles.navLink} href="#">
              How it Works
            </Link>
            <Link className={styles.navLink} href="#">
              About
            </Link>
          </nav>
          <Link className={styles.signupButton} href="/login">
            Sign In
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.left}>
            <div>
              <h1 className={styles.title}>Create Account</h1>
              <p className={styles.subtitle}>
                Join thousands of candidates applying with a verified profile.
              </p>
            </div>

            <div className={styles.socialGroup}>
              <button className={styles.socialButton} type="button">
                <img
                  className={styles.googleIcon}
                  alt="Google Logo"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAhUKaByk92wkPf5WbR9JJetS3Nvf4uwM8QWi97Mm2TzkuTEomdIC98pGLTHyFmP6a8pguaLeC4G3Y63uNsV_uO-QfTffxzkVU24eR3Wn-QDxJjkRRbSqdM2lQe6hWjfowFzSrSuyOcbVAe1qfSGysSb08Rnaru0uWaQPB2A-YQtQHFHFZqKtaFlpdZSbXVAObbtXMSpZ9o7V_CUfI-X19li5pE9QeiBV1w2-BIbVCJ05D_soXUeQptHKRtk3qi0iz39xRV8Mbdts"
                />
                Continue with Google
              </button>
              <button className={styles.socialButton} type="button">
                <span className={styles.materialSymbol}>fingerprint</span>
                Sign up with Aadhaar
              </button>
            </div>

            <div className={styles.divider}>
              <span>Or Email Address</span>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div>
                <label className={styles.label} htmlFor="username">
                  Username
                </label>
                <input
                  className={styles.input}
                  id="username"
                  name="username"
                  type="text"
                  placeholder="boss123"
                  required
                />
              </div>

              <div>
                <label className={styles.label} htmlFor="email">
                  Email Address
                </label>
                <input
                  className={styles.input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <label className={styles.label} htmlFor="password">
                  Password
                </label>
                <input
                  className={styles.input}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  required
                />
              </div>

              <button
                className={styles.submit}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
              {statusMessage ? (
                <p className={styles.statusMessage}>{statusMessage}</p>
              ) : null}
            </form>

            <p className={styles.footerNote}>
              Already have an account? <Link href="/login">Sign in</Link>
            </p>
          </div>

          <div className={styles.right}>
            <div className={styles.glowTop} />
            <div className={styles.glowBottom} />
            <div className={styles.rightContent}>
              <div className={styles.badge}>
                <span className={styles.materialSymbol}>verified_user</span>
                <span>AI-POWERED RECRUITMENT</span>
              </div>
              <div className={styles.featureStack}>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>
                    <span className={styles.materialSymbol}>description</span>
                  </div>
                  <div>
                    <h3 className={styles.featureTitle}>
                      OCR-Driven Profile Building
                    </h3>
                    <p className={styles.featureText}>
                      Upload your ID and certificates. We automatically extract
                      details and build your verified profile in seconds.
                    </p>
                  </div>
                </div>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>
                    <span className={styles.materialSymbol}>ads_click</span>
                  </div>
                  <div>
                    <h3 className={styles.featureTitle}>
                      One-Click Applications
                    </h3>
                    <p className={styles.featureText}>
                      Stop filling the same forms. Apply to multiple government
                      departments with a single verified profile.
                    </p>
                  </div>
                </div>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>
                    <span className={styles.materialSymbol}>groups</span>
                  </div>
                  <div>
                    <h3 className={styles.featureTitle}>
                      Join 50,000+ Candidates
                    </h3>
                    <p className={styles.featureText}>
                      Be part of India&apos;s fastest growing network for
                      streamlined government job placements.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.testimonial}>
              <p className={styles.testimonialText}>
                &quot;The Aadhaar integration made verification so simple. I
                applied to 5 jobs in under 10 minutes!&quot;
              </p>
              <div className={styles.testimonialFooter}>
                <div className={styles.avatar}>
                  <img
                    alt="Candidate profile"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiYDx8-vidf6VzDgBCgpgKVudoAoB-ZeRSaH8Upd4uimdu3DMb9D27naeC-V6bOB4_auu4btU4k_7ynfB6gMxdaGl2nE1TNR8jJ0LizkEGUz6SNz3hSs2vu-DzFg8K-ELXzGoKYrJSSyqAy27W4z9c3zZ4MZoiruI-aVIS2VJ-j0xKYFd4KrMz_Rg4l7f5nDQtXX2FXobszOWcsxO6aJQNcBpro901TojIDHw0gEcShjhIZ5pnxgvNEE4w-McqO_nHyLqdpK94xEg"
                  />
                </div>
                <div>
                  <p className={styles.testimonialName}>Rahul Sharma</p>
                  <p className={styles.testimonialRole}>
                    Junior Engineer Applicant
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Help Center</Link>
        </div>
        <p>
          © 2024 GovtJobSimplified. All rights reserved. Secure 256-bit SSL
          Encryption.
        </p>
      </footer>
    </div>
  );
}
