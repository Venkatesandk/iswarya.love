"use client";

import { useState, useEffect } from "react";
import { LockedCountdownScreen } from "@/components/LockedCountdownScreen";
import { ApprovedUniverseView } from "@/components/ApprovedUniverseView";
import { getKolkataDateInfo } from "@/lib/dailyLoveUtils";

export default function Home({
  searchParams,
}: {
  searchParams?: { date?: string; preview?: string };
}) {
  const initialDate = searchParams?.date;
  const initialUnlock = searchParams?.preview === "unlocked";

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [manualUnlock, setManualUnlock] = useState(initialUnlock);
  const [overrideDateKey, setOverrideDateKey] = useState<string | undefined>(initialDate);

  // Check URL parameters on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const dateParam = params.get("date");
      if (dateParam) {
        setOverrideDateKey(dateParam);
      }
      const previewParam = params.get("preview");
      if (previewParam === "unlocked") {
        setManualUnlock(true);
      }
    }
  }, []);

  // Real-time automatic unlock listener for 14 October 2026 00:00 IST
  useEffect(() => {
    const checkStatus = () => {
      const info = getKolkataDateInfo();
      if (info.isUnlocked) {
        setIsUnlocked(true);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUnlock = () => {
    setManualUnlock(true);
  };

  const siteIsUnlocked = isUnlocked || manualUnlock;

  // 1. LOCKED STATE: Before 14 October 2026, 00:00 IST
  // Main surprise, photographs, memories, and gift content are strictly hidden
  if (!siteIsUnlocked) {
    return (
      <LockedCountdownScreen
        onUnlock={handleUnlock}
        overrideDateKey={overrideDateKey}
        onOverrideChange={setOverrideDateKey}
      />
    );
  }

  // 2. UNLOCKED STATE: From 14 October 2026 00:00 IST onwards (or via Admin Unlock / preview=unlocked)
  // Displays the Approved Design requested by the user
  return <ApprovedUniverseView />;
}
