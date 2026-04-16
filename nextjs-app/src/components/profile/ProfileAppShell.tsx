import Link from "next/link";

const AVATAR_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAI8IVEXGM76y3TdDgCiZLMAn2Ckt7nspoIlbIoynsYZD4_lhkwiWVvX_DjUTJEPfUH_BjPiVjxPQ6udIVdlZMnHPoaktEdAd65UAgHBNEaNqFWQu34EAfT_uYpDM8FXX9Ez8C6YTpJ-WjwBT-UFS7zVcdnqdCs-MH72GwqHV_IF8fu6lVixEdTUHbpKjQnOkSW7OBD4FUfr-ULiq050aqnN4yeElcjxxbbvDyvI5NglRPqC17W_4s3BE0bvHUw2EgBzcwz0AHPyDM";

type ActiveNav = "dashboard" | "profile";

export default function ProfileAppShell({
  children,
  activeNav = "profile",
}: {
  children: React.ReactNode;
  activeNav?: ActiveNav;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background-light font-display text-slate-900 dark:bg-background-dark dark:text-slate-100">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 dark:border-slate-800 dark:bg-slate-900 lg:px-10">
        <div className="flex items-center gap-4">
          <div className="text-primary">
            <span className="material-symbols-outlined text-3xl">
              verified_user
            </span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
            GovtJobSimplified
          </h2>
        </div>
        <div className="flex flex-1 items-center justify-end gap-6">
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/dashboard"
              className={
                activeNav === "dashboard"
                  ? "border-b-2 border-primary py-1 text-sm font-semibold text-primary"
                  : "text-sm font-medium text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary"
              }
            >
              Dashboard
            </Link>
            <a
              href="#"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary"
            >
              Jobs
            </a>
            <Link
              href="/profile"
              className={
                activeNav === "profile"
                  ? "border-b-2 border-primary py-1 text-sm font-semibold text-primary"
                  : "text-sm font-medium text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary"
              }
            >
              Profile
            </Link>
            <a
              href="#"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary"
            >
              Settings
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined text-xl">
                notifications
              </span>
            </button>
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="User profile"
                src={AVATAR_SRC}
                className="h-full w-full object-cover"
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
