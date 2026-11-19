import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  UserStorageState, 
  MasteryStatus, 
  RolledOverTask, 
  PomodoroSession,
  TrackId 
} from '../types/roadmap';
import { ALL_590_DATES, START_DATE, daysBetween, generateGoalForTrack } from '../utils/scheduleEngine';
import { TRACKS_ORDER, TRACKS_META } from '../data/tracksMeta';

const STORAGE_KEY = 'synapse_grad_2028_v1';

const INITIAL_STATE: UserStorageState = {
  version: 1,
  theme: 'dark',
  goalCompletions: {},
  subtaskCompletions: {},
  notes: {},
  customTitles: {},
  customYoutubeLinks: {},
  masteryStatuses: {},
  rolledOverTasks: [],
  pomodoroSessions: [],
  activeTrackFilter: 'all',
};

export function usePersistentState() {
  const [state, setState] = useState<UserStorageState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...INITIAL_STATE, ...parsed };
      }
    } catch (e) {
      console.error('Failed to load Synapse state from localStorage:', e);
    }
    return INITIAL_STATE;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save Synapse state to localStorage:', e);
    }
  }, [state]);

  // Apply dark/light theme class to documentElement
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [state.theme]);

  // Toggle goal completion
  const toggleGoal = useCallback((goalId: string) => {
    setState(prev => {
      const nextCompleted = !prev.goalCompletions[goalId];
      const nextGoalCompletions = { ...prev.goalCompletions, [goalId]: nextCompleted };
      
      // Auto-update mastery status if completed
      const nextMasteries = { ...prev.masteryStatuses };
      if (nextCompleted) {
        nextMasteries[goalId] = 'completed';
      } else if (nextMasteries[goalId] === 'completed') {
        nextMasteries[goalId] = 'in_progress';
      }

      // Also toggle all 3 subtasks to true when marked completed
      const nextSubtaskCompletions = { ...prev.subtaskCompletions };
      if (nextCompleted) {
        nextSubtaskCompletions[`${goalId}_st1`] = true;
        nextSubtaskCompletions[`${goalId}_st2`] = true;
        nextSubtaskCompletions[`${goalId}_st3`] = true;
      }

      return {
        ...prev,
        goalCompletions: nextGoalCompletions,
        masteryStatuses: nextMasteries,
        subtaskCompletions: nextSubtaskCompletions,
      };
    });
  }, []);

  // Toggle individual subtask
  const toggleSubtask = useCallback((goalId: string, subtaskId: string) => {
    setState(prev => {
      const nextVal = !prev.subtaskCompletions[subtaskId];
      const nextSubtasks = {
        ...prev.subtaskCompletions,
        [subtaskId]: nextVal,
      };

      // Check if all 3 subtasks are completed
      const st1 = nextSubtasks[`${goalId}_st1`];
      const st2 = nextSubtasks[`${goalId}_st2`];
      const st3 = nextSubtasks[`${goalId}_st3`];
      const allDone = Boolean(st1 && st2 && st3);

      const nextGoalCompletions = {
        ...prev.goalCompletions,
        [goalId]: allDone,
      };

      const nextMasteries = { ...prev.masteryStatuses };
      if (allDone) {
        nextMasteries[goalId] = 'completed';
      } else if (st1 || st2 || st3) {
        nextMasteries[goalId] = 'in_progress';
      }

      return {
        ...prev,
        subtaskCompletions: nextSubtasks,
        goalCompletions: nextGoalCompletions,
        masteryStatuses: nextMasteries,
      };
    });
  }, []);

  // Update notes
  const setNotes = useCallback((goalId: string, noteText: string) => {
    setState(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [goalId]: noteText,
      },
    }));
  }, []);

  // Update custom goal title
  const setCustomTitle = useCallback((goalId: string, title: string) => {
    setState(prev => ({
      ...prev,
      customTitles: {
        ...prev.customTitles,
        [goalId]: title,
      },
    }));
  }, []);

  // Update custom YouTube link
  const setCustomYoutubeLink = useCallback((goalId: string, url: string) => {
    setState(prev => ({
      ...prev,
      customYoutubeLinks: {
        ...prev.customYoutubeLinks,
        [goalId]: url,
      },
    }));
  }, []);

  // Update mastery status
  const setMasteryStatus = useCallback((goalId: string, status: MasteryStatus) => {
    setState(prev => ({
      ...prev,
      masteryStatuses: {
        ...prev.masteryStatuses,
        [goalId]: status,
      },
      goalCompletions: {
        ...prev.goalCompletions,
        [goalId]: status === 'completed',
      },
    }));
  }, []);

  // Toggle Theme
  const toggleTheme = useCallback(() => {
    setState(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark',
    }));
  }, []);

  // Smart Carry-Forward: Roll over missed tasks from past dates to today
  const rollOverMissedTasksToDate = useCallback((targetDateStr: string) => {
    setState(prev => {
      const rolledOver: RolledOverTask[] = [...prev.rolledOverTasks];
      const todayIndex = ALL_590_DATES.indexOf(targetDateStr);
      if (todayIndex <= 0) return prev;

      // Scan up to the last 14 past days to avoid overwhelming backlog
      const scanStartIndex = Math.max(0, todayIndex - 14);
      const pastDates = ALL_590_DATES.slice(scanStartIndex, todayIndex);

      let addedCount = 0;
      for (const pastDate of pastDates) {
        for (const trackId of TRACKS_ORDER) {
          const goalId = `${pastDate}_${trackId}`;
          const isDone = Boolean(prev.goalCompletions[goalId]);
          
          if (!isDone) {
            // Check if already rolled over
            const alreadyRolled = rolledOver.some(
              r => r.originalDate === pastDate && r.trackId === trackId && r.targetDate === targetDateStr
            );

            if (!alreadyRolled) {
              const baseGoal = generateGoalForTrack(trackId, pastDate);
              const customTitle = prev.customTitles[goalId] || baseGoal.title;

              // Extract pending subtasks
              const pendingSubtasks = baseGoal.subtasks.filter(
                st => !prev.subtaskCompletions[st.id]
              );

              if (pendingSubtasks.length > 0) {
                rolledOver.push({
                  id: `roll_${pastDate}_${trackId}_${Date.now()}_${addedCount}`,
                  originalDate: pastDate,
                  targetDate: targetDateStr,
                  trackId,
                  title: `[Rolled Over] ${customTitle}`,
                  subtasks: pendingSubtasks,
                  completed: false,
                });
                addedCount++;
              }
            }
          }
        }
      }

      return {
        ...prev,
        rolledOverTasks: rolledOver,
      };
    });
  }, []);

  // Toggle rolled over task completion
  const toggleRolledOverTask = useCallback((taskId: string) => {
    setState(prev => ({
      ...prev,
      rolledOverTasks: prev.rolledOverTasks.map(t => 
        t.id === taskId ? { ...t, completed: !t.completed } : t
      ),
    }));
  }, []);

  // Dismiss rolled over task
  const dismissRolledOverTask = useCallback((taskId: string) => {
    setState(prev => ({
      ...prev,
      rolledOverTasks: prev.rolledOverTasks.filter(t => t.id !== taskId),
    }));
  }, []);

  // Add Pomodoro session
  const addPomodoroSession = useCallback((session: Omit<PomodoroSession, 'id' | 'timestamp'>) => {
    setState(prev => ({
      ...prev,
      pomodoroSessions: [
        {
          ...session,
          id: `pomo_${Date.now()}`,
          timestamp: new Date().toISOString(),
        },
        ...prev.pomodoroSessions,
      ],
    }));
  }, []);

  // Export full JSON
  const exportJSON = useCallback(() => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `synapse_2028_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [state]);

  // Import JSON
  const importJSON = useCallback((jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object') {
        setState({
          ...INITIAL_STATE,
          ...parsed,
          version: 1,
        });
        return { success: true };
      }
    } catch (e: any) {
      return { success: false, error: e.message };
    }
    return { success: false, error: 'Invalid JSON format' };
  }, []);

  // Export CSV
  const exportCSV = useCallback(() => {
    const rows = [
      ['Date', 'Day_Number', 'Track_ID', 'Track_Name', 'Topic_Title', 'Status', 'Notes', 'Custom_Link']
    ];

    for (const dateStr of ALL_590_DATES) {
      for (const trackId of TRACKS_ORDER) {
        const goalId = `${dateStr}_${trackId}`;
        const isDone = state.goalCompletions[goalId] ? 'Completed' : 'Pending';
        const mastery = state.masteryStatuses[goalId] || isDone;
        const notes = (state.notes[goalId] || '').replace(/"/g, '""');
        const customTitle = (state.customTitles[goalId] || '').replace(/"/g, '""');
        const customUrl = state.customYoutubeLinks[goalId] || '';
        const dayNum = daysBetween(START_DATE, dateStr) + 1;
        const trackName = TRACKS_META[trackId].name;

        // Only include dates up to current date or entries that have interactions
        if (state.goalCompletions[goalId] || state.notes[goalId] || state.customTitles[goalId]) {
          rows.push([
            dateStr,
            String(dayNum),
            trackId,
            `"${trackName}"`,
            `"${customTitle || 'Default Scheduled Topic'}"`,
            mastery,
            `"${notes}"`,
            customUrl
          ]);
        }
      }
    }

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", encodeURI(csvContent));
    downloadAnchor.setAttribute("download", `synapse_2028_progress_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [state]);

  // Streak & Activity Calculations
  const stats = useMemo(() => {
    let completedGoalsCount = 0;
    let completedSubtasksCount = 0;

    // Count goals
    for (const val of Object.values(state.goalCompletions)) {
      if (val) completedGoalsCount++;
    }

    // Count subtasks
    for (const val of Object.values(state.subtaskCompletions)) {
      if (val) completedSubtasksCount++;
    }

    // Daily active set (dates with at least 1 goal completed)
    const activeDates = new Set<string>();
    for (const [key, isCompleted] of Object.entries(state.goalCompletions)) {
      if (isCompleted) {
        const datePart = key.split('_')[0];
        activeDates.add(datePart);
      }
    }

    // Calculate current streak
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    for (const dateStr of ALL_590_DATES) {
      if (activeDates.has(dateStr)) {
        tempStreak++;
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
      } else {
        tempStreak = 0;
      }
    }

    // Focus minutes
    const totalFocusMinutes = state.pomodoroSessions.reduce(
      (acc, s) => acc + s.durationMinutes, 
      0
    );

    return {
      completedGoalsCount,
      completedSubtasksCount,
      activeDaysCount: activeDates.size,
      currentStreak: tempStreak > 0 ? tempStreak : (activeDates.size > 0 ? 1 : 0),
      longestStreak,
      totalFocusMinutes,
      activeDates,
    };
  }, [state.goalCompletions, state.subtaskCompletions, state.pomodoroSessions]);

  return {
    state,
    stats,
    toggleGoal,
    toggleSubtask,
    setNotes,
    setCustomTitle,
    setCustomYoutubeLink,
    setMasteryStatus,
    toggleTheme,
    rollOverMissedTasksToDate,
    toggleRolledOverTask,
    dismissRolledOverTask,
    addPomodoroSession,
    exportJSON,
    importJSON,
    exportCSV,
  };
}
