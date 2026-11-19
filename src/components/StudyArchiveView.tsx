import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Bookmark, 
  Calendar, 
  Clock, 
  ArrowRight, 
  FileSpreadsheet, 
  Filter, 
  BookOpen, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { TrackId, StudyEntry } from '../types/study';
import { TRACKS_INFO, TRACKS_ORDER } from '../data/tracksData';

interface StudyArchiveViewProps {
  entries: Array<{
    date: string;
    trackId: TrackId;
    entry: StudyEntry;
  }>;
  onJumpToDate: (dateStr: string) => void;
  onExportCSV: () => void;
}

export const StudyArchiveView: React.FC<StudyArchiveViewProps> = ({
  entries,
  onJumpToDate,
  onExportCSV,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<TrackId | 'all'>('all');
  const [needsRevisionOnly, setNeedsRevisionOnly] = useState(false);

  // Filtered entries
  const filtered = useMemo(() => {
    return entries.filter((item) => {
      // 1. Track filter
      if (selectedTrackFilter !== 'all' && item.trackId !== selectedTrackFilter) {
        return false;
      }

      // 2. Needs revision filter
      if (needsRevisionOnly && item.entry.confidence !== 'needs_revision') {
        return false;
      }

      // 3. Search query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const topicMatch = item.entry.topic.toLowerCase().includes(q);
        const notesMatch = item.entry.contentNotes.toLowerCase().includes(q);
        const dateMatch = item.date.toLowerCase().includes(q);
        const trackNameMatch = TRACKS_INFO[item.trackId]?.name.toLowerCase().includes(q);
        if (!topicMatch && !notesMatch && !dateMatch && !trackNameMatch) {
          return false;
        }
      }

      return true;
    });
  }, [entries, selectedTrackFilter, needsRevisionOnly, searchQuery]);

  return (
    <div className="space-y-6">
      
      {/* Archive Header & Action Bar */}
      <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif text-white light:text-paper-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <span>Study Archive & Searchable Revision Log</span>
            </h2>
            <p className="text-xs text-slate-400 light:text-paper-800 mt-1">
              Search every topic, key takeaway, formula, and lecture note you've ever logged.
            </p>
          </div>

          <button
            onClick={onExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shrink-0 shadow-md shadow-blue-500/20"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Revision CSV</span>
          </button>
        </div>

        {/* Search Bar + Needs Revision Pill */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic title, notes, formulas, or dates (e.g. '0/1 Knapsack', 'Playfair', '2026-11')..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-800 light:bg-paper-200 text-white light:text-paper-900 text-xs sm:text-sm border border-white/10 focus:outline-none focus:border-violet-500 placeholder-slate-500"
            />
          </div>

          <button
            onClick={() => setNeedsRevisionOnly(!needsRevisionOnly)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all shrink-0 w-full sm:w-auto justify-center ${
              needsRevisionOnly
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 shadow'
                : 'bg-obsidian-800 light:bg-paper-200 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4 text-rose-400" />
            <span>Needs Revision Only ⚠️</span>
          </button>
        </div>

        {/* Track Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedTrackFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 ${
              selectedTrackFilter === 'all'
                ? 'bg-violet-600 text-white font-bold'
                : 'bg-obsidian-800 light:bg-paper-200 text-slate-400 hover:text-white'
            }`}
          >
            All Tracks ({entries.length})
          </button>

          {TRACKS_ORDER.map((tid) => {
            const meta = TRACKS_INFO[tid];
            const isSelected = selectedTrackFilter === tid;

            return (
              <button
                key={tid}
                onClick={() => setSelectedTrackFilter(tid)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 border ${
                  isSelected
                    ? 'border-white/30 text-white font-bold'
                    : 'border-white/5 bg-obsidian-800 light:bg-paper-200 text-slate-400 hover:text-white'
                }`}
                style={{
                  backgroundColor: isSelected ? meta.bgRgba : undefined,
                  borderColor: isSelected ? meta.accentColor : undefined,
                }}
              >
                {meta.name}
              </button>
            );
          })}
        </div>

      </div>

      {/* Logged Entries List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-2xl border border-dashed border-white/10 text-slate-400">
            <BookOpen className="w-10 h-10 mx-auto text-violet-400 mb-3 opacity-60" />
            <h3 className="text-base font-semibold text-slate-200 light:text-paper-900">
              No matching logged study entries found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              {entries.length === 0
                ? "You haven't logged any study topics yet. Go to Today's Focus Log to check off tracks and type in what you studied!"
                : "Try adjusting your search query or track filter."}
            </p>
          </div>
        ) : (
          filtered.map(({ date, trackId, entry }) => {
            const meta = TRACKS_INFO[trackId];

            return (
              <div
                key={`${date}_${trackId}`}
                className={`glass-panel p-4 sm:p-5 rounded-2xl border transition-all ${
                  entry.confidence === 'needs_revision'
                    ? 'border-rose-500/25 bg-rose-950/10'
                    : 'border-white/10'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  
                  {/* Left: Meta, Date & Topic */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2 mb-1.5">
                      <span 
                        className="font-mono text-[10px] font-black px-2 py-0.5 rounded tracking-wider"
                        style={{ backgroundColor: meta.bgRgba, color: meta.accentColor }}
                      >
                        {meta.code}
                      </span>

                      <span className="text-xs font-semibold text-slate-300 light:text-paper-900">
                        {meta.name}
                      </span>

                      <span className="font-mono text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {date}
                      </span>

                      {entry.timeSpent && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-300">
                          ⏱️ {entry.timeSpent}
                        </span>
                      )}

                      {entry.confidence === 'needs_revision' && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          Needs Revision ⚠️
                        </span>
                      )}
                    </div>

                    {/* Topic Title */}
                    <h3 className="text-sm sm:text-base font-semibold text-white light:text-paper-900 mb-2">
                      {entry.topic || <span className="italic text-slate-500">Completed session (no topic title entered)</span>}
                    </h3>

                    {/* Content Notes */}
                    {entry.contentNotes && (
                      <div className="p-3 rounded-xl bg-obsidian-800/60 light:bg-paper-200 border border-white/5 text-xs text-slate-300 light:text-paper-900 leading-relaxed whitespace-pre-wrap font-sans">
                        {entry.contentNotes}
                      </div>
                    )}
                  </div>

                  {/* Right: Jump to Date */}
                  <div className="shrink-0 flex items-center justify-end sm:self-center">
                    <button
                      onClick={() => onJumpToDate(date)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 light:bg-paper-200 text-xs text-slate-300 hover:text-white transition-colors"
                    >
                      <span>Open Date</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
