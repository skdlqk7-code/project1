import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  RotateCcw,
  SkipForward,
  Sparkles,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Mic,
  MicOff,
  Volume2,
  Palette,
  Image,
  ExternalLink,
  Tag,
  X,
  Ticket,
} from 'lucide-react';
import { AI_QUESTIONS, ROOM_BACKGROUND_THEMES } from '../constants/data';
import AvatarRenderer from './AvatarRenderer';

// 📺 옥외 스폰서 전광판 실제 광고주 데이터 리스트
const SPONSOR_ADS = [
  {
    id: 'ad-baemin',
    sponsor: '배달의민족',
    tag: '동네야식 5천원 할인',
    headline: '육퇴 후 수다엔 야식이 진리! 🛵 5천원 즉시할인',
    desc: '지금 주문 시 사용 가능한 미니미 회원 전용 5,000원 할인 쿠폰을 드립니다.',
    emoji: '🛵',
    couponCode: 'MINI5000',
    linkText: '5,000원 쿠폰 다운받기',
    badgeBg: 'bg-[#2AC1BC]',
  },
  {
    id: 'ad-megacoffee',
    sponsor: '메가MGC커피',
    tag: '모닝커피 1+1',
    headline: '등원 후 커피수혈 필수! ☕ 아메리카노 1+1 쿠폰',
    desc: '우리 동네 메가MGC커피 매장에서 암호 "혹시 미니...?"를 제시하거나 쿠폰을 보여주세요!',
    emoji: '☕',
    couponCode: 'MEGAMINI',
    linkText: '1+1 교환권 다운받기',
    badgeBg: 'bg-[#FFB703]',
  },
  {
    id: 'ad-carrot',
    sponsor: '당근알바',
    tag: '동네 단기알바',
    headline: '우리 동네 시급 1.3만 꿀알바 🥕 3초 지원하기',
    desc: '집 앞 10분 거리 카페, 서점, 원데이 클래스 보조 등 가볍게 일할 수 있는 동네 알바 모음!',
    emoji: '🥕',
    couponCode: 'CARROTJOB',
    linkText: '동네 알바 리스트 보기',
    badgeBg: 'bg-[#FF6F0F]',
  },
  {
    id: 'ad-oliveyoung',
    sponsor: '올리브영',
    tag: '오늘드림 특가',
    headline: '지친 하루 나를 위한 마스크팩 ✨ 3시간 내 집 앞 도착',
    desc: '올리브영 오늘드림 3만원 이상 주문 시 4천원 즉시 할인 쿠폰팩 제공!',
    emoji: '💄',
    couponCode: 'OLIVEMINI',
    linkText: '오늘드림 4천원 할인받기',
    badgeBg: 'bg-[#98D85B]',
  },
];

