"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/** Redirects to /login when `loggedIn` is not set (same convention as dashboard). */
export function useRequireAuth(): boolean {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("loggedIn") !== "true") {
      router.replace("/login");
      return;
    }
    queueMicrotask(() => setOk(true));
  }, [router]);

  return ok;
}
