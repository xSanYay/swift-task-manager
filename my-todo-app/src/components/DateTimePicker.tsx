import { useState } from 'react';

interface DateTimePickerProps {
  value?: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

/**
 * Simple date/time picker component
 * Uses native HTML5 datetime-local input for accessibility
 */
export default function DateTimePicker({ value, onChange, onClose }: DateTimePickerProps) {
  const [dateTime, setDateTime] = useState(value || '');

  const handleSave = () => {
    onChange(dateTime);
    onClose();
  };

  const handleClear = () => {
    onChange('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold mb-4">Set Deadline</h3>
        
        <label className="block mb-4">
          <span className="text-sm text-gray-700 mb-2 block">Date and Time</span>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        </label>

        <div className="flex gap-2 justify-end">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Clear
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
