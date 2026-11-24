import React, { useState } from 'react';
import { X, Mail, Lock, User, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [loginToast, setLoginToast] = useState('');

  if (!isOpen) return null;

  // 카카오 로그인 시뮬레이션
  const handleKakaoLogin = () => {
    setLoginToast('카카오 계정으로 간편 로그인되었습니다! 💛');
    setTimeout(() => {
      onLoginSuccess({
        id: 'user-kakao',
        name: '카카오미니',
        provider: 'kakao',
        email: 'kakao_user@kakao.com',
      });
      onClose();
    }, 1000);
  };

  // 구글 로그인 시뮬레이션
  const handleGoogleLogin = () => {
    setLoginToast('Google 계정으로 로그인되었습니다! 🌐');
    setTimeout(() => {
      onLoginSuccess({
        id: 'user-google',
        name: '구글미니',
        provider: 'google',
        email: 'google_user@gmail.com',
      });
      onClose();
    }, 1000);
  };

  // 이메일 로그인 / 회원가입
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    const userName = isRegisterMode ? (nickname.trim() || '새내기미니') : '현진';
    setLoginToast(
      isRegisterMode
        ? `🎉 환영합니다! ${userName}님 회원가입이 완료되었습니다.`
        : `👋 어서오세요, ${userName}님 로그인되었습니다!`
    );

    setTimeout(() => {
      onLoginSuccess({
        id: `user-${Date.now()}`,
        name: userName,
        provider: 'email',
        email: email,
      });
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] bg-white rounded-3xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 relative border border-stone-100">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-stone-100 cursor-pointer"
        >
          <X className="w-5 h-5 text-stone-400" />
        </button>

        {/* 상단 타이틀 */}
        <div className="text-center pt-2">
          <div className="w-12 h-12 rounded-2xl bg-[#FF6B57]/10 text-2xl flex items-center justify-center mx-auto mb-2">
            🌱
          </div>
          <h3 className="text-lg font-bold text-stone-900">
            {isRegisterMode ? '동네 미니미 가입하기' : '간편 로그인'}
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            우리 동네 워밍업 & 라이브 미니룸에 오신 것을 환영해요!
          </p>
        </div>

        {loginToast ? (
          <div className="py-8 flex flex-col items-center justify-center space-y-2 text-center animate-fade-in">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 animate-bounce" />
            <p className="text-sm font-bold text-stone-800">{loginToast}</p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {/* 3대 간편 소셜 로그인 버튼: 카카오, 구글, 이메일 */}
            <div className="space-y-2">
              {/* 1. 카카오 로그인 */}
              <button
                type="button"
                onClick={handleKakaoLogin}
                className="w-full py-3 rounded-2xl bg-[#FEE500] hover:bg-[#FDD835] text-[#3C1E1E] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                <span className="font-black text-sm">💬</span>
                <span>카카오로 3초 만에 시작하기</span>
              </button>

              {/* 2. 구글 로그인 */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google 계정으로 계속하기</span>
              </button>
            </div>

            {/* 구분선 */}
            <div className="flex items-center gap-2 my-2">
              <div className="flex-1 h-px bg-stone-200" />
              <span className="text-[10px] text-stone-400 font-medium">또는 이메일로</span>
              <div className="flex-1 h-px bg-stone-200" />
            </div>

            {/* 3. 이메일 로그인 / 회원가입 폼 */}
            <form onSubmit={handleEmailSubmit} className="space-y-2.5">
              {isRegisterMode && (
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    활동 닉네임
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="예: 송도또래맘"
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#FF6B57]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  이메일 주소
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-8 pr-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#FF6B57]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  비밀번호
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호 입력"
                    className="w-full pl-8 pr-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#FF6B57]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#FF6B57] hover:bg-[#f05a46] text-white text-xs font-bold shadow-md cursor-pointer transition-colors mt-2"
              >
                {isRegisterMode ? '회원가입 완료하고 시작하기' : '이메일로 로그인'}
              </button>
            </form>

            {/* 전환 링크 */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                className="text-[11px] text-stone-500 hover:text-stone-800 underline cursor-pointer"
              >
                {isRegisterMode
                  ? '이미 계정이 있으신가요? 로그인하기'
                  : '아직 회원이 아니신가요? 3초 회원가입'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
