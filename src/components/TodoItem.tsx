import { useEffect, useRef, useState } from 'react';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import clsx from 'clsx';
import type { Todo } from '@/types';
import TodoTimer from '@/components/TodoTimer';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onSetTimer: (id: string, durationMs: number) => void;
  onStartTimer: (id: string) => void;
  onPauseTimer: (id: string) => void;
  onResetTimer: (id: string) => void;
  onRemoveTimer: (id: string) => void;
};

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onSetTimer,
  onStartTimer,
  onPauseTimer,
  onResetTimer,
  onRemoveTimer,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [draft, setDraft] = useState<string>(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const startEdit = () => {
    setDraft(todo.text);
    setIsEditing(true);
  };

  const commitEdit = () => {
    onEdit(todo.id, draft);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setDraft(todo.text);
    setIsEditing(false);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commitEdit();
    if (e.key === 'Escape') cancelEdit();
  };

  return (
    <li className="group flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition">
      <button
        type="button"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        className={clsx(
          'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition',
          todo.completed
            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-transparent text-white'
            : 'border-slate-300 hover:border-indigo-400'
        )}
      >
        {todo.completed && <Check size={14} strokeWidth={3} />}
      </button>

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDraft(e.target.value)}
          onKeyDown={handleKey}
          onBlur={commitEdit}
          className="flex-1 px-2 py-1 rounded-md border border-indigo-200 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-700"
        />
      ) : (
        <div className="flex-1 flex items-center gap-2 flex-wrap">
          <span
            onDoubleClick={startEdit}
            className={clsx(
              'select-none cursor-pointer',
              todo.completed ? 'line-through text-slate-400' : 'text-slate-700'
            )}
          >
            {todo.text}
          </span>
          <TodoTimer
            timer={todo.timer}
            onSet={(durationMs: number) => onSetTimer(todo.id, durationMs)}
            onStart={() => onStartTimer(todo.id)}
            onPause={() => onPauseTimer(todo.id)}
            onReset={() => onResetTimer(todo.id)}
            onRemove={() => onRemoveTimer(todo.id)}
          />
        </div>
      )}

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
        {isEditing ? (
          <>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={commitEdit}
              className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50"
              aria-label="Save"
            >
              <Check size={16} />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={cancelEdit}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
              aria-label="Cancel"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={startEdit}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-indigo-600"
              aria-label="Edit"
            >
              <Pencil size={16} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(todo.id)}
              className="p-2 rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600"
              aria-label="Delete"
            >
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
