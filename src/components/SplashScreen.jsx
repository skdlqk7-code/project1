import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

/**
 * 1번 & 2번 요구사항:
 * - 앱 이름: 미니워밍 (MiniWarming)
 * - 앱 로고 스플래시 첫 화면
 */
export default function SplashScreen({ onStart }) {
  const [dots, setDots] = useState('');

  // 2.2초 후 자동으로 회원가입 화면으로 전환
  useEffect(() => {
    const timer = setTimeout(() => {
      onStart();
    }, 2400);

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onStart]);

  return (
    <div className="min-h-screen bg-[#6B2896] flex justify-center items-center font-sans select-none relative overflow-hidden">
      {/* 배경 장식 원형 블러 효과 */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#00D084]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#521C75] rounded-full blur-2xl pointer-events-none" />

      <div className="w-full max-w-[430px] min-h-screen flex flex-col justify-between p-8 text-center relative z-10">
        <div className="w-full" />

        {/* 중앙 브랜드 로고 및 타이포그래피 */}
        <div className="space-y-6 flex flex-col items-center animate-in zoom-in-95 duration-500">
          {/* 앱 픽셀 심볼 로고 */}
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-white to-[#F3EBF8] flex items-center justify-center text-5xl shadow-2xl border-4 border-white/30 transform hover:rotate-6 transition-transform">
              🌱
            </div>
            {/* 우하단 네온 라임 배지 */}
            <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-2xl bg-[#00D084] text-white flex items-center justify-center text-lg shadow-lg border-2 border-[#6B2896] animate-bounce">
              ☕
            </div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00D084]/20 border border-[#00D084]/40 text-[#76E05B] text-xs font-black tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> 동네 아바타 워밍업 소셜
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight drop-shadow-sm">
              미니워밍
            </h1>
            <p className="text-sm font-bold text-purple-200 tracking-widest uppercase">
              MiniWarming
            </p>
          </div>

          <p className="text-xs text-purple-100/90 leading-relaxed max-w-[260px] pt-1 font-medium">
            어색한 침묵 없이,<br />
            아바타 미니미로 만나는 우리 동네 이야기
          </p>
        </div>

        {/* 하단 로딩 표시 및 바로 시작 버튼 */}
        <div className="space-y-3 pt-8 pb-4">
          <p className="text-xs text-purple-200/80 font-bold">
            동네 이웃을 연결하는 중{dots}
          </p>

          <button
            type="button"
            onClick={onStart}
            className="w-full py-4 rounded-3xl bg-white hover:bg-stone-50 text-[#6B2896] text-xs font-black shadow-xl cursor-pointer flex items-center justify-center gap-2 transition-transform active:scale-98"
          >
            <span>미니워밍 시작하기</span>
            <ArrowRight className="w-4 h-4 text-[#00D084]" />
          </button>
        </div>
      </div>
    </div>
  );
}
