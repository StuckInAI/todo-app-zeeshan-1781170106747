export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  timer?: TodoTimer;
};

export type TodoTimer = {
  durationMs: number;
  remainingMs: number;
  running: boolean;
  lastStartedAt: number | null;
};

export type Filter = 'all' | 'active' | 'completed';
