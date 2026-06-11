import { useMemo, useState } from 'react';
import { CheckCircle2, ListTodo } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { Filter, Todo } from '@/types';
import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import FilterBar from '@/components/FilterBar';

export default function HomePage() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<Filter>('all');

  const addTodo = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTodo: Todo = {
      id: Math.random().toString(36).slice(2) + Date.now().toString(36),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      deleteTodo(id);
      return;
    }
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t)));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const filtered = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <div className="min-h-full bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg mb-4">
            <ListTodo size={32} />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">My Todos</h1>
          <p className="mt-2 text-slate-500">Stay organized. Get things done.</p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
          <AddTodo onAdd={addTodo} />

          {todos.length > 0 && (
            <FilterBar
              filter={filter}
              onChange={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
              onClearCompleted={clearCompleted}
            />
          )}

          <TodoList
            todos={filtered}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />

          {todos.length === 0 && (
            <div className="px-6 py-16 text-center text-slate-400">
              <CheckCircle2 className="mx-auto mb-3 text-slate-300" size={48} />
              <p className="font-medium">No todos yet</p>
              <p className="text-sm mt-1">Add your first task above to get started.</p>
            </div>
          )}
        </div>

        <footer className="mt-8 text-center text-sm text-slate-400">
          <p>Your todos are saved in your browser.</p>
        </footer>
      </div>
    </div>
  );
}
