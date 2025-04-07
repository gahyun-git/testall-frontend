// src/components/PastLifeForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BirthDateTimeForm from './BirthInfoForm';

export default function PastLifeForm() {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('12:00');
  const [isTimeUnknown, setIsTimeUnknown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!birthDate) {
      alert('생년월일을 입력해주세요.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // 백엔드에 전생 정보 요청하기
      const response = await fetch('http://localhost:8000/api/tests/past-life/take-test/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          birth_date: birthDate,
          birth_time: birthTime,
          is_time_unknown: isTimeUnknown,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // 결과 페이지로 이동
        router.push(`/past-life/result?id=${data.result_id}`);
      } else {
        alert('에러가 발생했습니다: ' + (data.error || '알 수 없는 오류'));
      }
    } catch (error) {
      alert('요청 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeChange = (time: string, isUnknown: boolean) => {
    setBirthTime(time);
    setIsTimeUnknown(isUnknown);
  };

  return (
    <div className="max-w-md mx-auto overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="px-8 pt-8 pb-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-800 mb-2">당신의 전생은?</h2>
          <p className="text-purple-600">생년월일과 태어난 시간으로 전생의 모습을 알아보세요</p>
          <div className="mt-4 w-16 h-1 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <BirthDateTimeForm 
            onDateChange={setBirthDate} 
            onTimeChange={handleTimeChange} 
          />
          
          <button
            type="submit"
            disabled={isLoading || !birthDate}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                결과 생성 중...
              </div>
            ) : (
              '전생 알아보기'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}