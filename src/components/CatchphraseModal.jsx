import React from 'react';
import { Sparkles, MessageCircle, Heart, X, Check } from 'lucide-react';
import { APP_CATCHPHRASES } from '../constants/data';

/**
 * 6번 요구사항:
 * 당근마켓의 "당근...이세요?"처럼,
 * 실물 얼굴 대신 아바타(미니미)로 만나는 우리 앱만의 시그니처 첫인사 팝업!
 */
export default function CatchphraseModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-[380px] bg-white rounded-3xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 relative border border-stone-100">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-stone-100 cursor-pointer"
        >
          <X className="w-5 h-5 text-stone-400" />
        </button>

        {/* 뱃지 & 아이콘 */}
        <div className="flex flex-col items-center text-center pt-2">
          <div className="w-16 h-16 rounded-3xl bg-[#FF6B57]/10 flex items-center justify-center text-3xl mb-3 shadow-inner">
            🌱
          </div>
          <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-[#FF6B57] text-white uppercase tracking-wider mb-1.5">
            우리 동네 만남의 암호 🔑
          </span>
          <h3 className="text-xl font-black text-stone-900 mt-1">
            “혹시... 미니...?”
          </h3>
          <p className="text-xs text-stone-500 mt-1 leading-relaxed">
            당근에 "당근이세요?"가 있다면,<br />
            우리 앱에선 <strong>아바타 미니미</strong>로 인사해요!
          </p>
        </div>

        {/* 설명 카드 */}
        <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-2 text-xs">
          <div className="flex items-start gap-2">
            <span className="text-base">☕</span>
            <p className="text-stone-700 leading-relaxed">
              <strong>카페나 공원에서 첫 모임할 때</strong><br />
              어색하게 서성이지 말고 살짝 속삭여보세요:<br />
              <span className="text-[#FF6B57] font-bold">"혹시... 미니님이세요? 😊"</span>
            </p>
          </div>
          <div className="flex items-start gap-2 pt-1 border-t border-stone-200/60">
            <span className="text-base">🎙️</span>
            <p className="text-stone-700 leading-relaxed">
              <strong>라이브룸에 들어왔을 때도</strong><br />
              "미니님들 안녕하세요!"로 반갑게 워밍업 시작!
            </p>
          </div>
        </div>

        {/* 암호 후보 안내 */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-bold text-stone-400">💡 상황별 암호 가이드</p>
          {APP_CATCHPHRASES.options.map((opt, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-xl bg-stone-50 text-xs"
            >
              <div>
                <span className="font-bold text-stone-800">{opt.title}</span>
                <span className="text-[10px] text-stone-400 ml-1.5">({opt.desc})</span>
              </div>
              <span className="text-[10px] font-semibold text-[#FF6B57]">{opt.badge}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-[#FF6B57] hover:bg-[#f05a46] text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
        >
          암호 기억하고 시작하기! 👍
        </button>
      </div>
    </div>
  );
}
