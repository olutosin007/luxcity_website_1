import { doc, getDoc, runTransaction } from 'firebase/firestore';
import { getFirebaseDb } from '../lib/firebase';

const ANALYTICS_COLLECTION = 'insights_analytics';

function toDocId(slug: string): string {
  return slug.replace(/\s+/g, '-').toLowerCase();
}

function normalizeReferrer(referrer: string): string {
  if (!referrer || referrer.trim() === '') return 'direct';
  try {
    const url = new URL(referrer);
    return url.hostname.replace(/^www\./, '') || 'direct';
  } catch {
    return 'direct';
  }
}

export interface InsightsAnalyticsData {
  viewCount: number;
  referrers: Record<string, number>;
  lastUpdated: string;
}

/** Record one view for a post (call once per session per post). */
export async function recordView(slug: string, referrer: string): Promise<void> {
  const db = getFirebaseDb();
  if (!db) return;
  const docId = toDocId(slug);
  const ref = doc(db, ANALYTICS_COLLECTION, docId);
  const source = normalizeReferrer(referrer);

  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const current: { viewCount: number; referrers: Record<string, number> } = snap.exists()
      ? {
          viewCount: (snap.data()?.viewCount as number) ?? 0,
          referrers: (snap.data()?.referrers as Record<string, number>) ?? {},
        }
      : { viewCount: 0, referrers: {} };
    const newReferrers = { ...current.referrers };
    newReferrers[source] = (newReferrers[source] ?? 0) + 1;
    tx.set(ref, {
      viewCount: current.viewCount + 1,
      referrers: newReferrers,
      lastUpdated: new Date().toISOString(),
    });
  });
}

/** Get analytics for a post (admin only). */
export async function getAnalytics(slug: string): Promise<InsightsAnalyticsData | null> {
  const db = getFirebaseDb();
  if (!db) return null;
  const docId = toDocId(slug);
  const snap = await getDoc(doc(db, ANALYTICS_COLLECTION, docId));
  if (!snap.exists()) return null;
  const d = snap.data();
  return {
    viewCount: (d.viewCount as number) ?? 0,
    referrers: (d.referrers as Record<string, number>) ?? {},
    lastUpdated: (d.lastUpdated as string) ?? '',
  };
}
