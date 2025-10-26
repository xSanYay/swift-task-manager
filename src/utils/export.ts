import { Task } from '../types/task';

/**
 * Build a plain text export of completed tasks with their completion timestamps
 * Format:
 * Task: Buy groceries
 *   Subtask: Buy milk — Completed: 2025-10-26 11:05:21
 *   Subtask: Buy eggs — Completed: 2025-10-26 11:07:10
 */
export function buildExportText(tasks: Task[]): string {
  const lines: string[] = [];
  
  function processTask(task: Task, depth: number = 0) {
    const indent = '  '.repeat(depth);
    const prefix = depth === 0 ? 'Task: ' : 'Subtask: ';
    
    if (task.completedAt) {
      lines.push(`${indent}${prefix}${task.title} — Completed: ${task.completedAt}`);
    }
    
    // Process children recursively
    task.children.forEach(child => processTask(child, depth + 1));
  }
  
  tasks.forEach(task => processTask(task));
  
  return lines.length > 0 ? lines.join('\n') : 'No completed tasks in this session.';
}

/**
 * Download text as a .txt file
 */
export function downloadTextFile(content: string, filename: string = 'session-data.txt'): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
