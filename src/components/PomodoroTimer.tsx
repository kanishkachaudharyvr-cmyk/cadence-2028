import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  X, 
  CheckCircle2, 
  Timer, 
  Sparkles,
  Volume2
} from 'lucide-react';
import { TrackId } from '../types/roadmap';
import { TRACKS_META } from '../data/tracksMeta';

interface PomodoroTimerProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrackId?: TrackId;
  initialTaskTitle?: string;
  onLogSession: (trackId: TrackId, taskTitle: string, durationMinutes: number) => void;
}

type Mode = '25_focus' | '50_deep' | '5_break' | '15_break';

const DURATIONS: Record<Mode, number> = {
  '25_focus': 25 * 60,
  '50_deep': 50 * 60,
  '5_break': 5 * 60,
  '15_break': 15 * 60,
};

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  isOpen,
  onClose,
  initialTrackId = 'dsa',
  initialTaskTitle = 'High-Intensity Algorithm Practice',
  onLogSession,
}) => {
  const [mode, setMode] = useState<Mode>('25_focus');
  const [timeLeft, setTimeLeft] = useState<number>(DURATIONS['25_focus']);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedTrack, setSelectedTrack] = useState<TrackId>(initialTrackId);
  const [taskTitle, setTaskTitle] = useState<string>(initialTaskTitle);

  // Sync if initial task changes
  useEffect(() => {
    if (initialTrackId) setSelectedTrack(initialTrackId);
    if (initialTaskTitle) setTaskTitle(initialTaskTitle);
  }, [initialTrackId, initialTaskTitle]);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      // Log session
      const totalMins = Math.round(DURATIONS[mode] / 60);
      if (!mode.includes('break')) {
        onLogSession(selectedTrack, taskTitle, totalMins);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode, selectedTrack, taskTitle, onLogSession]);

  const handleModeChange = (newMode: Mode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(DURATIONS[newMode]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(DURATIONS[mode]);
  };

  const handleLogManual = () => {
    const totalMins = Math.round((DURATIONS[mode] - timeLeft) / 60) || Math.round(DURATIONS[mode] / 60);
    onLogSession(selectedTrack, taskTitle, totalMins);
    setIsRunning(false);
    setTimeLeft(DURATIONS[mode]);
    onClose();
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const totalDuration = DURATIONS[mode];
  const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;

  const trackMeta = TRACKS_META[selectedTrack];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md animate-in fade-in">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-panel w-full max-w-md rounded-3xl p-6 sm:p-7 border border-white/10 light:border-paper-300 shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Track Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Timer className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl text-white light:text-paper-900">
              Deep Work Pomodoro
            </h3>
            <p className="text-xs text-slate-400 light:text-paper-800">
              Zero-distraction focus blocks for Kanishka
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-obsidian-800 light:bg-paper-200 border border-white/5 mb-6">
          <button
            onClick={() => handleModeChange('25_focus')}
            className={`py-1.5 text-xs font-mono rounded-lg transition-all ${
              mode === '25_focus'
                ? 'bg-violet-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            25m Focus
          </button>
          <button
            onClick={() => handleModeChange('50_deep')}
            className={`py-1.5 text-xs font-mono rounded-lg transition-all ${
              mode === '50_deep'
                ? 'bg-violet-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            50m Deep
          </button>
          <button
            onClick={() => handleModeChange('5_break')}
            className={`py-1.5 text-xs font-mono rounded-lg transition-all ${
              mode === '5_break'
                ? 'bg-emerald-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            5m Break
          </button>
          <button
            onClick={() => handleModeChange('15_break')}
            className={`py-1.5 text-xs font-mono rounded-lg transition-all ${
              mode === '15_break'
                ? 'bg-emerald-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            15m Break
          </button>
        </div>

        {/* Circular Progress & Clock */}
        <div className="flex flex-col items-center justify-center my-6">
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="84"
                stroke="currentColor"
                strokeWidth="8"
                className="text-obsidian-800 light:text-paper-200"
                fill="transparent"
              />
              <circle
                cx="96"
                cy="96"
                r="84"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 84}
                strokeDashoffset={2 * Math.PI * 84 * (1 - progressPercent / 100)}
                strokeLinecap="round"
                className="text-violet-500 transition-all duration-500"
                fill="transparent"
              />
            </svg>

            {/* Time Left Digits */}
            <div className="absolute flex flex-col items-center">
              <span className="font-mono text-4xl sm:text-5xl font-extrabold text-white light:text-paper-900 tracking-tighter">
                {formattedTime}
              </span>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest mt-1">
                {isRunning ? 'FOCUSING' : 'PAUSED'}
              </span>
            </div>
          </div>
        </div>

        {/* Linked Task & Track */}
        <div className="mb-6 p-3 rounded-xl bg-obsidian-800/80 light:bg-paper-200 border border-white/5">
          <div className="flex items-center gap-2 mb-1.5">
            <span 
              className="text-[10px] font-mono px-2 py-0.5 rounded font-bold"
              style={{ backgroundColor: trackMeta.bgRgba, color: trackMeta.accentColor }}
            >
              {trackMeta.code}
            </span>
            <span className="text-xs text-slate-400 truncate">
              {trackMeta.name}
            </span>
          </div>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm font-semibold text-white light:text-paper-900 border-none p-0 focus:outline-none"
            placeholder="Focus objective..."
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all shadow-lg ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-500/25'
                : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-violet-500/25'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Start Focus</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-3 rounded-2xl bg-obsidian-800 hover:bg-obsidian-700 light:bg-paper-200 light:hover:bg-paper-300 text-slate-300 light:text-paper-900 border border-white/10 transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleLogManual}
            className="flex items-center gap-1.5 px-3.5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-md shadow-emerald-500/25"
            title="Log Focus Session"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Log Block</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
};
