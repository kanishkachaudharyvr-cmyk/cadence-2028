import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  CadenceStorage, 
  DailyRecord, 
  StudyEntry, 
  TrackId, 
  AcademicMode, 
  ConfidenceLevel 
} from '../types/study';
import { 
  getAcademicPhase, 
  getRecommendedTracksForDate, 
  START_DATE, 
  GRADUATION_DATE 
} from '../utils/academicCalendarEngine';
import { TRACKS_INFO, TRACKS_ORDER } from '../data/tracksData';

const STORAGE_KEY = 'cadence_study_log_v1';

const INITIAL_STORAGE: CadenceStorage = {
  version: 1,
  theme: 'dark',
  records: {},
  dayOverrides: {},
};

export function useStudyStorage() {
  const [storage, setStorage] = useState<CadenceStorage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_STORAGE, ...parsed };
      }
    } catch (e) {
      console.error('Failed to load Cadence storage from localStorage:', e);
    }
    return INITIAL_STORAGE;
  });

  // Save to localStorage immediately on any state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
    } catch (e) {
      console.error('Failed to save Cadence storage:', e);
    }
  }, [storage]);

  // Sync theme
  useEffect(() => {
    const root = document.documentElement;
    if (storage.theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [storage.theme]);

  // Get or compute record for a specific date
  const getRecordForDate = useCallback((dateStr: string): DailyRecord => {
    const existing = storage.records[dateStr];
    const override = storage.dayOverrides[dateStr];
    const defaultPhase = getAcademicPhase(dateStr);

    const mode = override?.mode || existing?.mode || defaultPhase.mode;
    const activeTracks = override?.activeTracks || existing?.activeTracks || getRecommendedTracksForDate(dateStr, mode);
    const isBusyDay = override?.isBusyDay ?? existing?.isBusyDay ?? false;
    const busyReason = override?.busyReason || existing?.busyReason || '';

    // Initialize missing entries for active tracks
    const entries: Partial<Record<TrackId, StudyEntry>> = { ...(existing?.entries || {}) };
    for (const trackId of activeTracks) {
      if (!entries[trackId]) {
        entries[trackId] = {
          trackId,
          completed: false,
          topic: '',
          contentNotes: '',
          updatedAt: new Date().toISOString(),
        };
      }
    }

    return {
      date: dateStr,
      mode,
      activeTracks,
      entries,
      isBusyDay,
      busyReason,
    };
  }, [storage.records, storage.dayOverrides]);

  // Toggle track completion
  const toggleTrackCompletion = useCallback((dateStr: string, trackId: TrackId) => {
    setStorage(prev => {
      const record = prev.records[dateStr] || {
        date: dateStr,
        mode: getAcademicPhase(dateStr).mode,
        activeTracks: getRecommendedTracksForDate(dateStr),
        entries: {},
      };

      const existingEntry = record.entries[trackId] || {
        trackId,
        completed: false,
        topic: '',
        contentNotes: '',
        updatedAt: new Date().toISOString(),
      };

      const updatedEntry: StudyEntry = {
        ...existingEntry,
        completed: !existingEntry.completed,
        updatedAt: new Date().toISOString(),
      };

      return {
        ...prev,
        records: {
          ...prev.records,
          [dateStr]: {
            ...record,
            entries: {
              ...record.entries,
              [trackId]: updatedEntry,
            },
          },
        },
      };
    });
  }, []);

  // Update Topic Studied
  const updateTopic = useCallback((dateStr: string, trackId: TrackId, topic: string) => {
    setStorage(prev => {
      const record = prev.records[dateStr] || {
        date: dateStr,
        mode: getAcademicPhase(dateStr).mode,
        activeTracks: getRecommendedTracksForDate(dateStr),
        entries: {},
      };

      const existingEntry = record.entries[trackId] || {
        trackId,
        completed: false,
        topic: '',
        contentNotes: '',
        updatedAt: new Date().toISOString(),
      };

      return {
        ...prev,
        records: {
          ...prev.records,
          [dateStr]: {
            ...record,
            entries: {
              ...record.entries,
              [trackId]: {
                ...existingEntry,
                topic,
                updatedAt: new Date().toISOString(),
              },
            },
          },
        },
      };
    });
  }, []);

  // Update Content / Notes
  const updateContentNotes = useCallback((dateStr: string, trackId: TrackId, contentNotes: string) => {
    setStorage(prev => {
      const record = prev.records[dateStr] || {
        date: dateStr,
        mode: getAcademicPhase(dateStr).mode,
        activeTracks: getRecommendedTracksForDate(dateStr),
        entries: {},
      };

      const existingEntry = record.entries[trackId] || {
        trackId,
        completed: false,
        topic: '',
        contentNotes: '',
        updatedAt: new Date().toISOString(),
      };

      return {
        ...prev,
        records: {
          ...prev.records,
          [dateStr]: {
            ...record,
            entries: {
              ...record.entries,
              [trackId]: {
                ...existingEntry,
                contentNotes,
                updatedAt: new Date().toISOString(),
              },
            },
          },
        },
      };
    });
  }, []);

  // Update Time Spent
  const updateTimeSpent = useCallback((dateStr: string, trackId: TrackId, timeSpent: string) => {
    setStorage(prev => {
      const record = prev.records[dateStr] || {
        date: dateStr,
        mode: getAcademicPhase(dateStr).mode,
        activeTracks: getRecommendedTracksForDate(dateStr),
        entries: {},
      };

      const existingEntry = record.entries[trackId] || {
        trackId,
        completed: false,
        topic: '',
        contentNotes: '',
        updatedAt: new Date().toISOString(),
      };

      return {
        ...prev,
        records: {
          ...prev.records,
          [dateStr]: {
            ...record,
            entries: {
              ...record.entries,
              [trackId]: {
                ...existingEntry,
                timeSpent,
                updatedAt: new Date().toISOString(),
              },
            },
          },
        },
      };
    });
  }, []);

  // Update Confidence Level ('solid' | 'needs_revision')
  const updateConfidence = useCallback((dateStr: string, trackId: TrackId, confidence: ConfidenceLevel) => {
    setStorage(prev => {
      const record = prev.records[dateStr] || {
        date: dateStr,
        mode: getAcademicPhase(dateStr).mode,
        activeTracks: getRecommendedTracksForDate(dateStr),
        entries: {},
      };

      const existingEntry = record.entries[trackId] || {
        trackId,
        completed: false,
        topic: '',
        contentNotes: '',
        updatedAt: new Date().toISOString(),
      };

      return {
        ...prev,
        records: {
          ...prev.records,
          [dateStr]: {
            ...record,
            entries: {
              ...record.entries,
              [trackId]: {
                ...existingEntry,
                confidence: existingEntry.confidence === confidence ? undefined : confidence,
                updatedAt: new Date().toISOString(),
              },
            },
          },
        },
      };
    });
  }, []);

  // Change Academic Mode for a day (e.g. switch to Exam Crunch or Vacation)
  const setDayMode = useCallback((dateStr: string, mode: AcademicMode) => {
    const recommended = getRecommendedTracksForDate(dateStr, mode);

    setStorage(prev => {
      const existingRecord = prev.records[dateStr] || {
        date: dateStr,
        mode,
        activeTracks: recommended,
        entries: {},
      };

      return {
        ...prev,
        records: {
          ...prev.records,
          [dateStr]: {
            ...existingRecord,
            mode,
            activeTracks: recommended,
          },
        },
        dayOverrides: {
          ...prev.dayOverrides,
          [dateStr]: {
            ...prev.dayOverrides[dateStr],
            mode,
            activeTracks: recommended,
          },
        },
      };
    });
  }, []);

  // Add an extra track for today
  const addTrackToDay = useCallback((dateStr: string, trackId: TrackId) => {
    setStorage(prev => {
      const record = prev.records[dateStr] || {
        date: dateStr,
        mode: getAcademicPhase(dateStr).mode,
        activeTracks: getRecommendedTracksForDate(dateStr),
        entries: {},
      };

      if (record.activeTracks.includes(trackId)) return prev;

      const nextTracks = [...record.activeTracks, trackId];

      return {
        ...prev,
        records: {
          ...prev.records,
          [dateStr]: {
            ...record,
            activeTracks: nextTracks,
          },
        },
        dayOverrides: {
          ...prev.dayOverrides,
          [dateStr]: {
            ...prev.dayOverrides[dateStr],
            activeTracks: nextTracks,
          },
        },
      };
    });
  }, []);

  // Remove or Skip a track for today
  const removeTrackFromDay = useCallback((dateStr: string, trackId: TrackId) => {
    setStorage(prev => {
      const record = prev.records[dateStr] || {
        date: dateStr,
        mode: getAcademicPhase(dateStr).mode,
        activeTracks: getRecommendedTracksForDate(dateStr),
        entries: {},
      };

      const nextTracks = record.activeTracks.filter(t => t !== trackId);

      return {
        ...prev,
        records: {
          ...prev.records,
          [dateStr]: {
            ...record,
            activeTracks: nextTracks,
          },
        },
        dayOverrides: {
          ...prev.dayOverrides,
          [dateStr]: {
            ...prev.dayOverrides[dateStr],
            activeTracks: nextTracks,
          },
        },
      };
    });
  }, []);

  // Mark Day as Busy / Hackathon / Event
  const toggleBusyDay = useCallback((dateStr: string, isBusy: boolean, reason = '') => {
    setStorage(prev => {
      const record = prev.records[dateStr] || {
        date: dateStr,
        mode: getAcademicPhase(dateStr).mode,
        activeTracks: getRecommendedTracksForDate(dateStr),
        entries: {},
      };

      return {
        ...prev,
        records: {
          ...prev.records,
          [dateStr]: {
            ...record,
            isBusyDay: isBusy,
            busyReason: reason,
          },
        },
        dayOverrides: {
          ...prev.dayOverrides,
          [dateStr]: {
            ...prev.dayOverrides[dateStr],
            isBusyDay: isBusy,
            busyReason: reason,
          },
        },
      };
    });
  }, []);

  // Toggle Theme
  const toggleTheme = useCallback(() => {
    setStorage(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark',
    }));
  }, []);

  // Export full JSON journal
  const exportJSON = useCallback(() => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storage, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `cadence_study_journal_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, [storage]);

  // Import JSON backup
  const importJSON = useCallback((jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === 'object') {
        setStorage({
          ...INITIAL_STORAGE,
          ...parsed,
          version: 1,
        });
        return { success: true };
      }
    } catch (e: any) {
      return { success: false, error: e.message };
    }
    return { success: false, error: 'Invalid file format' };
  }, []);

  // Export CSV Revision Topic Log
  const exportCSV = useCallback(() => {
    const headers = ['Date', 'Track_Code', 'Track_Name', 'Topic_Studied', 'Key_Takeaways_Notes', 'Time_Spent', 'Confidence_Status', 'Completed'];
    const rows = [headers];

    for (const [dateStr, record] of Object.entries(storage.records)) {
      for (const [trackId, entry] of Object.entries(record.entries)) {
        if (entry && (entry.topic || entry.contentNotes || entry.completed)) {
          const meta = TRACKS_INFO[trackId as TrackId];
          rows.push([
            dateStr,
            meta?.code || trackId,
            `"${(meta?.name || trackId).replace(/"/g, '""')}"`,
            `"${(entry.topic || '').replace(/"/g, '""')}"`,
            `"${(entry.contentNotes || '').replace(/"/g, '""')}"`,
            entry.timeSpent || 'Unspecified',
            entry.confidence || 'Normal',
            entry.completed ? 'YES' : 'NO',
          ]);
        }
      }
    }

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(r => r.join(',')).join('\n');
    const a = document.createElement('a');
    a.href = encodeURI(csvContent);
    a.download = `cadence_topics_revision_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, [storage.records]);

  // Comprehensive Streak & Activity Metrics
  const stats = useMemo(() => {
    let totalCompletedTracks = 0;
    let totalTopicsLogged = 0;
    let needsRevisionCount = 0;
    const activeDates = new Set<string>();
    const trackCompletions: Record<TrackId, number> = {} as any;

    for (const tid of TRACKS_ORDER) {
      trackCompletions[tid] = 0;
    }

    // Process all logged records
    for (const [dateStr, record] of Object.entries(storage.records)) {
      let dayCompletedCount = 0;
      for (const [trackId, entry] of Object.entries(record.entries)) {
        if (entry) {
          if (entry.completed) {
            dayCompletedCount++;
            totalCompletedTracks++;
            trackCompletions[trackId as TrackId] = (trackCompletions[trackId as TrackId] || 0) + 1;
          }
          if (entry.topic && entry.topic.trim().length > 0) {
            totalTopicsLogged++;
          }
          if (entry.confidence === 'needs_revision') {
            needsRevisionCount++;
          }
        }
      }
      if (dayCompletedCount > 0) {
        activeDates.add(dateStr);
      }
    }

    // Calculate streak
    const datesArr = Array.from(activeDates).sort();
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    // Simplified streak tracking: count consecutive days
    for (let i = 0; i < datesArr.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const prevDate = new Date(datesArr[i - 1]);
        const currDate = new Date(datesArr[i]);
        const diffDays = Math.round((currDate.getTime() - prevDate.getTime()) / (1000 * 3600 * 24));

        if (diffDays === 1) {
          tempStreak++;
        } else {
          tempStreak = 1;
        }
      }
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    }

    currentStreak = tempStreak;

    return {
      totalCompletedTracks,
      totalTopicsLogged,
      needsRevisionCount,
      activeDaysCount: activeDates.size,
      currentStreak: activeDates.size > 0 ? (currentStreak || 1) : 0,
      longestStreak,
      trackCompletions,
    };
  }, [storage.records]);

  // Extract all logged study entries for the Study Archive / Revision Log
  const allLoggedEntries = useMemo(() => {
    const list: Array<{
      date: string;
      trackId: TrackId;
      entry: StudyEntry;
    }> = [];

    for (const [dateStr, record] of Object.entries(storage.records)) {
      for (const [trackId, entry] of Object.entries(record.entries)) {
        if (entry && (entry.topic || entry.contentNotes || entry.completed)) {
          list.push({
            date: dateStr,
            trackId: trackId as TrackId,
            entry,
          });
        }
      }
    }

    // Sort descending by date
    list.sort((a, b) => b.date.localeCompare(a.date));
    return list;
  }, [storage.records]);

  return {
    storage,
    stats,
    allLoggedEntries,
    getRecordForDate,
    toggleTrackCompletion,
    updateTopic,
    updateContentNotes,
    updateTimeSpent,
    updateConfidence,
    setDayMode,
    addTrackToDay,
    removeTrackFromDay,
    toggleBusyDay,
    toggleTheme,
    exportJSON,
    importJSON,
    exportCSV,
  };
}
