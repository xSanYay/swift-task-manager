import { useState, useEffect, useCallback } from 'react';
import { Task } from './types/task';
import TaskList from './components/TaskList';
import ExportButton from './components/ExportButton';
import { getCompletion, saveCompletion, removeCompletion } from './utils/storage';
import './App.css';

// Sample demo dataset with nested tasks
const DEMO_TASKS: Task[] = [
  {
    id: '1',
    title: 'Plan weekend trip',
    deadline: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 16), // 2 days from now
    children: [
      {
        id: '1-1',
        title: 'Book hotel',
        children: [],
      },
      {
        id: '1-2',
        title: 'Pack luggage',
        children: [
          {
            id: '1-2-1',
            title: 'Pack clothes',
            children: [],
          },
          {
            id: '1-2-2',
            title: 'Pack toiletries',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Complete React project',
    deadline: new Date(Date.now() + 86400000 * 5).toISOString().slice(0, 16), // 5 days from now
    children: [
      {
        id: '2-1',
        title: 'Set up components',
        children: [],
      },
      {
        id: '2-2',
        title: 'Add styling',
        children: [],
      },
      {
        id: '2-3',
        title: 'Write tests',
        children: [],
      },
    ],
  },
  {
    id: '3',
    title: 'Learn TypeScript',
    children: [],
  },
];

function App() {
  // Store tasks in React state (could also use localStorage if persistence beyond session is desired)
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Try to load from localStorage, fallback to demo data
    const saved = localStorage.getItem('todo-tasks');
    return saved ? JSON.parse(saved) : DEMO_TASKS;
  });

  // Sync completion timestamps from sessionStorage on mount and when tasks change
  useEffect(() => {
    const syncCompletions = (taskList: Task[]): Task[] => {
      return taskList.map((task) => ({
        ...task,
        completedAt: getCompletion(task.id),
        children: syncCompletions(task.children),
      }));
    };

    setTasks((prevTasks) => syncCompletions(prevTasks));
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Generate unique ID for new tasks
  const generateId = useCallback(() => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Recursively find and update a task
  const updateTaskRecursive = useCallback(
    (taskList: Task[], id: string, updates: Partial<Task>): Task[] => {
      return taskList.map((task) => {
        if (task.id === id) {
          return { ...task, ...updates };
        }
        if (task.children.length > 0) {
          return {
            ...task,
            children: updateTaskRecursive(task.children, id, updates),
          };
        }
        return task;
      });
    },
    []
  );

  // Recursively find and delete a task
  const deleteTaskRecursive = useCallback((taskList: Task[], id: string): Task[] => {
    return taskList
      .filter((task) => task.id !== id)
      .map((task) => ({
        ...task,
        children: deleteTaskRecursive(task.children, id),
      }));
  }, []);

  // Add a new top-level task
  const handleAddTask = useCallback(
    (title: string) => {
      const newTask: Task = {
        id: generateId(),
        title,
        children: [],
      };
      setTasks((prev) => [...prev, newTask]);
    },
    [generateId]
  );

  // Add a subtask to a parent task
  const handleAddSubtask = useCallback(
    (parentId: string, title: string) => {
      const newSubtask: Task = {
        id: generateId(),
        title,
        children: [],
      };

      const addSubtaskRecursive = (taskList: Task[]): Task[] => {
        return taskList.map((task) => {
          if (task.id === parentId) {
            return {
              ...task,
              children: [...task.children, newSubtask],
            };
          }
          return {
            ...task,
            children: addSubtaskRecursive(task.children),
          };
        });
      };

      setTasks((prev) => addSubtaskRecursive(prev));
    },
    [generateId]
  );

  // Update a task
  const handleUpdateTask = useCallback(
    (id: string, updates: Partial<Task>) => {
      setTasks((prev) => updateTaskRecursive(prev, id, updates));
    },
    [updateTaskRecursive]
  );

  // Delete a task
  const handleDeleteTask = useCallback(
    (id: string) => {
      // Also remove from sessionStorage
      removeCompletion(id);
      setTasks((prev) => deleteTaskRecursive(prev, id));
    },
    [deleteTaskRecursive]
  );

  // Toggle task completion
  const handleToggleComplete = useCallback((id: string) => {
    setTasks((prev) => {
      const toggleRecursive = (taskList: Task[]): Task[] => {
        return taskList.map((task) => {
          if (task.id === id) {
            const isCompleting = !task.completedAt;
            let completedAt: string | undefined;

            if (isCompleting) {
              // Mark as complete - save timestamp to sessionStorage
              const now = new Date();
              completedAt = now.toISOString().slice(0, 19).replace('T', ' ');
              saveCompletion(id, completedAt);
            } else {
              // Mark as incomplete - remove from sessionStorage
              removeCompletion(id);
              completedAt = undefined;
            }

            return { ...task, completedAt };
          }
          return {
            ...task,
            children: toggleRecursive(task.children),
          };
        });
      };

      return toggleRecursive(prev);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Task Manager</h1>
          <p className="text-gray-600">
            Manage your tasks with nested subtasks and deadlines.
          </p>
        </header>

        <div className="mb-6">
          <ExportButton tasks={tasks} />
        </div>

        <main>
          <TaskList
            tasks={tasks}
            onAddTask={handleAddTask}
            onAddSubtask={handleAddSubtask}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        </main>
      </div>
    </div>
  );
}

export default App;