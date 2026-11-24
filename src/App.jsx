import React, { useState } from 'react';
import {
  MapPin,
  Coins,
  Bell,
  Home,
  Compass,
  BookOpen,
  Mic,
  MessageCircle,
  Sparkles,
  User,
  X,
  Heart,
  Send,
  KeyRound,
  LogIn,
  LogOut,
} from 'lucide-react';

import {
  INITIAL_ROOMS,
  ONBOARDING_MOMENTS,
  INITIAL_POSTS,
  INITIAL_FEEDS,
} from './constants/data';

import Onboarding from './components/Onboarding';
import LiveRoom from './components/LiveRoom';
import HomeFeed from './components/HomeFeed';
import FeedTab from './components/FeedTab';
import CommunityBoard from './components/CommunityBoard';
import ChatTab from './components/ChatTab';
import AvatarStore from './components/AvatarStore';
import MySettings from './components/MySettings';
import RoomDetailModal from './components/RoomDetailModal';
import CreateRoomModal from './components/CreateRoomModal';
import CatchphraseModal from './components/CatchphraseModal';
import AuthModal from './components/AuthModal';
import AvatarRenderer from './components/AvatarRenderer';

export default function App() {
  // 1. 온보딩 상태 (사용자 지정 행정구역: 인천광역시 연수구 기본)
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [obStep, setObStep] = useState(1);
  const [selectedMoment, setSelectedMoment] = useState('');
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [selectedCity, setSelectedCity] = useState('인천광역시');
  const [selectedDistrict, setSelectedDistrict] = useState('연수구');

  // 2. 6대 하단 탭: 'home' | 'feed' | 'board' | 'live' | 'chat' | 'avatar'
  const [activeTab, setActiveTab] = useState('home');
  const [showMySettingsModal, setShowMySettingsModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('전체');

  // 3. 회원가입 & 로그인 모달
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // 4. 만남의 암호 팝업
  const [showCatchphraseModal, setShowCatchphraseModal] = useState(false);

  // 5. 모임 & 게시판 & 피드 데이터
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [feeds, setFeeds] = useState(INITIAL_FEEDS);

  const [selectedRoomDetail, setSelectedRoomDetail] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPostDetail, setSelectedPostDetail] = useState(null);

  // 6. 활성 라이브룸 방
  const [activeRoom, setActiveRoom] = useState(INITIAL_ROOMS[0]);

  // 7. 내 싸이월드 도트 아바타 & 캐시
  const [cash, setCash] = useState(1200);
  const [myAvatar, setMyAvatar] = useState({
    name: '나(현진)',
    gender: 'female',
    hair: 'long-wave',
    outfit: 'dress-pink',
    accessory: 'coffee',
    effect: 'sparkle',
    color: '#6B2896', // CU 시그니처 퍼플
    statusMsg: '오늘도 산뜻하게 워밍업!',
    ownedItems: ['item-coffee', 'item-sparkle'],
    x: 50,
    y: 50,
    speech: '혹시... 미니님이세요? 😊',
  });

  // 온보딩 완료 처리
  const handleFinishOnboarding = () => {
    const found = ONBOARDING_MOMENTS.find((m) => m.id === selectedMoment);
    if (found) {
      setCategoryFilter(found.defaultCat);
    }
    setShowOnboarding(false);
    setActiveTab('home');
    setTimeout(() => setShowCatchphraseModal(true), 400);
  };

  // 방 입장
  const enterRoom = (room) => {
    setActiveRoom(room);
    setSelectedRoomDetail(null);
    setActiveTab('live');
  };

  // 새 방 개설
  const handleCreateRoom = ({ title, category, mode, theme }) => {
    const created = {
      id: `custom-${Date.now()}`,
      category,
      badge:
        category === '마미모임'
          ? '🍼 새 마미방'
          : category === '동네루틴'
          ? '🏃 새 루틴방'
          : '🎨 원데이방',
      title,
      subtitle: `${selectedCity} ${selectedDistrict} · 방장 개설 · ${mode}`,
      mode,
      theme: theme || 'living-room',
      current: 1,
      max: 5,
      noShowNote: '방장 모드 전환 지원 · 부담 없는 참여',
      members: [],
    };
    setRooms((prev) => [created, ...prev]);
    setShowCreateModal(false);
    enterRoom(created);
  };

  // 로그인 성공 처리
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setMyAvatar((prev) => ({ ...prev, name: user.name }));
  };

  // ---------------- 1. 온보딩 화면 ----------------
  if (showOnboarding) {
    return (
      <Onboarding
        obStep={obStep}
        setObStep={setObStep}
        selectedMoment={selectedMoment}
        setSelectedMoment={setSelectedMoment}
        selectedPeople={selectedPeople}
        setSelectedPeople={setSelectedPeople}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        onFinish={handleFinishOnboarding}
        onSkip={() => {
          setShowOnboarding(false);
          setTimeout(() => setShowCatchphraseModal(true), 400);
        }}
      />
    );
  }

  // ---------------- 2. 라이브 룸 (바람의나라 스타일 이동 + 2D 픽셀 배경) ----------------
  if (activeTab === 'live') {
    return (
      <LiveRoom
        activeRoom={activeRoom}
        myAvatar={myAvatar}
        setMyAvatar={setMyAvatar}
        cash={cash}
        setCash={setCash}
        onExit={() => setActiveTab('home')}
      />
    );
  }

  // ---------------- 3. 메인 쉘 (CU BI 스타일: 세련된 퍼플 & 라임 & 웜 화이트) ----------------
  return (
    <div className="min-h-screen bg-[#eceef5] flex justify-center font-sans">
      <div className="w-full max-w-[430px] bg-[#F6F7FB] min-h-screen flex flex-col justify-between relative shadow-2xl">
        {/* CU BI 스타일 상단 헤더: 세련된 퍼플 그라데이션 포인트 & 라임 악센트 */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 py-3.5 border-b border-purple-100 flex items-center justify-between shadow-xs">
          {/* 활동 지역 표시 및 변경 */}
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-xl bg-[#6B2896]/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-[#6B2896]" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-xs text-stone-900 truncate max-w-[120px]">
                  {selectedDistrict}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setObStep(3);
                    setShowOnboarding(true);
                  }}
                  className="text-[10px] text-[#6B2896] hover:underline font-bold cursor-pointer"
                >
                  변경
                </button>
              </div>
              <p className="text-[9px] text-stone-400 font-medium">{selectedCity}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* 만남의 암호 팝업 버튼 (CU 라임 그린 뱃지) */}
            <button
              type="button"
              onClick={() => setShowCatchphraseModal(true)}
              className="px-2.5 py-1 rounded-full bg-[#00D084]/15 hover:bg-[#00D084]/25 text-[#008A56] text-[10px] font-black flex items-center gap-1 cursor-pointer transition-colors border border-[#00D084]/30"
            >
              <KeyRound className="w-3 h-3 text-[#008A56]" />
              <span>암호🔑</span>
            </button>

            {/* 캐시 충전 뱃지 */}
            <button
              type="button"
              onClick={() => setActiveTab('avatar')}
              className="px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors border border-amber-200"
            >
              <Coins className="w-3.5 h-3.5 text-amber-500" />
              <span>{cash.toLocaleString()}</span>
            </button>

            {/* 우측 상단 로그인 / 회원가입 버튼 */}
            {currentUser ? (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowMySettingsModal(true)}
                  className="cursor-pointer hover:scale-105 transition-transform"
                >
                  <AvatarRenderer
                    gender={myAvatar.gender || 'female'}
                    hair={myAvatar.hair}
                    outfit={myAvatar.outfit}
                    accessory={myAvatar.accessory}
                    size="sm"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentUser(null)}
                  className="p-1 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-600"
                  title="로그아웃"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowAuthModal(true)}
                className="px-3 py-1.5 rounded-2xl bg-[#6B2896] hover:bg-[#521c75] text-white text-[11px] font-black flex items-center gap-1 cursor-pointer shadow-xs transition-colors"
              >
                <LogIn className="w-3 h-3" /> 로그인
              </button>
            )}
          </div>
        </header>

        {/* 탭별 본문 */}
        <main className="flex-1 p-4 pb-24 space-y-5 overflow-y-auto">
          {/* 1. 홈 피드 (모임 피드 + 하단 인기글) */}
          {activeTab === 'home' && (
            <HomeFeed
              selectedDistrict={selectedDistrict}
              selectedPeople={selectedPeople}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              rooms={rooms}
              posts={posts}
              onSelectRoomDetail={setSelectedRoomDetail}
              onEnterRoom={enterRoom}
              onOpenCreateModal={() => setShowCreateModal(true)}
              onSelectPostDetail={setSelectedPostDetail}
              onGoToBoardTab={() => setActiveTab('board')}
            />
          )}

          {/* 2. 인스타형 피드 탭 (세로 슬라이드 피드) */}
          {activeTab === 'feed' && (
            <FeedTab
              feeds={feeds}
              setFeeds={setFeeds}
              myAvatar={myAvatar}
              selectedDistrict={selectedDistrict}
              onSendLetterTo={() => setActiveTab('chat')}
            />
          )}

          {/* 3. 동네이야기 게시판 탭 (사진첨부 & 레시피/여행기) */}
          {activeTab === 'board' && (
            <CommunityBoard
              posts={posts}
              setPosts={setPosts}
              myAvatar={myAvatar}
              selectedDistrict={selectedDistrict}
            />
          )}

          {/* 4. 채팅 & 쪽지 탭 (우측상단 쪽지함) */}
          {activeTab === 'chat' && (
            <ChatTab
              myAvatar={myAvatar}
              selectedDistrict={selectedDistrict}
            />
          )}

          {/* 5. 내 아바타 & 결제 상점 (착장 + 룸인테리어 + 캐시 충전 결제) */}
          {activeTab === 'avatar' && (
            <AvatarStore
              myAvatar={myAvatar}
              setMyAvatar={setMyAvatar}
              cash={cash}
              setCash={setCash}
            />
          )}
        </main>

        {/* 로그인 / 회원가입 모달 (구글, 카톡, 이메일) */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />

        {/* 만남의 암호 모달 */}
        <CatchphraseModal
          isOpen={showCatchphraseModal}
          onClose={() => setShowCatchphraseModal(false)}
        />

        {/* 모임 상세 모달 */}
        <RoomDetailModal
          room={selectedRoomDetail}
          onClose={() => setSelectedRoomDetail(null)}
          onEnter={enterRoom}
        />

        {/* 방 개설 모달 */}
        {showCreateModal && (
          <CreateRoomModal
            selectedDistrict={selectedDistrict}
            onClose={() => setShowCreateModal(false)}
            onCreate={handleCreateRoom}
          />
        )}

        {/* 마이 설정 모달 */}
        {showMySettingsModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center">
            <div className="w-full max-w-[430px] bg-white rounded-t-3xl p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="font-bold text-base text-stone-900">내 계정 & 마이 설정</h3>
                <button
                  type="button"
                  onClick={() => setShowMySettingsModal(false)}
                  className="p-1 rounded-full hover:bg-stone-100 cursor-pointer"
                >
                  <X className="w-5 h-5 text-stone-400" />
                </button>
              </div>

              <MySettings
                selectedCity={selectedCity}
                selectedDistrict={selectedDistrict}
                selectedPeople={selectedPeople}
                onResetOnboarding={() => {
                  setShowMySettingsModal(false);
                  setObStep(1);
                  setShowOnboarding(true);
                }}
              />
            </div>
          </div>
        )}

        {/* CU BI 스타일 하단 네비게이션: 퍼플 메인 액센트 & 볼드 아이콘 */}
        <nav className="fixed bottom-0 w-full max-w-[430px] bg-white/95 backdrop-blur-md border-t border-purple-100 grid grid-cols-6 py-2.5 z-30 shadow-lg">
          {/* 1. 홈 */}
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center py-0.5 text-[10px] font-black cursor-pointer transition-colors ${
              activeTab === 'home' ? 'text-[#6B2896]' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <Home className="w-4 h-4 mb-0.5" /> 홈
          </button>

          {/* 2. 피드 */}
          <button
            type="button"
            onClick={() => setActiveTab('feed')}
            className={`flex flex-col items-center py-0.5 text-[10px] font-black cursor-pointer transition-colors ${
              activeTab === 'feed' ? 'text-[#6B2896]' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <Compass className="w-4 h-4 mb-0.5" /> 피드
          </button>

          {/* 3. 라이브룸 (CU 라임 그린 플로팅 강조) */}
          <button
            type="button"
            onClick={() => enterRoom(activeRoom)}
            className="flex flex-col items-center py-0.5 text-[10px] font-black text-[#008A56] hover:text-[#6B2896] cursor-pointer transition-colors"
          >
            <div className="w-5 h-5 rounded-full bg-[#00D084]/20 flex items-center justify-center mb-0.5">
              <Mic className="w-3.5 h-3.5 text-[#008A56]" />
            </div>
            라이브룸
          </button>

          {/* 4. 게시판 */}
          <button
            type="button"
            onClick={() => setActiveTab('board')}
            className={`flex flex-col items-center py-0.5 text-[10px] font-black cursor-pointer transition-colors ${
              activeTab === 'board' ? 'text-[#6B2896]' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <BookOpen className="w-4 h-4 mb-0.5" /> 게시판
          </button>

          {/* 5. 채팅·쪽지 */}
          <button
            type="button"
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center py-0.5 text-[10px] font-black cursor-pointer transition-colors ${
              activeTab === 'chat' ? 'text-[#6B2896]' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <MessageCircle className="w-4 h-4 mb-0.5" /> 채팅·쪽지
          </button>

          {/* 6. 아바타 & 상점 */}
          <button
            type="button"
            onClick={() => setActiveTab('avatar')}
            className={`flex flex-col items-center py-0.5 text-[10px] font-black cursor-pointer transition-colors ${
              activeTab === 'avatar' ? 'text-[#6B2896]' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <Sparkles className="w-4 h-4 mb-0.5" /> 아바타
          </button>
        </nav>
      </div>
    </div>
  );
}
