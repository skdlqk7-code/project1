import React, { useState } from 'react';
import { X, Palette } from 'lucide-react';
import { ROOM_BACKGROUND_THEMES } from '../constants/data';

export default function CreateRoomModal({
  selectedDistrict,
  onClose,
  onCreate,
}) {
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('마미모임');
  const [newMode, setNewMode] = useState('복합모드');
  const [newTheme, setNewTheme] = useState('living-room');

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = newTitle.trim() || `${selectedDistrict} ${newCategory} 번개방`;
    onCreate({
      title,
      category: newCategory,
      mode: newMode,
      theme: newTheme,
    });
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs flex items-end justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[430px] bg-white rounded-t-3xl p-5 space-y-4 shadow-2xl animate-in fade-in slide-in-from-bottom duration-200 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-stone-900">새 모임 & 워밍업 방 개설</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5 text-stone-400" />
          </button>
        </div>

        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">방 제목</label>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="예: 밤 10시 육퇴 후 가벼운 수다방"
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6B57]"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">카테고리</label>
          <div className="grid grid-cols-3 gap-2">
            {['마미모임', '동네루틴', '원데이'].map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setNewCategory(c)}
                className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  newCategory === c
                    ? 'border-[#FF6B57] bg-[#FF6B57]/10 text-[#FF6B57]'
                    : 'border-stone-200 text-stone-600 hover:border-stone-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* 2번 요구사항: 방장 2D 픽셀 배경 테마 선택 */}
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1.5 flex items-center gap-1">
            <Palette className="w-3.5 h-3.5 text-amber-500" /> 미니 라운지 2D 픽셀 배경 선택
          </label>
          <div className="grid grid-cols-2 gap-2">
            {ROOM_BACKGROUND_THEMES.map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => setNewTheme(t.id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  newTheme === t.id
                    ? 'border-[#FF6B57] bg-[#FF6B57]/10 text-stone-900 font-bold ring-1 ring-[#FF6B57]'
                    : 'border-stone-200 text-stone-600 hover:border-stone-300'
                }`}
              >
                <span className="text-[10px] text-amber-600 font-bold block">{t.tag}</span>
                <p className="text-xs font-bold truncate mt-0.5">{t.name}</p>
                <p className="text-[10px] text-stone-400 truncate">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">
            소통 방식 (방 입장 후 방장이 실시간 변경 가능)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['음성수다', '채팅수다', '복합모드'].map((m) => (
              <button
                type="button"
                key={m}
                onClick={() => setNewMode(m)}
                className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  newMode === m
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-200 text-stone-600 hover:border-stone-300'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-[#FF6B57] hover:bg-[#f05a46] text-white text-sm font-bold shadow-md cursor-pointer transition-colors"
        >
          방 만들고 바로 입장하기
        </button>
      </form>
    </div>
  );
}
