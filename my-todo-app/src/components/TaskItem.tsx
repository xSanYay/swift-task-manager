import { useState } from 'react';
import { Task } from '../types/task';
import TaskEditor from './TaskEditor';
import DateTimePicker from './DateTimePicker';

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onAddSubtask: (parentId: string, title: string) => void;
  depth?: number;
}

/**
 * Individual task item with nested subtasks support
 * Modern design with inline icon buttons and tooltips
 */
export default function TaskItem({
  task,
  onUpdate,
  onDelete,
  onToggleComplete,
  onAddSubtask,
  depth = 0,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [showDeadlinePicker, setShowDeadlinePicker] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);

  const isOverdue = task.deadline && !task.completedAt && new Date(task.deadline) < new Date();

  const handleSaveEdit = (title: string) => {
    onUpdate(task.id, { title });
    setIsEditing(false);
  };

  const handleSaveSubtask = (title: string) => {
    onAddSubtask(task.id, title);
    setIsAddingSubtask(false);
  };

  const handleDeadlineChange = (deadline: string) => {
    onUpdate(task.id, { deadline: deadline || undefined });
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleMouseEnter = (buttonName: string) => {
    const timer = setTimeout(() => {
      setHoveredButton(buttonName);
    }, 3000);
    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
    setHoveredButton(null);
  };

  return (
    <li className={`${depth > 0 ? 'ml-6' : ''}`}>
      <div className="group relative flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={!!task.completedAt}
          onChange={() => onToggleComplete(task.id)}
          className="w-5 h-5 text-blue-600 rounded-md focus:ring-2 focus:ring-blue-500 cursor-pointer flex-shrink-0"
          aria-label={`Mark "${task.title}" as ${task.completedAt ? 'incomplete' : 'complete'}`}
        />

        {/* Task content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <TaskEditor
              initialTitle={task.title}
              onSave={handleSaveEdit}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-base font-medium ${
                    task.completedAt ? 'line-through text-gray-400' : 'text-gray-900'
                  }`}
                >
                  {task.title}
                </span>

                {/* Deadline badge */}
                {task.deadline && (
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      isOverdue
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {formatDeadline(task.deadline)}
                  </span>
                )}
              </div>

              {/* Completion timestamp */}
              {task.completedAt && (
                <div className="text-sm text-green-600 mt-1 font-medium">
                  ✓ Completed: {task.completedAt}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action buttons - Modern icon bar */}
        {!isEditing && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {/* Edit button */}
            <div className="relative">
              <button
                onClick={() => setIsEditing(true)}
                onMouseEnter={() => handleMouseEnter('edit')}
                onMouseLeave={handleMouseLeave}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="Edit task"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              {hoveredButton === 'edit' && (
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                  Edit
                </div>
              )}
            </div>

            {/* Deadline button */}
            <div className="relative">
              <button
                onClick={() => setShowDeadlinePicker(true)}
                onMouseEnter={() => handleMouseEnter('deadline')}
                onMouseLeave={handleMouseLeave}
                className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                aria-label="Set deadline"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              {hoveredButton === 'deadline' && (
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                  Deadline
                </div>
              )}
            </div>

            {/* Add subtask button */}
            <div className="relative">
              <button
                onClick={() => setIsAddingSubtask(true)}
                onMouseEnter={() => handleMouseEnter('subtask')}
                onMouseLeave={handleMouseLeave}
                className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                aria-label="Add subtask"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              {hoveredButton === 'subtask' && (
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                  Add Subtask
                </div>
              )}
            </div>

            {/* Delete button */}
            <div className="relative">
              <button
                onClick={() => onDelete(task.id)}
                onMouseEnter={() => handleMouseEnter('delete')}
                onMouseLeave={handleMouseLeave}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Delete task"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              {hoveredButton === 'delete' && (
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                  Delete
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Subtasks */}
      {task.children.length > 0 && (
        <ul className="mt-2 space-y-2">
          {task.children.map((child) => (
            <TaskItem
              key={child.id}
              task={child}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
              onAddSubtask={onAddSubtask}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}

      {/* Add subtask editor */}
      {isAddingSubtask && (
        <div className="ml-6 mt-2">
          <TaskEditor
            onSave={handleSaveSubtask}
            onCancel={() => setIsAddingSubtask(false)}
          />
        </div>
      )}

      {/* Deadline picker modal */}
      {showDeadlinePicker && (
        <DateTimePicker
          value={task.deadline}
          onChange={handleDeadlineChange}
          onClose={() => setShowDeadlinePicker(false)}
        />
      )}
    </li>
  );
}
