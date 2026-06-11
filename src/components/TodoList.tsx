import type { Todo } from '@/types';
import TodoItem from '@/components/TodoItem';

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onSetTimer: (id: string, durationMs: number) => void;
  onStartTimer: (id: string) => void;
  onPauseTimer: (id: string) => void;
  onResetTimer: (id: string) => void;
  onRemoveTimer: (id: string) => void;
};

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  onSetTimer,
  onStartTimer,
  onPauseTimer,
  onResetTimer,
  onRemoveTimer,
}: TodoListProps) {
  if (todos.length === 0) return null;
  return (
    <ul className="divide-y divide-slate-100">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onSetTimer={onSetTimer}
          onStartTimer={onStartTimer}
          onPauseTimer={onPauseTimer}
          onResetTimer={onResetTimer}
          onRemoveTimer={onRemoveTimer}
        />
      ))}
    </ul>
  );
}
