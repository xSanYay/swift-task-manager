# My Todo App

A complete **front-end-only** TODO web application built with React, TypeScript, Vite, and TailwindCSS. This app runs entirely in the browser with no backend required.

## ✨ Features

- ✅ **Nested Subtasks** - Create tasks with arbitrary depth of subtasks
- 📅 **Deadlines** - Set date & time deadlines with visual indicators for overdue tasks
- ⏱️ **Session Completion Tracking** - Completion timestamps stored in `sessionStorage` (session-only)
- 📥 **Export Session Data** - Download completed tasks with timestamps as a `.txt` file
- 🎨 **Clean UI** - Responsive design with TailwindCSS
- ♿ **Accessible** - Keyboard navigation and ARIA labels
- 💾 **Persistent Tasks** - Tasks stored in `localStorage` (completion times in `sessionStorage`)

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Clone or download this repository
cd my-todo-app

# Install dependencies
npm install
```

### Run Locally

```bash
# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
# Build the app
npm run build
```

The production files will be in the `dist/` folder.

### Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

## 📦 Project Structure

```
/my-todo-app
  /public
    index.html
  /src
    main.tsx              # App entry point
    App.tsx               # Main app component with state management
    index.css             # Tailwind base + custom styles
    /components
      TaskList.tsx        # Top-level task list
      TaskItem.tsx        # Individual task with nested subtasks
      TaskEditor.tsx      # Inline editor for add/edit
      DateTimePicker.tsx  # Date & time picker modal
      ExportButton.tsx    # Export session data button
    /types
      task.ts             # TypeScript types for Task
    /utils
      storage.ts          # sessionStorage wrapper
      export.ts           # Export logic (builds .txt)
  package.json
  tsconfig.json
  vite.config.ts
  tailwind.config.cjs
  README.md
```

## 🌐 Deploy to GitHub Pages

### Step 1: Update Configuration

1. Open `package.json` and update the `homepage` field:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/my-todo-app"
   ```

2. Open `vite.config.ts` and ensure the `base` matches your repo name:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/my-todo-app/',
   })
   ```

### Step 2: Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Complete TODO app"

# Create a new repository on GitHub (https://github.com/new)
# Then add the remote and push:
git remote add origin https://github.com/YOUR_USERNAME/my-todo-app.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to GitHub Pages

```bash
# Build and deploy
npm run deploy
```

This will:
1. Build the app (`npm run build`)
2. Push the `dist/` folder to the `gh-pages` branch
3. Your app will be live at `https://YOUR_USERNAME.github.io/my-todo-app`

### Step 4: Enable GitHub Pages (if needed)

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select `gh-pages` branch
4. Click **Save**

Your app will be live in a few minutes! 🎉

## 🎯 Usage

### Adding Tasks
1. Click "**+ Add New Task**" button
2. Enter task title and press **Enter** or click **Save**
3. Optionally set a deadline by clicking "**Set Deadline**"

### Adding Subtasks
1. Click "**+ Add Subtask**" on any task
2. Enter subtask title
3. Subtasks can have their own subtasks (unlimited nesting)

### Setting Deadlines
1. Click "**Set Deadline**" on any task
2. Pick date and time using the native picker
3. Overdue tasks show in red; upcoming deadlines in blue

### Completing Tasks
1. Click the checkbox next to any task
2. Completion timestamp is saved to **sessionStorage**
3. Completed tasks show a green timestamp

### Exporting Session Data
1. Click "**📥 Download Session Data**"
2. A `.txt` file downloads with all completed tasks and their timestamps
3. Format example:
   ```
   Task: Buy groceries
     Subtask: Buy milk — Completed: 2025-10-26 11:05:21
     Subtask: Buy eggs — Completed: 2025-10-26 11:07:10
   Task: Learn React — Completed: 2025-10-26 12:33:02
   ```

### Data Persistence
- **Tasks & deadlines**: Stored in `localStorage` (persists across browser restarts)
- **Completion timestamps**: Stored in `sessionStorage` (cleared when browser tab closes)

## 🛠️ Tech Stack

- **React 18** - UI library with functional components & hooks
- **TypeScript 5** - Type safety
- **Vite 5** - Fast build tool & dev server
- **TailwindCSS 3** - Utility-first CSS framework
- **sessionStorage** - Session-only completion timestamp storage
- **localStorage** - Task data persistence

## 📝 Notes

- No backend required - everything runs in the browser
- No authentication or user accounts
- Session data (completion times) is cleared when you close the browser tab
- Tasks persist in localStorage but can be cleared by browser settings
- Works offline after first load (as a static site)

## 🤝 Contributing

This is a standalone project. Feel free to fork and customize!

## 📄 License

MIT License - feel free to use this project however you'd like.

---

**Built with ❤️ using React, TypeScript, Vite, and TailwindCSS**
