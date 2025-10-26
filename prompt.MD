Create a complete front-end-only TODO web app and repo that I can host immediately on GitHub (GitHub Pages). No backend anywhere — everything must run in the browser.

**Tech stack (use this):** React (functional components + hooks), Vite, TypeScript, TailwindCSS. Use `sessionStorage` to record session-only completion timestamps (so data persists only for the browser session), and provide an export button to download session data as a `.txt` file.

**Functional requirements**

1. Tasks with nested subtasks (arbitrary depth). Example: `Task A` → `Task A1`, `Task A2` (subtasks can themselves have subtasks).
2. Add / edit / delete tasks and subtasks.
3. Each task/subtask can have an optional deadline (date + time) set with a simple calendar + clock UI (use an accessible date/time picker or a minimal custom control).
4. Mark any task or subtask as completed. When completed, record the exact ISO timestamp (YYYY-MM-DD HH:MM:SS) **into sessionStorage** for that item.
5. Show completion time beside completed items (from the session).
6. Provide a single “Download session data” button that exports the current session’s tasks and their completion timestamps (only items that have completion timestamps) in a human-readable plain text format. Example format:

```
Task: Buy groceries
  Subtask: Buy milk — Completed: 2025-10-26 11:05:21
  Subtask: Buy eggs — Completed: 2025-10-26 11:07:10
Task: Learn React — Completed: 2025-10-26 12:33:02
```

7. Store all app state (tasks, subtasks, deadlines, and completion timestamps) in React state, persist only the completion timestamps to `sessionStorage` as required; tasks and drafts may be stored in memory (but it’s OK to persist tasks in localStorage too — indicate clearly in code comments if chosen).
8. No authentication, no external APIs, no backend.
9. Responsive, minimal, clean UI. Accessibility-friendly (keyboard navigation, ARIA labels where appropriate).
10. Provide straightforward instructions in README for how to run locally and how to publish to GitHub Pages (including build & dist steps).

**Design & file-structure requirements**

* Provide a full repo with this structure (exact files):

```
/my-todo-app
  /public
    index.html
  /src
    main.tsx
    App.tsx
    index.css (Tailwind base + small custom styles)
    /components
      TaskList.tsx
      TaskItem.tsx
      TaskEditor.tsx
      DateTimePicker.tsx
      ExportButton.tsx
    /types
      task.ts
    /utils
      storage.ts   // wrapper for sessionStorage logic
      export.ts    // builds the text download
  package.json
  tsconfig.json
  vite.config.ts
  tailwind.config.cjs
  README.md
```

**Code quality expectations**

* TypeScript types for tasks and subtasks (id, title, optional deadline ISO, children[], completedAt?: string).
* Componentized, small functions, clear hooks (useTaskState or similar).
* Comments for important bits (sessionStorage handling, export formatting).
* A single small CSS/Tailwind theme; keep UI simple but polished.
* Use semantic HTML (lists for tasks, buttons for actions).

**Behavioral specifics**

* Creating a task: opens an inline editor to set title and optional deadline.
* Adding subtasks: an “Add subtask” button inside each TaskItem.
* Deadline UI: show a small badge with the deadline; if it passes, visually indicate overdue.
* When marking an item completed: set `completedAt` to current browser time (ISO), save that `completedAt` into `sessionStorage` keyed by task id. If unmarking completed, remove the `completedAt` entry from sessionStorage.
* Export button: collects `title` and `completedAt` for all items that have `completedAt` and downloads a `.txt`.
* Provide a sample demo dataset that shows nested tasks on first run.

**Deliverables**

* A complete repo matching the file structure above, ready-to-run (`npm install` → `npm run dev`) and buildable (`npm run build`).
* A `README.md` that explains how to run locally and publish to GitHub Pages (including the `homepage`/publish steps).
* Small screenshots or GIFs are optional but helpful.

**Extra (nice-to-have)**

* Drag-and-drop reordering of tasks (optional).
* Simple unit tests for the export logic (optional).
* Dark mode toggle (optional).

---
