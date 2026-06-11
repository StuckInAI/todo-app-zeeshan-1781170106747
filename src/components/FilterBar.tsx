import clsx from 'clsx';
import type { Filter } from '@/types';

type FilterBarProps = {
  filter: Filter;
  onChange: (f: Filter) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
};

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterBar({
  filter,
  onChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-50/60 border-b border-slate-100 text-sm">
      <span className="text-slate-500">
        <span className="font-semibold text-slate-700">{activeCount}</span> item{activeCount !== 1 ? 's' : ''} left
      </span>

      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => onChange(f.value)}
            className={clsx(
              'px-3 py-1 rounded-md font-medium transition',
              filter === f.value
                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow'
                : 'text-slate-500 hover:text-slate-700'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        className="text-slate-500 hover:text-rose-600 font-medium disabled:opacity-40 disabled:hover:text-slate-500 disabled:cursor-not-allowed transition"
      >
        Clear completed
      </button>
    </div>
  );
}
