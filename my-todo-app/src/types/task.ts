// TypeScript types for tasks and subtasks
export interface Task {
  id: string;
  title: string;
  deadline?: string; // ISO date-time string (YYYY-MM-DDTHH:mm)
  completedAt?: string; // ISO timestamp (YYYY-MM-DD HH:mm:ss) - stored in sessionStorage
  children: Task[]; // Nested subtasks (arbitrary depth)
}
