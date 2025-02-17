import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="text-white rounded-xl shadow-lg p-6 w-80 border-[0.5px] border-white/40">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="py-1.5 px-3 hover:bg-white/20 cursor-pointer rounded-full text-gray-300"
        >
          &lt;
        </button>
        <h2 className="text-lg font-semibold">{format(currentDate, 'MMMM yyyy')}</h2>
        <button
          onClick={nextMonth}
          className="py-1.5 px-3 hover:bg-white/20 cursor-pointer rounded-full text-gray-300"
        >
          &gt;
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-400">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((date) => (
          <button
            key={date.toString()}
            onClick={() => setSelectedDate(date)}
            className={`p-2 text-sm rounded-full 
              ${isSameMonth(date, currentDate) ? 'text-gray-100' : 'text-gray-600'}
              ${isSameDay(date, selectedDate) ? 'bg-blue-500 text-white hover:bg-blue-600' : 'hover:bg-gray-700'}
            `}
          >
            {format(date, 'd')}
          </button>
        ))}
      </div>
    </div>
  );
}
