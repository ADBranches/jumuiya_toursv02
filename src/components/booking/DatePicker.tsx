// src/components/booking/DatePicker.tsx - USE THIS VERSION
import React from "react";
import dayjs from "dayjs";

interface DatePickerProps {
  label: string;
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
}

export default function DatePicker({
  label,
  startDate,
  endDate,
  onChange,
}: DatePickerProps) {
  const today = dayjs().format("YYYY-MM-DD");

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = e.target.value;
    console.log("📅 Start date selected:", newStart);
    onChange(newStart, endDate);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = e.target.value;
    console.log("📅 End date selected:", newEnd);
    onChange(startDate, newEnd);
  };

  console.log("📅 DatePicker Debug:", { 
    startDate, 
    endDate,
    today
  });

  return (
    <div className="space-y-4">
      <label className="text-sm text-gray-300 mb-2 block">{label}</label>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Start Date</label>
          <input
            type="date"
            value={startDate}
            min={today}
            onChange={handleStartChange}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="text-xs text-gray-400 mb-1 block">End Date</label>
          <input
            type="date"
            value={endDate}
            min={startDate || today}
            onChange={handleEndChange}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Debug info */}
      <div className="bg-blue-900/20 p-3 rounded text-xs">
        <p><strong>Selected Dates:</strong></p>
        <p>Form Start: {startDate || "Not set"}</p>
        <p>Form End: {endDate || "Not set"}</p>
      </div>
    </div>
  );
}