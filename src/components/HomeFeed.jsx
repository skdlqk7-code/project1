import React from 'react';
import { Plus, Play, ShieldCheck, Flame, Heart, MessageSquare, ChevronRight, Sparkles } from 'lucide-react';
import AvatarRenderer from './AvatarRenderer';

export default function HomeFeed({
  selectedDistrict,
  selectedPeople,
  categoryFilter,
  setCategoryFilter,
  rooms,
  posts = [],
  onSelectRoomDetail,
  onEnterRoom,
  onOpenCreateModal,
  onSelectPostDetail,
  onGoToBoardTab,
}) {
  const mainRooms = rooms.filter((r) => r.category !== '원데이');
  const oneDayRooms = rooms.filter((r) => r.category === '원데이');
  const filteredRooms =
    categoryFilter === '전체'
      ? mainRooms
      : rooms.filter((r) => r.category === categoryFilter);

  // 인기글 자동 선별: 좋아요 수 기준 내림차순 상위 3개
  const popularPosts = [...posts]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  return (
    <>
      {/* CU BI 스타일 맞춤 추천 헤더 배너: 퍼플 그라데이션 & 라임 포인트 */}
      <div className="p-4.5 rounded-3xl bg-gradient-to-br from-[#6B2896] to-[#4A156B] text-white flex items-center justify-between shadow-md relative overflow-hidden">
        {/* 은은한 네온 라임 빛 배경 데코 */}
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-[#00D084]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#00D084] text-[#00472C] uppercase tracking-wider inline-flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" /> {selectedDistrict} 맞춤 큐레이션
          </span>
          <h2 className="text-base font-extrabold mt-1.5 leading-snug">
            현진님을 위한<br />오늘의 워밍업 방을 골랐어요
          </h2>
        </div>

        <button
          type="button"
          onClick={onOpenCreateModal}
          className="relative z-10 px-3.5 py-2.5 rounded-2xl bg-white hover:bg-stone-50 text-[#6B2896] text-xs font-black flex items-center gap-1 shrink-0 cursor-pointer shadow-sm transition-transform active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 text-[#6B2896]" /> 방 개설
        </button>
      </div>

      {/* 카테고리 필터 칩: CU 스타일 모던 칩 */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {['전체', '마미모임', '동네루틴', '원데이'].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategoryFilter(cat)}
            className={`px-3.5 py-1.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
              categoryFilter === cat
                ? 'bg-[#6B2896] text-white shadow-xs scale-105'
                : 'bg-white text-stone-600 border border-purple-100 hover:border-[#6B2896]/40'
            }`}
          >
            {cat === '마미모임' && '🍼 '}
            {cat === '동네루틴' && '🏃 '}
            {cat === '원데이' && '🎨 '}
            {cat}
          </button>
        ))}
      </div>

      {/* 메인 섹션: 모임 피드 */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-stone-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#6B2896]" />
            {categoryFilter === '전체' ? '동네 실시간 워밍업 모임' : `${categoryFilter} 모임`}
          </h3>
          <span className="text-[10px] text-stone-400 font-bold">5초 카운트다운 방</span>
        </div>

        {filteredRooms.map((room, idx) => (
          <React.Fragment key={room.id}>
            <div
              onClick={() => onSelectRoomDetail(room)}
              className="p-4 rounded-3xl bg-white border border-purple-50 hover:border-[#6B2896]/50 transition-all cursor-pointer space-y-2.5 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                    room.category === '마미모임'
                      ? 'bg-[#6B2896]/10 text-[#6B2896]'
                      : room.category === '동네루틴'
                      ? 'bg-[#00D084]/15 text-[#008A56]'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {room.badge}
                </span>
                <span className="text-[11px] font-bold text-stone-500">
                  {room.mode} · {room.current}/{room.max}명
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-stone-900">{room.title}</h4>
                <p className="text-xs text-stone-500 mt-0.5">{room.subtitle}</p>
              </div>

              <div className="text-[11px] text-[#008A56] bg-[#00D084]/10 px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-[#008A56]" />
                <span className="truncate">{room.noShowNote}</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex -space-x-1.5">
                  {(room.members || []).map((m) => (
                    <div key={m.id} className="relative z-10">
                      <AvatarRenderer
                        gender={m.gender || 'female'}
                        hair={m.hair || 'long-wave'}
                        outfit={m.outfit || 'dress-pink'}
                        accessory={m.accessory}
                        size="sm"
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEnterRoom(room);
                  }}
                  className="px-3.5 py-1.5 rounded-2xl bg-[#6B2896] hover:bg-[#521c75] text-white text-xs font-black flex items-center gap-1 cursor-pointer shadow-xs transition-colors"
                >
                  <Play className="w-3 h-3 fill-current text-[#00D084]" /> 입장하기
                </button>
              </div>
            </div>

            {/* 중간에 삽입되는 동네 네이티브 광고 카드 (수익 모델 예시) */}
            {idx === 0 && (
              <div className="p-4 rounded-3xl bg-gradient-to-r from-purple-50 via-white to-emerald-50 border border-purple-200/80 space-y-2 shadow-xs relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#6B2896] text-white">
                    AD 스폰서드
                  </span>
                  <span className="text-[10px] text-stone-400 font-bold">{selectedDistrict} 혜택</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h4 className="font-extrabold text-xs text-stone-900">
                      ☕ 송도 베이커리 "미니" 암호 제시 시 아아 1+1 쿠폰
                    </h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      센트럴파크역 2번 출구 앞 · 등원 후 모닝커피에 최고!
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('🎉 동네 카페 1+1 쿠폰이 발급되었습니다!')}
                    className="px-3 py-1.5 rounded-xl bg-[#00D084] hover:bg-[#00b573] text-[#00472C] text-[11px] font-black shrink-0 cursor-pointer shadow-xs"
                  >
                    쿠폰받기
                  </button>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </section>

      {/* 하단 실시간 인기 이야기 섹션 */}
      <section className="space-y-3 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-[#FF4B4B] fill-[#FF4B4B]" />
            <h3 className="text-xs font-black text-stone-900">동네 실시간 인기 이야기</h3>
          </div>
          <button
            type="button"
            onClick={onGoToBoardTab}
            className="text-xs text-[#6B2896] hover:underline font-extrabold flex items-center cursor-pointer"
          >
            전체보기 <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {popularPosts.map((post, idx) => (
            <div
              key={post.id}
              onClick={() => onSelectPostDetail(post)}
              className="p-3.5 rounded-3xl bg-white border border-purple-50 hover:border-[#6B2896]/40 transition-all cursor-pointer space-y-2 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-50 text-[#6B2896] flex items-center gap-1">
                  🔥 인기 #{idx + 1} · {post.category}
                </span>
                <span className="text-[10px] text-stone-400 font-medium">{post.createdAt}</span>
              </div>

              <div>
                <h4 className="font-extrabold text-xs text-stone-900 line-clamp-1">
                  {post.title}
                </h4>
                <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">
                  {post.content}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-stone-500">
                <span className="text-stone-700 font-bold">{post.author.name} ({post.author.district})</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[#FF4B4B] font-bold">
                    <Heart className="w-3 h-3 fill-current" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-stone-400 font-medium">
                    <MessageSquare className="w-3 h-3" /> {post.commentsCount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 서브 섹션: 원데이 클래스 */}
      {categoryFilter === '전체' && (
        <section className="space-y-2.5 pt-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-stone-700">
              🎨 이번 주말 원데이 클래스
            </h3>
            <span className="text-[10px] text-stone-400 font-bold">사전 워밍업 제공</span>
          </div>
          {oneDayRooms.map((room) => (
            <div
              key={room.id}
              onClick={() => onSelectRoomDetail(room)}
              className="p-4 rounded-3xl bg-white border border-purple-50 cursor-pointer space-y-2 hover:border-purple-200 transition-all shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-stone-700">{room.badge}</span>
                <span className="text-[11px] text-stone-500 font-bold">
                  {room.current}/{room.max}명
                </span>
              </div>
              <h4 className="font-extrabold text-sm text-stone-900">{room.title}</h4>
              <p className="text-xs text-stone-600">{room.subtitle}</p>
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEnterRoom(room);
                  }}
                  className="px-3 py-1.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-black cursor-pointer"
                >
                  사전 워밍업 방 입장
                </button>
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  );
}
