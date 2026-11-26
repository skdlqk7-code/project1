import React, { useState } from 'react';
import { User, Calendar, Mail, Lock, Sparkles, ChevronRight } from 'lucide-react';

/**
 * 3번 요구사항:
 * 스플래시 이후 진입하는 회원가입 및 기본 인적사항 입력 화면
 * (이름, 생년월일, 성별, 이메일, 비밀번호)
 */
export default function SignupStep({ onComplete, onSocialQuick }) {
  const [name, setName] = useState('현진');
  const [birthDate, setBirthDate] = useState('950815');
  const [gender, setGender] = useState('female'); // 'female' | 'male'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete({
      name: name.trim() || '미니님',
      birthDate,
      gender,
      email: email.trim() || 'user@miniwarming.com',
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F7FB] flex justify-center font-sans">
      <div className="w-full max-w-[430px] bg-white min-h-screen flex flex-col justify-between p-6 shadow-xl">
        <div>
          {/* 상단 프로그레스 안내 */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#6B2896]/10 text-[#6B2896]">
              STEP 0 · 기본 회원가입
            </span>
            <span className="text-[11px] font-bold text-stone-400">1 / 4 단계</span>
          </div>

          <h1 className="text-2xl font-black leading-snug mb-1 text-stone-900">
            반가워요!<br />기본 정보를 알려주세요
          </h1>
          <p className="text-xs text-stone-500 mb-5">
            아바타 프로필 생성과 동네 인증에 사용됩니다.
          </p>

          {/* 소셜 3초 간편가입 버튼 (카톡 & 구글) */}
          <div className="space-y-2 mb-4 pb-4 border-b border-stone-100">
            <button
              type="button"
              onClick={() => onSocialQuick('카카오')}
              className="w-full py-2.5 rounded-2xl bg-[#FEE500] hover:bg-[#FDD835] text-[#3C1E1E] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <span className="font-black">💬</span>
              <span>카카오로 3초 만에 빠른 시작</span>
            </button>
            <button
              type="button"
              onClick={() => onSocialQuick('Google')}
              className="w-full py-2.5 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              <span className="font-bold text-blue-500">G</span>
              <span>Google 계정으로 빠른 시작</span>
            </button>
          </div>

          {/* 인적사항 입력 폼 */}
          <form id="signup-form" onSubmit={handleSubmit} className="space-y-3.5">
            {/* 1. 이름 (활동명) */}
            <div>
              <label className="text-[11px] font-bold text-stone-700 block mb-1">
                이름 (활동명)
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예: 김현진 / 송도맘"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-2xl border border-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#6B2896]"
                />
              </div>
            </div>

            {/* 2. 생년월일 (6자리) & 성별 선택 */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">
                  생년월일 (6자리)
                </label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="YYMMDD (예: 950815)"
                    className="w-full pl-8 pr-2.5 py-2.5 rounded-2xl border border-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#6B2896]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">
                  성별 (미니미 체형)
                </label>
                <div className="grid grid-cols-2 gap-1 bg-[#F6F7FB] p-1 rounded-2xl border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      gender === 'female'
                        ? 'bg-[#6B2896] text-white shadow-xs'
                        : 'text-stone-500'
                    }`}
                  >
                    여성 👩
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      gender === 'male'
                        ? 'bg-[#6B2896] text-white shadow-xs'
                        : 'text-stone-500'
                    }`}
                  >
                    남성 👨
                  </button>
                </div>
              </div>
            </div>

            {/* 3. 이메일 주소 */}
            <div>
              <label className="text-[11px] font-bold text-stone-700 block mb-1">
                이메일 주소
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com (선택)"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-2xl border border-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#6B2896]"
                />
              </div>
            </div>

            {/* 4. 비밀번호 */}
            <div>
              <label className="text-[11px] font-bold text-stone-700 block mb-1">
                비밀번호
              </label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호 입력 (6자 이상)"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-2xl border border-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#6B2896]"
                />
              </div>
            </div>
          </form>
        </div>

        {/* 하단 다음 버튼 */}
        <div className="pt-4">
          <button
            type="submit"
            form="signup-form"
            className="w-full py-3.5 rounded-3xl bg-[#6B2896] hover:bg-[#521c75] text-white text-xs font-black shadow-lg cursor-pointer flex items-center justify-center gap-1.5 transition-transform active:scale-98"
          >
            <span>다음: 맞춤 모임 취향 고르기</span>
            <ChevronRight className="w-4 h-4 text-[#00D084]" />
          </button>
        </div>
      </div>
    </div>
  );
}
