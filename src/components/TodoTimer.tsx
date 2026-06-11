import { useEffect, useState } from 'react';
import { Pause, Play, RotateCcw, Timer as TimerIcon, X } from 'lucide-react';
import clsx from 'clsx';
import type { TodoTimer as TodoTimerType } from '@/types';

type TodoTimerProps = {
  timer: TodoTimerType | undefined;
  onSet: (durationMs: number) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onRemove: () => void;
};

function formatTime(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n: number): string => n.toString().padStart(2, '0');
  if (h > 0) return `${h}:${pad(m)}:${pad(s)}`;
  return `${pad(m)}:${pad(s)}`;
}

function computeRemaining(timer: TodoTimerType): number {
  if (!timer.running || timer.lastStartedAt === null) return timer.remainingMs;
  const elapsed = Date.now() - timer.lastStartedAt;
  return Math.max(0, timer.remainingMs - elapsed);
}

export default function TodoTimer({
  timer,
  onSet,
  onStart,
  onPause,
  onReset,
  onRemove,
}: TodoTimerProps) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<string>('5');
  const [seconds, setSeconds] = useState<string>('0');
  const [, setTick] = useState<number>(0);

  useEffect(() => {
    if (!timer?.running) return;
    const id = window.setInterval(() => setTick((t: number) => t + 1), 250);
    return () => window.clearInterval(id);
  }, [timer?.running]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mins = parseInt(minutes, 10) || 0;
    const secs = parseInt(seconds, 10) || 0;
    const total = (mins * 60 + secs) * 1000;
    if (total <= 0) return;
    onSet(total);
    setShowForm(false);
  };

  if (!timer) {
    if (showForm) {
      return (
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-indigo-50 border border-indigo-100"
        >
          <input
            type="number"
            min="0"
            value={minutes}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinutes(e.target.value)}
            className="w-12 px-1.5 py-0.5 text-sm rounded border border-slate-200 outline-none focus:border-indigo-300"
            aria-label="Minutes"
          />
          <span className="text-xs text-slate-500">m</span>
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeconds(e.target.value)}
            className="w-12 px-1.5 py-0.5 text-sm rounded border border-slate-200 outline-none focus:border-indigo-300"
            aria-label="Seconds"
          />
          <span className="text-xs text-slate-500">s</span>
          <button
            type="submit"
            className="px-2 py-0.5 text-xs font-medium rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Set
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="p-1 rounded text-slate-500 hover:bg-slate-100"
            aria-label="Cancel"
          >
            <X size={12} />
          </button>
        </form>
      );
    }
    return (
      <button
        type="button"
        onClick={() => setShowForm(true)}
        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition"
        aria-label="Add timer"
      >
        <TimerIcon size={14} />
        <span>Timer</span>
      </button>
    );
  }

  const remaining = computeRemaining(timer);
  const isFinished = remaining <= 0;

  return (
    <div
      className={clsx(
        'inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border',
        isFinished
          ? 'bg-rose-50 border-rose-200 text-rose-600'
          : timer.running
            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
            : 'bg-indigo-50 border-indigo-100 text-indigo-700'
      )}
    >
      <TimerIcon size={12} />
      <span className="tabular-nums">{formatTime(remaining)}</span>
      {!isFinished && (
        <button
          type="button"
          onClick={timer.running ? onPause : onStart}
          className="p-0.5 rounded hover:bg-white/60"
          aria-label={timer.running ? 'Pause timer' : 'Start timer'}
        >
          {timer.running ? <Pause size={12} /> : <Play size={12} />}
        </button>
      )}
      <button
        type="button"
        onClick={onReset}
        className="p-0.5 rounded hover:bg-white/60"
        aria-label="Reset timer"
      >
        <RotateCcw size={12} />
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="p-0.5 rounded hover:bg-white/60"
        aria-label="Remove timer"
      >
        <X size={12} />
      </button>
    </div>
  );
}
