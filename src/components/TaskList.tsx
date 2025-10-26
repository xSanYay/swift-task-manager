import { useState } from 'react';
import { Task } from '../types/task';
import TaskItem from './TaskItem';
import TaskEditor from './TaskEditor';

interface TaskListProps {
  tasks: Task[];
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onAddTask: (title: string) => void;
  onAddSubtask: (parentId: string, title: string) => void;
}

/**
 * Main task list component
 * Manages top-level tasks and displays them
 */
export default function TaskList({
  tasks,
  onUpdate,
  onDelete,
  onToggleComplete,
  onAddTask,
  onAddSubtask,
}: TaskListProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTask = (title: string) => {
    onAddTask(title);
    setIsAdding(false);
  };

  return (
    <div className="space-y-4">
      {/* Add task button */}
      <div>
        {isAdding ? (
          <TaskEditor
            onSave={handleAddTask}
            onCancel={() => setIsAdding(false)}
          />
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            + Add New Task
          </button>
        )}
      </div>

      {/* Task list */}
      {tasks.length > 0 ? (
        <ul className="space-y-3" role="list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
              onAddSubtask={onAddSubtask}
            />
          ))}
        </ul>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No tasks yet. Add your first task to get started!</p>
        </div>
      )}
    </div>
  );
}