export default function LiveRoom({
  activeRoom,
  myAvatar,
  setMyAvatar,
  cash,
  setCash,
  onExit,
}) {
  const [countdown, setCountdown] = useState(5);
  const [roomMode, setRoomMode] = useState(activeRoom.mode || '복합모드');
  const [selectedThemeId, setSelectedThemeId] = useState(activeRoom.theme || 'living-room');
  const [showThemePicker, setShowThemePicker] = useState(false);

  const [questionIdx, setQuestionIdx] = useState(0);
  const [turnSec, setTurnSec] = useState(20);
  const [activeSpeakerIdx, setActiveSpeakerIdx] = useState(0);
  const [chatInput, setChatInput] = useState('');
  const [effectBanner, setEffectBanner] = useState('');

  // 📺 옥외 전광판 광고주 롤링 & 상세 모달 상태
  const [currentAdIdx, setCurrentAdIdx] = useState(0);
  const [selectedSponsorAd, setSelectedSponsorAd] = useState(null);
  const [couponDownloaded, setCouponDownloaded] = useState(false);

  // 5초마다 광고주 광고 롤링 전환
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAdIdx((prev) => (prev + 1) % SPONSOR_ADS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 1. 바람의나라 스타일 자연스러운 키보드 이동 & 걷기 모션 상태
  const [facing, setFacing] = useState('down'); // 'down' | 'up' | 'left' | 'right'
  const [isWalking, setIsWalking] = useState(false);
  const [walkingStep, setWalkingStep] = useState(0);

  // 음성 & 실제 마이크 상태
  const [micOn, setMicOn] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [micErrorMsg, setMicErrorMsg] = useState('');

  // 다른 멤버들 (가끔 살짝씩 걸어다니는 살아있는 NPC)
  const [members, setMembers] = useState(activeRoom.members || []);

  const stageRef = useRef(null);
  const pressedKeysRef = useRef(new Set());
  const animationFrameRef = useRef(null);
  const gameLoopRef = useRef(null);

  // 1. 5초 카운트다운 타이머
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // 2. 20초 발언 턴 타이머
  useEffect(() => {
    if (countdown > 0) return;
    const interval = setInterval(() => {
      setTurnSec((prev) => {
        if (prev <= 1) {
          setActiveSpeakerIdx((idx) => (idx + 1) % 4);
          return 20;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  // 3. 바람의나라 스타일 부드러운 키보드 이동 게임 루프 (requestAnimationFrame)
  useEffect(() => {
    if (countdown > 0) return;

    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 's', 'a', 'd'].includes(e.key)) {
        e.preventDefault();
        pressedKeysRef.current.add(e.key.toLowerCase());
      }
    };

    const handleKeyUp = (e) => {
      pressedKeysRef.current.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 연속 부드러운 이동 게임 루프
    let stepCounter = 0;
    const speed = 0.85; // 프레임당 이동 %

    const loop = () => {
      const keys = pressedKeysRef.current;
      let dx = 0;
      let dy = 0;

      if (keys.has('arrowup') || keys.has('w')) { dy -= speed; setFacing('up'); }
      if (keys.has('arrowdown') || keys.has('s')) { dy += speed; setFacing('down'); }
      if (keys.has('arrowleft') || keys.has('a')) { dx -= speed; setFacing('left'); }
      if (keys.has('arrowright') || keys.has('d')) { dx += speed; setFacing('right'); }

      if (dx !== 0 || dy !== 0) {
        setIsWalking(true);
        stepCounter++;
        if (stepCounter % 6 === 0) {
          setWalkingStep((s) => s + 1);
        }

        setMyAvatar((prev) => ({
          ...prev,
          x: Math.max(12, Math.min(88, prev.x + dx)),
          y: Math.max(20, Math.min(82, prev.y + dy)),
        }));
      } else {
        setIsWalking(false);
      }

      gameLoopRef.current = requestAnimationFrame(loop);
    };

    gameLoopRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [countdown, setMyAvatar]);

  // 다른 멤버들도 4초마다 무작위로 한 걸음씩 서성이며 생동감 부여 (바람의나라 느낌)
  useEffect(() => {
    if (countdown > 0) return;
    const wanderInterval = setInterval(() => {
      setMembers((prev) =>
        prev.map((m) => {
          if (Math.random() > 0.4) {
            const rx = (Math.random() - 0.5) * 8;
            const ry = (Math.random() - 0.5) * 8;
            return {
              ...m,
              x: Math.max(15, Math.min(85, m.x + rx)),
              y: Math.max(25, Math.min(78, m.y + ry)),
            };
          }
          return m;
        })
      );
    }, 4000);
    return () => clearInterval(wanderInterval);
  }, [countdown]);

  // 실제 마이크 Web Audio API
  useEffect(() => {
    if (!micOn) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      setAudioLevel(0);
      return;
    }

    let isCancelled = false;
    let streamInstance = null;
    let audioCtxInstance = null;

    const startMic = async () => {
      try {
        setMicErrorMsg('');
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (isCancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamInstance = stream;
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioCtx();
        audioCtxInstance = audioCtx;

        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const updateLevel = () => {
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
          const average = sum / dataArray.length;
          setAudioLevel(Math.min(100, Math.round((average / 128) * 100)));
          animationFrameRef.current = requestAnimationFrame(updateLevel);
        };
        updateLevel();
      } catch (err) {
        setMicOn(false);
        setMicErrorMsg('마이크 권한이 필요합니다.');
        setTimeout(() => setMicErrorMsg(''), 3000);
      }
    };

    startMic();

    return () => {
      isCancelled = true;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (streamInstance) streamInstance.getTracks().forEach((t) => t.stop());
      if (audioCtxInstance && audioCtxInstance.state !== 'closed') audioCtxInstance.close();
    };
  }, [micOn]);

  const qList = AI_QUESTIONS[activeRoom.category] || AI_QUESTIONS.마미모임;
  const currentQuestion = qList[questionIdx % qList.length];

  // 현재 선택된 배경 테마
  const currentTheme =
    ROOM_BACKGROUND_THEMES.find((t) => t.id === selectedThemeId) ||
    ROOM_BACKGROUND_THEMES[0];

  // 채팅 말풍선
  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMyAvatar((prev) => ({ ...prev, speech: chatInput.trim() }));
    setChatInput('');
  };

  // 캐시 소모 소셜 연출
  const triggerCashEffect = (label, cost) => {
    if (cash < cost) {
      setEffectBanner('캐시가 부족해요! [내 아바타] 탭에서 충전해보세요.');
      setTimeout(() => setEffectBanner(''), 2200);
      return;
    }
    setCash((prev) => prev - cost);
    setEffectBanner(`${label} (-${cost} 캐시)`);
    setTimeout(() => setEffectBanner(''), 2200);
  };

  return (
    <div className="min-h-screen bg-[#0e1017] flex justify-center text-white">
      <div className="w-full max-w-[430px] bg-[#161822] min-h-screen flex flex-col justify-between relative overflow-hidden">
        {/* 5초 카운트다운 오버레이 */}
        {countdown > 0 && (
          <div className="absolute inset-0 z-40 bg-[#161822]/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <p className="text-xs font-semibold tracking-wider text-[#FF6B57] uppercase mb-2">
              LIVE WARM-UP STARTING
            </p>
            <p className="text-sm text-stone-300 mb-8 leading-relaxed">
              어색한 침묵 없이 바로 시작합니다!
              <br />
              첫인사 암호 <strong>“혹시... 미니...?”</strong>로 시작해보세요!
            </p>
            <div className="w-28 h-28 rounded-full border-4 border-[#FF6B57] flex items-center justify-center text-6xl font-black text-[#FF6B57] animate-pulse shadow-lg shadow-[#FF6B57]/30">
              {countdown}
            </div>
            <div className="flex gap-3 mt-10">
              <button
                type="button"
                onClick={() => setCountdown(5)}
                className="px-4 py-2 rounded-xl bg-white/10 text-xs flex items-center gap-1.5 hover:bg-white/15 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> 다시 시작
              </button>
              <button
                type="button"
                onClick={() => setCountdown(0)}
                className="px-4 py-2 rounded-xl bg-[#FF6B57] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow hover:bg-[#f05a46]"
              >
                <SkipForward className="w-3.5 h-3.5" /> 바로 입장
              </button>
            </div>
          </div>
        )}

        {/* 상단 바 & 방장 픽셀 테마 변경 버튼 */}
        <div className="p-4 border-b border-white/10 space-y-2.5">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onExit}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 text-xs text-stone-200 hover:bg-white/15 cursor-pointer"
            >
              ← 나가기
            </button>
            <div className="text-center">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4CAF88]/20 text-[#7CE0A8] font-bold">
                {activeRoom.category}
              </span>
              <h2 className="text-xs font-bold truncate max-w-[180px] mt-0.5">
                {activeRoom.title}
              </h2>
            </div>
            <span className="text-xs text-amber-300 font-bold">🪙 {cash.toLocaleString()}</span>
          </div>

          {/* 방장 컨트롤: 배경 테마 & 소통모드 전환 */}
          <div className="flex items-center justify-between gap-1.5 bg-white/5 p-1.5 rounded-xl text-xs">
            {/* 2번 요구사항: 픽셀 배경 테마 선택 버튼 */}
            <button
              type="button"
              onClick={() => setShowThemePicker(!showThemePicker)}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold flex items-center gap-1 text-stone-200 cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>배경: {currentTheme.name.split(' ')[0]}</span>
            </button>

            <div className="flex gap-1">
              {['음성수다', '채팅수다', '복합모드'].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setRoomMode(m)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                    roomMode === m ? 'bg-[#FF6B57] text-white' : 'text-stone-400'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* 배경 테마 팝업 (거실, 자연, 해외명소, 휴양지) */}
          {showThemePicker && (
            <div className="p-2.5 rounded-xl bg-[#222638] border border-white/20 space-y-1.5 animate-in fade-in">
              <p className="text-[10px] text-stone-400 font-bold">🎨 방장 2D 픽셀 배경 선택:</p>
              <div className="grid grid-cols-2 gap-1.5">
                {ROOM_BACKGROUND_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => {
                      setSelectedThemeId(theme.id);
                      setShowThemePicker(false);
                    }}
                    className={`p-2 rounded-xl text-left border text-[11px] transition-all cursor-pointer ${
                      selectedThemeId === theme.id
                        ? 'border-[#FF6B57] bg-[#FF6B57]/15 text-white font-bold'
                        : 'border-white/10 bg-white/5 text-stone-300 hover:bg-white/10'
                    }`}
                  >
                    <p className="font-bold truncate">{theme.name}</p>
                    <p className="text-[9px] text-stone-400 truncate">{theme.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI 호스트 카드 */}
        <div className="mx-4 mt-2 p-3 rounded-2xl bg-gradient-to-r from-[#8B7BE8]/20 to-[#FF6B57]/15 border border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-[#C5BAFF] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C5BAFF]" /> AI 호스트 · 루나
            </span>
            <span className="text-[11px] font-mono bg-black/40 px-2 py-0.5 rounded-md text-amber-300">
              발언턴 {turnSec}초
            </span>
          </div>
          <p className="text-xs text-white/95 leading-relaxed font-medium">“{currentQuestion}”</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[11px] text-stone-300">
              현재 발언:{' '}
              <strong className="text-[#FF6B57]">
                {activeSpeakerIdx === 0 ? myAvatar.name : members[activeSpeakerIdx - 1]?.name || '나(현진)'}
              </strong>
            </span>
            <button
              type="button"
              onClick={() => {
                setQuestionIdx((i) => i + 1);
                setTurnSec(20);
              }}
              className="text-[10px] px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              🎲 다음 질문
            </button>
          </div>
        </div>

        {effectBanner && (
          <div className="mx-4 mt-2 py-1.5 px-3 rounded-xl bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-bold text-center animate-bounce">
            {effectBanner}
          </div>
        )}

        {/* 1 & 2번: 바람의나라 스타일 부드러운 이동 & 픽셀 2D 미니 라운지 스테이지 */}
        <div className="px-4 mt-2.5 flex-1 flex flex-col">
          <div className="flex items-center justify-between text-[10px] text-stone-400 mb-1">
            <span>🎮 방향키/WASD 키를 꾹 누르면 자연스럽게 걸어갑니다</span>
            {micOn && (
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <Volume2 className="w-3 h-3 animate-pulse" />
                음성: {audioLevel}%
              </span>
            )}
          </div>

          <div
            ref={stageRef}
            className={`relative flex-1 min-h-[250px] rounded-3xl border-2 border-white/15 overflow-hidden select-none transition-colors duration-500 ${currentTheme.bgClass}`}
          >
            {/* 픽셀 격자 바닥 & 테마별 2D 픽셀 환경 그래픽 */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 opacity-30"
              style={{
                backgroundColor: currentTheme.floorColor,
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* 📺 옥외 스폰서 전광판: 실제 광고주 롤링 배너 */}
            {(() => {
              const currentAd = SPONSOR_ADS[currentAdIdx];
              return (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSponsorAd(currentAd);
                    setCouponDownloaded(false);
                  }}
                  className="absolute top-1.5 inset-x-6 mx-auto max-w-[290px] bg-black/85 hover:bg-black/95 border border-amber-300/80 rounded-xl px-2.5 py-1.5 flex items-center justify-between text-[11px] text-amber-200 cursor-pointer shadow-lg z-10 transition-all hover:scale-102 active:scale-98"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400 text-stone-900 font-black shrink-0">
                      AD
                    </span>
                    <span className="text-[10px] font-bold text-white bg-white/20 px-1.5 py-0.2 rounded shrink-0">
                      {currentAd.sponsor}
                    </span>
                    <span className="text-[10px] text-amber-100 font-medium truncate">
                      {currentAd.headline}
                    </span>
                  </div>
                  <span className="text-[10px] text-amber-300 font-extrabold ml-1.5 shrink-0 flex items-center gap-0.5">
                    혜택보기 →
                  </span>
                </div>
              );
            })()}
            {selectedThemeId === 'living-room' && (
              <>
                <div className="absolute top-2 left-4 text-xs bg-black/40 px-2 py-1 rounded-lg text-amber-200 font-bold">
                  ☀️ 햇살 창문
                </div>
                <div className="absolute top-2 right-4 text-xs bg-black/40 px-2 py-1 rounded-lg text-stone-300">
                  🛋️ 푹신 소파
                </div>
                <div className="absolute bottom-8 left-6 text-xl pointer-events-none">🪴</div>
                <div className="absolute bottom-10 right-8 text-xl pointer-events-none">📻</div>
              </>
            )}
            {selectedThemeId === 'moonlight-park' && (
              <>
                <div className="absolute top-2 left-4 text-xs bg-black/50 px-2 py-1 rounded-lg text-pink-300 font-bold">
                  🌸 벚꽃 쉼터
                </div>
                <div className="absolute top-2 right-4 text-xs bg-black/50 px-2 py-1 rounded-lg text-amber-200 font-bold">
                  🌙 초승달 야경
                </div>
                <div className="absolute bottom-8 left-8 text-xl pointer-events-none">🌸</div>
                <div className="absolute bottom-12 right-10 text-xl pointer-events-none">✨</div>
              </>
            )}
            {selectedThemeId === 'paris-cafe' && (
              <>
                <div className="absolute top-2 left-4 text-xs bg-black/50 px-2 py-1 rounded-lg text-sky-200 font-bold">
                  🗼 에펠탑 뷰
                </div>
                <div className="absolute top-2 right-4 text-xs bg-black/50 px-2 py-1 rounded-lg text-stone-200">
                  ☕ 노천 파라솔
                </div>
                <div className="absolute bottom-10 left-8 text-xl pointer-events-none">☕</div>
                <div className="absolute bottom-8 right-8 text-xl pointer-events-none">🥐</div>
              </>
            )}
            {selectedThemeId === 'sunset-beach' && (
              <>
                <div className="absolute top-2 left-4 text-xs bg-black/50 px-2 py-1 rounded-lg text-amber-300 font-bold">
                  🌅 선셋 노을
                </div>
                <div className="absolute top-2 right-4 text-xs bg-black/50 px-2 py-1 rounded-lg text-emerald-300 font-bold">
                  🌴 야자수 해변
                </div>
                <div className="absolute bottom-10 left-8 text-xl pointer-events-none">🌴</div>
                <div className="absolute bottom-8 right-8 text-xl pointer-events-none">🏖️</div>
              </>
            )}

            {/* 다른 참여자 아바타들 (바람의나라 NPC처럼 서성임) */}
            {members.map((m, idx) => (
              <div
                key={m.id}
                style={{ left: `${m.x}%`, top: `${m.y}%` }}
                className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col items-center pointer-events-none transition-all duration-700 ease-out"
              >
                <div className="bg-white/95 text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow mb-1 whitespace-nowrap">
                  {m.speech}
                </div>
                <AvatarRenderer
                  gender={m.gender || 'female'}
                  hair={m.hair || 'long-wave'}
                  outfit={m.outfit || 'dress-pink'}
                  accessory={m.accessory}
                  size="md"
                  facing="down"
                />
                <span className="text-[10px] text-white font-bold bg-black/60 px-1.5 py-0.2 rounded mt-0.5">
                  {m.name}
                </span>
              </div>
            ))}

            {/* 1번 핵심: 내 아바타 (바람의나라 4방향 전환 + 걷기 바운스) */}
            <div
              style={{ left: `${myAvatar.x}%`, top: `${myAvatar.y}%` }}
              className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col items-center z-20 pointer-events-none transition-transform duration-75"
            >
              <div className="bg-[#FF6B57] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow mb-1 whitespace-nowrap animate-bounce">
                {myAvatar.speech}
              </div>

              <AvatarRenderer
                gender={myAvatar.gender || 'female'}
                hair={myAvatar.hair}
                outfit={myAvatar.outfit}
                accessory={myAvatar.accessory}
                effect={myAvatar.effect}
                size="md"
                facing={facing}
                isWalking={isWalking}
                walkingStep={walkingStep}
                isSpeaking={micOn && audioLevel > 15}
                audioLevel={audioLevel}
              />

              <span className="text-[10px] font-bold text-amber-300 bg-black/70 px-1.5 py-0.2 rounded mt-0.5 border border-amber-300/40">
                {myAvatar.name}
              </span>
            </div>
          </div>
        </div>

        {/* 하단 컨트롤러 & 마이크 연동 */}
        <div className="p-3.5 space-y-2.5 bg-[#12141d] border-t border-white/10 mt-2">
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => triggerCashEffect('☕ 전원 커피 건배 연출!', 100)}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-[11px] font-semibold whitespace-nowrap cursor-pointer"
            >
              ☕ 커피건배 (-100)
            </button>
            <button
              type="button"
              onClick={() => triggerCashEffect('✨ 분위기 폭죽 발사!', 150)}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-[11px] font-semibold whitespace-nowrap cursor-pointer"
            >
              ✨ 폭죽연출 (-150)
            </button>
            <button
              type="button"
              onClick={() =>
                setMyAvatar((prev) => ({ ...prev, speech: '혹시... 미니...?' }))
              }
              className="px-3 py-1.5 rounded-xl bg-[#FF6B57]/20 border border-[#FF6B57]/40 text-[#FF6B57] text-[11px] font-bold whitespace-nowrap cursor-pointer"
            >
              🌱 혹시... 미니...?
            </button>
          </div>

          {(roomMode === '음성수다' || roomMode === '복합모드') && (
            <button
              type="button"
              onClick={() => setMicOn((m) => !m)}
              className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                micOn
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-white/10 text-stone-200 hover:bg-white/15'
              }`}
            >
              {micOn ? <Mic className="w-4 h-4 animate-pulse" /> : <MicOff className="w-4 h-4" />}
              {micOn ? `🎙️ 실시간 마이크 켜짐 (음성 레벨: ${audioLevel}%)` : '마이크 켜고 실제 음성으로 수다 참여하기'}
            </button>
          )}

          {(roomMode === '채팅수다' || roomMode === '복합모드') && (
            <form onSubmit={handleSendChat} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="미니미 머리 위 말풍선 입력..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-white/10 text-xs text-white placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#FF6B57]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#FF6B57] text-xs font-bold text-white cursor-pointer hover:bg-[#f05a46]"
              >
                전송
              </button>
            </form>
          )}
        </div>

        {/* 📺 실제 광고주 전광판 상세 & 쿠폰 다운로드 모달 */}
        {selectedSponsorAd && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-[360px] bg-white rounded-3xl p-5 space-y-4 shadow-2xl animate-in zoom-in-95 text-stone-900 border border-stone-100">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-stone-900">
                    스폰서 제휴 AD
                  </span>
                  <span className="text-xs font-bold text-stone-500">
                    {selectedSponsorAd.sponsor}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSponsorAd(null)}
                  className="p-1 rounded-full hover:bg-stone-100 cursor-pointer"
                >
                  <X className="w-5 h-5 text-stone-400" />
                </button>
              </div>

              <div className="text-center py-2 space-y-1.5">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-3xl flex items-center justify-center mx-auto mb-2 border border-amber-200">
                  {selectedSponsorAd.emoji}
                </div>
                <span className="text-[11px] font-black text-[#6B2896] bg-purple-50 px-2.5 py-0.5 rounded-full">
                  {selectedSponsorAd.tag}
                </span>
                <h4 className="font-extrabold text-sm text-stone-900 leading-snug">
                  {selectedSponsorAd.headline}
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed px-2">
                  {selectedSponsorAd.desc}
                </p>
              </div>

              {/* 쿠폰 바우처 박스 */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-dashed border-stone-300 text-center space-y-1">
                <p className="text-[10px] text-stone-400 font-bold">미니미 전용 프로모션 코드</p>
                <p className="text-base font-black tracking-widest text-[#6B2896]">
                  {selectedSponsorAd.couponCode}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCouponDownloaded(true)}
                className={`w-full py-3.5 rounded-2xl text-xs font-bold shadow-md cursor-pointer transition-colors flex items-center justify-center gap-1.5 ${
                  couponDownloaded
                    ? 'bg-emerald-500 text-white'
                    : 'bg-[#6B2896] hover:bg-[#521c75] text-white'
                }`}
              >
                <Ticket className="w-4 h-4" />
                <span>
                  {couponDownloaded
                    ? '🎉 쿠폰함에 저장 완료!'
                    : selectedSponsorAd.linkText}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
