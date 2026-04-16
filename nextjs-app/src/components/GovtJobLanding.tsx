/* eslint-disable @next/next/no-img-element -- match static Stitch markup (plain <img>) */
const IMG_1 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAcjwqKtU23wBdRniXT1pohyg4aU1t9-QYBBP_0xQiY-ApuklJ_6WZ3-e1opzj1kFTD5WOxnoUxDe_kOkmJ1IKEiM40WrgkkSGwGbgtk_CJnBiBdJqlnr31uI1ED6uqW9AIr-zo7ZCxekWF2QJSLU5v3V-sQFWGc1Q7X3jymH4bNafhTMTGL3hUVazCrH_sB7iXmoxhIz9llk87CbVXDaN0UXbY-60krFVEV2QSfGAqqWbvS_qXk0d7LGUi1QwEtbFfumwsLudUjXI";
const IMG_2 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAoZncx5dFz4PbWlhMhH5_GZosJEwMnrm5ga_dsesvP9J6Ad9Z_UuXcRmaFQBDaJuc-CQhhEKHZ0gVNASF5vegYc1OvpaBWrsXewqetI9yZhiNSdPxRAMnk9zffCw8UTaxdSzMRWG-gvmTIqVOUAa90UB87ZKoeMl2IKf-fd8Gyf3YdirLdT2bh3fh8y04IvVmfyhP2DRR29sxcxKYHAh50jtukzLzWRKCl06A-XguZ4gwkIfrUkC5Mzo_-tryBLJ4G91xDa8p_R7g";
const IMG_3 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAPCchjHY6zHpjdu1No23DXssrGo6akDFjix0MW4e-de_WCOuiEZvXPhGfKP3dT3qK9DwLuOytq20hthLor30vHEito2qFY-4f4wFfLsQQuct7U9AbfKygbcEAB6rOXErgvmShFmi2WxMsPCkPuBvrRIsfGeI1OXGWlIo9OR_ymV0lIPzBW9Wx1IKmV5KeNoajmxn1Ob0h0AAGHW4oyPzx8oKt9lc0pB4v-zSgHvqma0p_4vkMWkShs38pWdtkijhDOnsF5QPp9cCw";

