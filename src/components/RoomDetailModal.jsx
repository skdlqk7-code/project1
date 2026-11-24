import React from 'react';
import { X } from 'lucide-react';

export default function RoomDetailModal({ room, onClose, onEnter }) {
  if (!room) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs flex items-end justify-center">
      <div className="w-full max-w-[430px] bg-white rounded-t-3xl p-5 space-y-3 shadow-2xl animate-in fade-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#FF6B57]">
            {room.category} · {room.mode}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5 text-stone-400" />
          </button>
        </div>
        <h3 className="text-lg font-bold text-stone-900">{room.title}</h3>
        <p className="text-xs text-stone-500">{room.subtitle}</p>
        <div className="p-3 rounded-xl bg-emerald-50 text-xs text-emerald-800 leading-relaxed">
          🛡️ <strong>노쇼 방지 안내:</strong> {room.noShowNote}
        </div>
        <button
          type="button"
          onClick={() => onEnter(room)}
          className="w-full py-3.5 rounded-2xl bg-[#FF6B57] hover:bg-[#f05a46] text-white text-sm font-bold shadow-md cursor-pointer transition-colors"
        >
          5초 카운트다운 방 입장하기
        </button>
      </div>
    </div>
  );
}
