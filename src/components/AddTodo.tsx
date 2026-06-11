import { useState } from 'react';
import { Plus } from 'lucide-react';

type AddTodoProps = {
  onAdd: (text: string) => void;
};

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-b border-slate-100">
      <input
        type="text"
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-700 placeholder:text-slate-400 transition"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="inline-flex items-center justify-center gap-1 px-4 py-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-medium shadow-md shadow-indigo-200 hover:shadow-lg hover:from-indigo-600 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition"
      >
        <Plus size={18} />
        <span className="hidden sm:inline">Add</span>
      </button>
    </form>
  );
}
