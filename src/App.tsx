import React, { useState } from 'react';
import { useStudyStorage } from './hooks/useStudyStorage';
import { getAcademicPhase, START_DATE } from './utils/academicCalendarEngine';
import { TRACKS_INFO, TRACKS_ORDER } from './data/tracksData';
import { TrackId, AcademicMode } from './types/study';
import { Header } from './components/Header';
import { ContextModeBar } from './components/ContextModeBar';
import { StudyTrackCard } from './components/StudyTrackCard';
import { StudyArchiveView } from './components/StudyArchiveView';
import { ConsistencyHeatmapView } from './components/ConsistencyHeatmapView';
import { CustomizeRoutineModal } from './components/CustomizeRoutineModal';
import { Plus, Sparkles, BookOpen } from 'lucide-react';

export function App() {
  const {
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
  } = useStudyStorage();

  const [selectedDate, setSelectedDate] = useState<string>(START_DATE);
  const [currentView, setCurrentView] = useState<'workspace' | 'archive' | 'heatmap'>('workspace');
  const [isRoutineModalOpen, setIsRoutineModalOpen] = useState(false);
  const [showAddTrackMenu, setShowAddTrackMenu] = useState(false);

  // Compute record and academic phase for selected date
  const currentRecord = getRecordForDate(selectedDate);
  const phaseInfo = getAcademicPhase(selectedDate);

  // Tracks available to add that aren't already active today
  const availableToAdd = TRACKS_ORDER.filter(t => !currentRecord.activeTracks.includes(t));

  // Count completed tracks for today
  const completedTodayCount = currentRecord.activeTracks.filter(
    t => currentRecord.entries[t]?.completed
  ).length;

  return (
    <div className="min-h-screen bg-obsidian-900 light:bg-paper-50 text-slate-100 light:text-paper-900 transition-colors duration-300">
      
      {/* Top Sticky Header */}
      <Header
        currentDateStr={selectedDate}
        theme={storage.theme}
        onToggleTheme={toggleTheme}
        stats={stats}
        onOpenRoutineModal={() => setIsRoutineModalOpen(true)}
        onExportJSON={exportJSON}
        onImportJSON={importJSON}
        onExportCSV={exportCSV}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Context & Mode Switcher Bar */}
        <ContextModeBar
          currentDateStr={selectedDate}
          onSelectDate={setSelectedDate}
          phaseInfo={phaseInfo}
          activeMode={currentRecord.mode}
          onChangeMode={(mode: AcademicMode) => setDayMode(selectedDate, mode)}
          activeTracksCount={currentRecord.activeTracks.length}
          completedTracksCount={completedTodayCount}
          isBusyDay={Boolean(currentRecord.isBusyDay)}
          busyReason={currentRecord.busyReason}
          onToggleBusyDay={(isBusy, reason) => toggleBusyDay(selectedDate, isBusy, reason)}
          currentView={currentView}
          onChangeView={setCurrentView}
          totalLoggedCount={allLoggedEntries.length}
        />

        {/* VIEW 1: TODAY'S FOCUS WORKSPACE (CHECKLIST & INPUT CARDS) */}
        {currentView === 'workspace' && (
          <div className="space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-serif text-white light:text-paper-900">
                  Today's Active Focus Checklist ({currentRecord.activeTracks.length} Tracks)
                </h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-400">
                  {completedTodayCount} / {currentRecord.activeTracks.length} Studied
                </span>
              </div>

              {/* Add Extra Track Button */}
              {availableToAdd.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setShowAddTrackMenu(!showAddTrackMenu)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all shadow-md shadow-violet-500/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Extra Track for Today</span>
                  </button>

                  {showAddTrackMenu && (
                    <div className="absolute right-0 mt-2 w-64 rounded-xl bg-obsidian-900 light:bg-paper-100 border border-white/10 shadow-2xl p-1.5 z-30 animate-in fade-in zoom-in-95">
                      <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase text-slate-400 border-b border-white/5 mb-1">
                        Select track to add today:
                      </div>
                      {availableToAdd.map((tid) => {
                        const meta = TRACKS_INFO[tid];
                        return (
                          <button
                            key={tid}
                            onClick={() => {
                              addTrackToDay(selectedDate, tid);
                              setShowAddTrackMenu(false);
                            }}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs hover:bg-white/5 light:hover:bg-paper-200 text-left transition-colors"
                          >
                            <span className="font-semibold text-slate-200 light:text-paper-900">
                              {meta.name}
                            </span>
                            <span 
                              className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded"
                              style={{ backgroundColor: meta.bgRgba, color: meta.accentColor }}
                            >
                              {meta.code}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* List of Active Track Cards */}
            {currentRecord.activeTracks.length === 0 ? (
              <div className="glass-panel p-8 text-center rounded-2xl border border-dashed border-white/10 text-slate-400">
                <p className="text-sm font-semibold text-slate-300">No tracks scheduled for this day</p>
                <p className="text-xs text-slate-500 mt-1">
                  Click "+ Add Extra Track for Today" above to add any track you want to study.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {currentRecord.activeTracks.map((trackId) => {
                  const entry = currentRecord.entries[trackId] || {
                    trackId,
                    completed: false,
                    topic: '',
                    contentNotes: '',
                    updatedAt: new Date().toISOString(),
                  };

                  return (
                    <StudyTrackCard
                      key={trackId}
                      trackId={trackId}
                      entry={entry}
                      onToggleCompletion={(tid) => toggleTrackCompletion(selectedDate, tid)}
                      onUpdateTopic={(tid, topic) => updateTopic(selectedDate, tid, topic)}
                      onUpdateNotes={(tid, notes) => updateContentNotes(selectedDate, tid, notes)}
                      onUpdateTimeSpent={(tid, time) => updateTimeSpent(selectedDate, tid, time)}
                      onUpdateConfidence={(tid, conf) => updateConfidence(selectedDate, tid, conf)}
                      onRemoveTrack={(tid) => removeTrackFromDay(selectedDate, tid)}
                    />
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* VIEW 2: STUDY ARCHIVE & SEARCHABLE REVISION LOG */}
        {currentView === 'archive' && (
          <StudyArchiveView
            entries={allLoggedEntries}
            onJumpToDate={(date) => {
              setSelectedDate(date);
              setCurrentView('workspace');
            }}
            onExportCSV={exportCSV}
          />
        )}

        {/* VIEW 3: CONSISTENCY GRID & HEATMAP */}
        {currentView === 'heatmap' && (
          <ConsistencyHeatmapView
            storage={storage}
            onJumpToDate={(date) => {
              setSelectedDate(date);
              setCurrentView('workspace');
            }}
            stats={stats}
          />
        )}

      </main>

      {/* Routine & Calendar Customizer Modal */}
      <CustomizeRoutineModal
        isOpen={isRoutineModalOpen}
        onClose={() => setIsRoutineModalOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-white/5 light:border-paper-200 text-center text-xs text-slate-500 font-mono">
        <p>CADENCE // 2028 — Adaptive Study Planner & Learning Log</p>
        <p className="mt-1 text-[11px] text-slate-600">
          Built for Kanishka Chaudhary • B.E. Information Technology, University of Mumbai
        </p>
        <p className="mt-0.5 text-[10px] text-slate-600">
          Nov 19, 2026 → Graduation on June 30, 2028
        </p>
      </footer>

    </div>
  );
}

export default App;
