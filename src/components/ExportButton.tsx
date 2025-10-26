import { buildExportText, downloadTextFile } from '../utils/export';
import { Task } from '../types/task';

interface ExportButtonProps {
  tasks: Task[];
}

/**
 * Export button - downloads session data as .txt file
 * Only exports tasks that have completion timestamps
 */
export default function ExportButton({ tasks }: ExportButtonProps) {
  const handleExport = () => {
    const text = buildExportText(tasks);
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', '_').replace(/:/g, '-');
    downloadTextFile(text, `todo-session-${timestamp}.txt`);
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
      aria-label="Download session data"
    >
      📥 Download Session Data
    </button>
  );
}
