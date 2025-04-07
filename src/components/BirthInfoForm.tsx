// src/components/BirthDateTimeForm.tsx
'use client';

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { format, setHours, setMinutes } from 'date-fns';

interface BirthDateTimeFormProps {
  onDateChange: (dateStr: string) => void;
  onTimeChange: (timeStr: string, isUnknown: boolean) => void;
  className?: string;
}

export default function BirthDateTimeForm({ 
  onDateChange, 
  onTimeChange, 
  className = '' 
}: BirthDateTimeFormProps) {
  // 현재 날짜 가져오기
  const currentYear = new Date().getFullYear();
  
  // 날짜 관련 상태
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [year, setYear] = useState(currentYear - 30);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  
  // 시간 관련 상태
  const [isTimeUnknown, setIsTimeUnknown] = useState(false);
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [ampm, setAmpm] = useState('AM');
  
  // 숨겨진 DatePicker 참조
  const [hiddenDate, setHiddenDate] = useState<Date | null>(
    new Date(currentYear - 30, 0, 1, 12, 0)
  );
  
  // 선택된 월에 따라 일(day) 옵션 업데이트
  useEffect(() => {
    const getDaysInMonth = (year: number, month: number) => {
      return new Date(year, month, 0).getDate();
    };
    
    const numDays = getDaysInMonth(Number(year), Number(month));
    setDaysInMonth(Array.from({ length: numDays }, (_, i) => i + 1));
    
    // 만약 선택된 일이 현재 월의 최대 일수보다 크다면 일을 1로 리셋
    if (day > numDays) {
      setDay(1);
    }
  }, [year, month, day]);
  
  // 드롭다운 값이 바뀔 때 hiddenDate 업데이트
  useEffect(() => {
    // 날짜 문자열 생성 (YYYY-MM-DD)
    const newDate = new Date(year, month - 1, day);
    setHiddenDate(newDate);
    
    // 상위 컴포넌트에 날짜 전달
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
    onDateChange(dateStr);
  }, [year, month, day, onDateChange]);
  
  // 시간이 바뀔 때 hiddenDate 업데이트 및 상위 컴포넌트에 알림
  useEffect(() => {
    if (hiddenDate) {
      let hour = hours;
      
      // AM/PM 처리
      if (ampm === 'PM' && hour < 12) {
        hour += 12;
      } else if (ampm === 'AM' && hour === 12) {
        hour = 0;
      }
      
      // 시간 문자열 생성 (HH:MM)
      const timeStr = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      onTimeChange(timeStr, isTimeUnknown);
    }
  }, [hours, minutes, ampm, isTimeUnknown, hiddenDate, onTimeChange]);
  
  // hiddenDate가 바뀔 때 드롭다운 값도 업데이트
  useEffect(() => {
    if (hiddenDate) {
      setYear(hiddenDate.getFullYear());
      setMonth(hiddenDate.getMonth() + 1);
      setDay(hiddenDate.getDate());
      
      let hour = hiddenDate.getHours();
      const newAmpm = hour >= 12 ? 'PM' : 'AM';
      
      // 12시간제로 변환
      if (hour > 12) {
        hour -= 12;
      } else if (hour === 0) {
        hour = 12;
      }
      
      setHours(hour);
      setMinutes(hiddenDate.getMinutes());
      setAmpm(newAmpm);
    }
  }, [hiddenDate]);
  
  // 현재 연도에서 100년 전까지의 연도 배열 생성
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  
  // 월 배열 생성 (1-12)
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className={className}>
      {/* 숨겨진 DatePicker (실제로는 사용자에게 보이지 않음) */}
      <div className="hidden">
        <DatePicker
          selected={hiddenDate}
          onChange={(date) => {
            setHiddenDate(date);
          }}
          showTimeSelect
          locale={ko}
        />
      </div>
      
      {/* 생년월일 선택 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          생년월일
        </label>
        <div className="grid grid-cols-3 gap-2">
          {/* 연도 선택 */}
          <div>
            <label htmlFor="year" className="sr-only">연도</label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}년</option>
              ))}
            </select>
          </div>
          
          {/* 월 선택 */}
          <div>
            <label htmlFor="month" className="sr-only">월</label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {months.map((m) => (
                <option key={m} value={m}>{m}월</option>
              ))}
            </select>
          </div>
          
          {/* 일 선택 */}
          <div>
            <label htmlFor="day" className="sr-only">일</label>
            <select
              id="day"
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {daysInMonth.map((d) => (
                <option key={d} value={d}>{d}일</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* 태어난 시간 */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700">
            태어난 시간
          </label>
          
          <div className="flex items-center space-x-2">
            <label htmlFor="timeUnknown" className="text-sm text-gray-500">
                시간을 모름
            </label>
            <input
              type="checkbox"
              id="timeUnknown"
              checked={isTimeUnknown}
              onChange={(e) => setIsTimeUnknown(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            /> 
          </div>
        </div>
        
        {!isTimeUnknown && (
          <div className="grid grid-cols-3 gap-2">
            {/* 시간 선택 */}
            <div>
              <label htmlFor="hours" className="sr-only">시간</label>
              <select
                id="hours"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                  <option key={h} value={h}>{h}시</option>
                ))}
              </select>
            </div>
            
            {/* 분 선택 */}
            <div>
              <label htmlFor="minutes" className="sr-only">분</label>
              <select
                id="minutes"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {Array.from({ length: 12 }, (_, i) => i * 5).map((m) => (
                  <option key={m} value={m}>{String(m).padStart(2, '0')}분</option>
                ))}
              </select>
            </div>
            
            {/* AM/PM 선택 */}
            <div>
              <label htmlFor="ampm" className="sr-only">오전/오후</label>
              <select
                id="ampm"
                value={ampm}
                onChange={(e) => setAmpm(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="AM">오전</option>
                <option value="PM">오후</option>
              </select>
            </div>
          </div>
        )}
        
        {isTimeUnknown && (
          <p className="text-sm text-gray-500 italic">
            시간을 모르는 경우에도 테스트 결과를 제공해 드립니다.
          </p>
        )}
      </div>
    </div>
  );
}