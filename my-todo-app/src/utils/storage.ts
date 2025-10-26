// Wrapper for sessionStorage logic - stores completion timestamps only
const COMPLETION_KEY = 'todo-completions';

interface CompletionRecord {
  [taskId: string]: string; // taskId -> ISO timestamp
}

/**
 * Get all completion timestamps from sessionStorage
 */
export function getCompletions(): CompletionRecord {
  try {
    const data = sessionStorage.getItem(COMPLETION_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

/**
 * Save a completion timestamp for a task
 */
export function saveCompletion(taskId: string, timestamp: string): void {
  const completions = getCompletions();
  completions[taskId] = timestamp;
  sessionStorage.setItem(COMPLETION_KEY, JSON.stringify(completions));
}

/**
 * Remove a completion timestamp for a task
 */
export function removeCompletion(taskId: string): void {
  const completions = getCompletions();
  delete completions[taskId];
  sessionStorage.setItem(COMPLETION_KEY, JSON.stringify(completions));
}

/**
 * Get a specific completion timestamp
 */
export function getCompletion(taskId: string): string | undefined {
  const completions = getCompletions();
  return completions[taskId];
}
