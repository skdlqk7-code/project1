import React from 'react';

export default function MySettings({
  selectedCity,
  selectedDistrict,
  selectedPeople,
  onResetOnboarding,
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-stone-900">마이 설정</h2>
      <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-xs">
        <p className="text-xs text-stone-500">현재 활동 지역</p>
        <p className="font-bold text-sm text-stone-900">
          {selectedCity} · {selectedDistrict}
        </p>

        <p className="text-xs text-stone-500 pt-2">선택한 어울림 키워드</p>
        <p className="font-bold text-sm text-stone-900">
          {selectedPeople.length > 0 ? selectedPeople.join(', ') : '아직 미선택'}
        </p>

        <button
          type="button"
          onClick={onResetOnboarding}
          className="mt-3 w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-bold text-stone-800 transition-colors cursor-pointer"
        >
          관심사·동네 온보딩 다시 하기
        </button>
      </div>
    </div>
  );
}