export default function GovtJobLanding() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-background-dark md:px-20">
          <div className="flex items-center gap-3">
            <div className="text-primary">
              <span className="material-symbols-outlined text-4xl">
                account_balance
              </span>
            </div>
            <h2 className="text-xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white">
              GovtJob<span className="text-primary">Simplified</span>
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <nav className="hidden items-center gap-8 lg:flex">
              <a
                className="text-sm font-semibold text-slate-700 transition-colors hover:text-primary dark:text-slate-300"
                href="#"
              >
                How it Works
              </a>
              <a
                className="text-sm font-semibold text-slate-700 transition-colors hover:text-primary dark:text-slate-300"
                href="#"
              >
                Browse Jobs
              </a>
              <a
                className="text-sm font-semibold text-slate-700 transition-colors hover:text-primary dark:text-slate-300"
                href="#"
              >
                About
              </a>
            </nav>
            <div className="flex gap-3">
              <a
                href="/register"
                className="flex h-10 min-w-[100px] cursor-pointer items-center justify-center rounded-lg bg-primary px-5 text-sm font-bold text-white shadow-md transition-all hover:bg-primary/90"
              >
                <span>Sign up</span>
              </a>
              <a
                href="/login"
                className="hidden h-10 min-w-[84px] cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-slate-100 px-4 text-sm font-bold text-slate-900 transition-all hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white sm:flex"
              >
                <span>Login</span>
              </a>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <div className="bg-gradient-to-b from-white to-background-light px-6 py-12 dark:from-background-dark dark:to-background-dark md:px-20 md:py-24">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row">
              <div className="flex flex-1 flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                    <span className="material-symbols-outlined text-sm">
                      bolt
                    </span>{" "}
                    AI-Powered Job Matching
                  </div>
                  <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white md:text-6xl">
                    Your Career in Government,{" "}
                    <span className="text-primary">Simplified</span>
                  </h1>
                  <p className="max-w-xl text-lg font-medium leading-relaxed text-slate-600 dark:text-slate-400 md:text-xl">
                    Revolutionizing government job applications with OCR-driven
                    profile building and one-click submissions. No more manual
                    data entry.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <button
                    type="button"
                    className="flex h-14 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-lg font-bold text-white shadow-xl shadow-primary/20 transition-transform hover:scale-[1.02]"
                  >
                    <span className="material-symbols-outlined">
                      upload_file
                    </span>
                    <span>Upload PDF to Start</span>
                  </button>
                  <button
                    type="button"
                    className="flex h-14 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-8 text-lg font-bold text-slate-900 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <span>Watch Demo</span>
                  </button>
                </div>
                <div className="flex items-center gap-6 border-t border-slate-200 pt-4 dark:border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                      50k+
                    </span>
                    <span className="text-sm text-slate-500">Jobs Indexed</span>
                  </div>
                  <div className="h-8 w-px bg-slate-200 dark:border-slate-800" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                      99%
                    </span>
                    <span className="text-sm text-slate-500">OCR Accuracy</span>
                  </div>
                  <div className="h-8 w-px bg-slate-200 dark:border-slate-800" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                      100+
                    </span>
                    <span className="text-sm text-slate-500">Departments</span>
                  </div>
                </div>
              </div>
              <div className="relative w-full max-w-[600px] flex-1">
                <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-success/10 blur-3xl" />
                <div className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="size-3 rounded-full bg-red-400" />
                      <div className="size-3 rounded-full bg-yellow-400" />
                      <div className="size-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Profile Generator
                    </span>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-6">
                      <span className="material-symbols-outlined text-4xl text-primary">
                        description
                      </span>
                      <p className="text-sm font-bold text-primary">
                        Resume_John_Doe.pdf
                      </p>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <div className="h-full w-3/4 bg-primary" />
                      </div>
                      <span className="text-xs font-medium text-slate-500">
                        OCR Scanning in progress...
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-success/20 bg-success/10 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-success text-white">
                          <span className="material-symbols-outlined">
                            verified
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            Match Score
                          </p>
                          <p className="text-xs text-slate-500">
                            Senior Admin Officer
                          </p>
                        </div>
                      </div>
                      <span className="text-xl font-black text-success">98%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white px-6 py-20 dark:bg-background-dark md:px-20">
            <div className="mx-auto max-w-7xl">
              <div className="mb-16 flex flex-col gap-4 text-center">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-primary">
                  The Process
                </h2>
                <h3 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Three simple steps to your dream career
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="group flex flex-col gap-6 rounded-2xl border border-slate-100 bg-background-light p-8 transition-colors hover:border-primary/50 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/30 transition-transform group-hover:scale-110">
                    <span className="material-symbols-outlined text-3xl">
                      cloud_upload
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                      Smart Upload
                    </h4>
                    <p className="font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                      Our advanced AI scans your certificates and CV to extract
                      verified qualifications instantly.
                    </p>
                  </div>
                </div>
                <div className="group flex flex-col gap-6 rounded-2xl border border-slate-100 bg-background-light p-8 transition-colors hover:border-success/50 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-success text-white shadow-lg shadow-success/30 transition-transform group-hover:scale-110">
                    <span className="material-symbols-outlined text-3xl">
                      query_stats
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                      Instant Matching
                    </h4>
                    <p className="font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                      Get matched with positions across hundreds of departments
                      based on your precise eligibility criteria.
                    </p>
                  </div>
                </div>
                <div className="group flex flex-col gap-6 rounded-2xl border border-slate-100 bg-background-light p-8 transition-colors hover:border-primary/50 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/30 transition-transform group-hover:scale-110">
                    <span className="material-symbols-outlined text-3xl">
                      touch_app
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                      One-Click Apply
                    </h4>
                    <p className="font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                      No more repetitive forms. Submit your verified profile to
                      multiple government portals with a single click.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-20 md:px-20">
            <div className="mx-auto max-w-7xl">
              <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div className="flex flex-col gap-2">
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Personalized Opportunities
                  </h2>
                  <p className="font-medium text-slate-600 dark:text-slate-400">
                    Based on your profile, these positions match your
                    qualifications best.
                  </p>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-2 font-bold text-primary hover:underline"
                >
                  View all jobs{" "}
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <div className="group relative h-48 overflow-hidden bg-slate-200">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent" />
                    <img
                      alt="Modern government building office interior workspace"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={IMG_1}
                    />
                    <div className="absolute left-4 top-4 z-20">
                      <span className="rounded-full bg-success px-3 py-1 text-xs font-black text-white shadow-lg">
                        98% MATCH
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 z-20 text-white">
                      <p className="text-xs font-bold uppercase tracking-wider opacity-80">
                        Full-Time
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 p-6">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                        Senior Administrative Officer
                      </h4>
                      <p className="flex items-center gap-1 text-sm font-medium text-slate-500">
                        <span className="material-symbols-outlined text-sm">
                          account_balance
                        </span>{" "}
                        Department of Revenue
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                      <span className="font-black text-slate-900 dark:text-white">
                        ₹50000 - ₹1 Lakh
                      </span>
                      <button
                        type="button"
                        className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white"
                      >
                        Quick Apply
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <div className="group relative h-48 overflow-hidden bg-slate-200">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent" />
                    <img
                      alt="Clean minimal technology office background"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={IMG_2}
                    />
                    <div className="absolute left-4 top-4 z-20">
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-black text-white shadow-lg">
                        85% MATCH
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 z-20 text-white">
                      <p className="text-xs font-bold uppercase tracking-wider opacity-80">
                        Remote Friendly
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 p-6">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                        Technical Assistant
                      </h4>
                      <p className="flex items-center gap-1 text-sm font-medium text-slate-500">
                        <span className="material-symbols-outlined text-sm">
                          precision_manufacturing
                        </span>{" "}
                        Ministry of Technology
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                      <span className="font-black text-slate-900 dark:text-white">
                        ₹66000
                      </span>
                      <button
                        type="button"
                        className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white"
                      >
                        Quick Apply
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <div className="group relative h-48 overflow-hidden bg-slate-200">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent" />
                    <img
                      alt="Corporate planning and analysis background"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={IMG_3}
                    />
                    <div className="absolute left-4 top-4 z-20">
                      <span className="rounded-full bg-success px-3 py-1 text-xs font-black text-white shadow-lg">
                        92% MATCH
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 z-20 text-white">
                      <p className="text-xs font-bold uppercase tracking-wider opacity-80">
                        Contract
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 p-6">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                        Policy Analyst
                      </h4>
                      <p className="flex items-center gap-1 text-sm font-medium text-slate-500">
                        <span className="material-symbols-outlined text-sm">
                          engineering
                        </span>{" "}
                        Public Works Department
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                      <span className="font-black text-slate-900 dark:text-white">
                        ₹1.5 Lakh
                      </span>
                      <button
                        type="button"
                        className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white"
                      >
                        Quick Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-primary px-6 py-20 dark:bg-primary/20 md:px-20">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
              <h2 className="text-4xl font-black leading-tight text-white md:text-5xl">
                Ready to transform your career application experience?
              </h2>
              <p className="max-w-2xl text-lg font-medium text-white/80">
                Join thousands of successful candidates who used GovtJobSimplified
                to land their dream government position in record time.
              </p>
              <a
                href="/register"
                className="flex h-16 cursor-pointer items-center justify-center rounded-xl bg-white px-10 text-xl font-black text-primary shadow-2xl transition-transform hover:scale-105"
              >
                Get Started for Free
              </a>
            </div>
          </div>
        </main>
        <footer className="bg-slate-900 px-6 py-12 text-slate-400 md:px-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
            <div className="col-span-1 flex flex-col gap-6 md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="text-primary">
                  <span className="material-symbols-outlined text-3xl">
                    account_balance
                  </span>
                </div>
                <h2 className="text-lg font-extrabold text-white">
                  GovtJobSimplified
                </h2>
              </div>
              <p className="text-sm leading-relaxed">
                Automating government careers applications with our cutting-edge
                OCR and AI matching technology.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">
                Platform
              </h4>
              <a className="transition-colors hover:text-white" href="#">
                Find Jobs
              </a>
              <a className="transition-colors hover:text-white" href="#">
                OCR Profile Builder
              </a>
              <a className="transition-colors hover:text-white" href="#">
                Department Network
              </a>
              <a className="transition-colors hover:text-white" href="#">
                Success Stories
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">
                Support
              </h4>
              <a className="transition-colors hover:text-white" href="#">
                Documentation
              </a>
              <a className="transition-colors hover:text-white" href="#">
                Application Tips
              </a>
              <a className="transition-colors hover:text-white" href="#">
                Contact Support
              </a>
              <a className="transition-colors hover:text-white" href="#">
                FAQs
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">
                Legal
              </h4>
              <a className="transition-colors hover:text-white" href="#">
                Privacy Policy
              </a>
              <a className="transition-colors hover:text-white" href="#">
                Terms of Service
              </a>
              <a className="transition-colors hover:text-white" href="#">
                Cookie Policy
              </a>
              <a className="transition-colors hover:text-white" href="#">
                Compliance
              </a>
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-7xl border-t border-slate-800 pt-12 text-center text-xs">
            © 2024 GovtJobSimplified Inc. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
