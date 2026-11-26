import React, { useState, useRef } from 'react';
import {
  Heart,
  MessageCircle,
  Send,
  Plus,
  X,
  Camera,
  Share2,
  Bookmark,
  Sparkles,
} from 'lucide-react';
import AvatarRenderer from './AvatarRenderer';

const PRESET_FEED_PHOTOS = [
  { id: 'f-cafe', label: '☕ 동네 감성카페', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80' },
  { id: 'f-park', label: '🌿 공원 산책', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80' },
  { id: 'f-food', label: '🥞 브런치 맛집', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80' },
  { id: 'f-night', label: '🌙 야경/러닝', url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80' },
];

export default function FeedTab({
  feeds,
  setFeeds,
  myAvatar,
  selectedDistrict,
  onSendLetterTo,
}) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newImage, setNewImage] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newTags, setNewTags] = useState('');
  const [commentOpenId, setCommentOpenId] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [doubleTapHeartId, setDoubleTapHeartId] = useState(null);

  const fileInputRef = useRef(null);

  // 로컬 이미지 선택
  const readImageFile = (file) => {
    if (!file?.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => setNewImage(event.target.result);
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    readImageFile(file);
  };

  const handleImagePaste = (e) => {
    const imageItem = Array.from(e.clipboardData?.items || []).find(
      (item) => item.kind === 'file' && item.type.startsWith('image/')
    );
    const file = imageItem?.getAsFile();
    if (!file) return;
    e.preventDefault();
    readImageFile(file);
  };

  // 피드 등록
  const handleCreateFeed = (e) => {
    e.preventDefault();
    if (!newCaption.trim() || !newImage) return;

    const tags = newTags
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const created = {
      id: `feed-${Date.now()}`,
      author: {
        name: myAvatar.name,
        district: selectedDistrict,
        gender: myAvatar.gender || 'female',
        hair: myAvatar.hair,
        outfit: myAvatar.outfit,
        accessory: myAvatar.accessory,
      },
      imageUrl: newImage,
      content: newCaption.trim(),
      likes: 1,
      userLiked: true,
      commentsCount: 0,
      createdAt: '방금',
      tags: tags.length > 0 ? tags : ['동네일상', '미니로그'],
    };

    setFeeds((prev) => [created, ...prev]);
    setNewImage('');
    setNewCaption('');
    setNewTags('');
    setShowUploadModal(false);
  };

  // 좋아요 토글
  const handleToggleLike = (feedId) => {
    setFeeds((prev) =>
      prev.map((f) => {
        if (f.id === feedId) {
          const isLiked = f.userLiked;
          return {
            ...f,
            likes: isLiked ? f.likes - 1 : f.likes + 1,
            userLiked: !isLiked,
          };
        }
        return f;
      })
    );
  };

  // 사진 더블 탭 시 큰 하트 애니메이션
  const handleDoubleTap = (feedId) => {
    handleToggleLike(feedId);
    setDoubleTapHeartId(feedId);
    setTimeout(() => setDoubleTapHeartId(null), 800);
  };

  return (
    <div className="space-y-4">
      {/* 상단 헤더 & 피드 올리기 버튼 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-stone-900">동네 피드 (미니로그)</h2>
          <p className="text-xs text-stone-500">인스타처럼 위아래로 넘겨보는 우리 동네 일상</p>
        </div>
        <button
          type="button"
          onClick={() => setShowUploadModal(true)}
          className="px-3.5 py-2 rounded-2xl bg-[#FF6B57] hover:bg-[#f05a46] text-white text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer transition-colors"
        >
          <Camera className="w-3.5 h-3.5" /> 피드 올리기
        </button>
      </div>

      {/* 인스타형 세로 슬라이드 피드 리스트 */}
      <div className="space-y-6">
        {feeds.map((feed) => (
          <div
            key={feed.id}
            className="rounded-3xl bg-white border border-stone-200 overflow-hidden shadow-xs"
          >
            {/* 1. 피드 작성자 헤더 */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <AvatarRenderer
                  gender={feed.author.gender || 'female'}
                  hair={feed.author.hair || 'long-wave'}
                  outfit={feed.author.outfit || 'dress-pink'}
                  accessory={feed.author.accessory}
                  size="sm"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-stone-900">{feed.author.name}</span>
                    <span className="text-[10px] text-stone-400">· {feed.createdAt}</span>
                  </div>
                  <p className="text-[10px] text-stone-500">{feed.author.district}</p>
                </div>
              </div>

              {/* 쪽지 건네기 버튼 */}
              <button
                type="button"
                onClick={() => onSendLetterTo && onSendLetterTo(feed.author.name)}
                className="px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-[#FF6B57]/10 text-stone-600 hover:text-[#FF6B57] text-[11px] font-bold cursor-pointer transition-colors"
              >
                💌 쪽지
              </button>
            </div>

            {/* 2. 대형 피드 사진 (더블 탭 지원) */}
            <div
              onDoubleClick={() => handleDoubleTap(feed.id)}
              className="relative w-full aspect-square bg-stone-900 overflow-hidden cursor-pointer select-none"
            >
              <img
                src={feed.imageUrl}
                alt="피드 사진"
                className="w-full h-full object-cover"
              />

              {/* 더블탭 하트 애니메이션 오버레이 */}
              {doubleTapHeartId === feed.id && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-ping">
                  <Heart className="w-20 h-20 text-white fill-[#FF6B57] drop-shadow-lg" />
                </div>
              )}
            </div>

            {/* 3. 소셜 액션 바 (좋아요, 댓글, 공유) */}
            <div className="p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggleLike(feed.id)}
                    className="p-1 cursor-pointer transition-transform active:scale-125"
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        feed.userLiked ? 'text-[#FF6B57] fill-current' : 'text-stone-700'
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCommentOpenId(commentOpenId === feed.id ? null : feed.id)
                    }
                    className="p-1 cursor-pointer text-stone-700 hover:text-stone-900"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('링크가 복사되었습니다!')}
                    className="p-1 cursor-pointer text-stone-700 hover:text-stone-900"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                <Bookmark className="w-5 h-5 text-stone-400 hover:text-stone-700 cursor-pointer" />
              </div>

              {/* 좋아요 수 */}
              <p className="text-xs font-bold text-stone-900">
                좋아요 {feed.likes.toLocaleString()}개
              </p>

              {/* 캡션 본문 & 해시태그 */}
              <div className="text-xs text-stone-800 leading-relaxed whitespace-pre-line">
                <span className="font-bold mr-1.5">{feed.author.name}</span>
                {feed.content}
              </div>

              {feed.tags && feed.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {feed.tags.map((tag, idx) => (
                    <span key={idx} className="text-[11px] font-medium text-[#FF6B57]">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* 댓글 열기 토글 */}
              <button
                type="button"
                onClick={() =>
                  setCommentOpenId(commentOpenId === feed.id ? null : feed.id)
                }
                className="text-[11px] text-stone-400 font-medium cursor-pointer"
              >
                댓글 {feed.commentsCount}개 모두 보기...
              </button>

              {/* 댓글 펼침 영역 */}
              {commentOpenId === feed.id && (
                <div className="pt-2 border-t border-stone-100 space-y-2">
                  <div className="text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded-xl">
                    <span className="font-bold">하은맘:</span> 피드 사진 감성 너무 좋아요! 다음 주에 같이 가요 ☕
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="댓글 달기..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-stone-100 text-xs focus:outline-none focus:ring-1 focus:ring-[#FF6B57]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!commentText.trim()) return;
                        setFeeds((prev) =>
                          prev.map((f) =>
                            f.id === feed.id
                              ? { ...f, commentsCount: f.commentsCount + 1 }
                              : f
                          )
                        );
                        setCommentText('');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#FF6B57] text-white text-xs font-bold cursor-pointer"
                    >
                      게시
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 새 피드 올리기 모달 */}
      {showUploadModal && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-end justify-center">
          <form
            onSubmit={handleCreateFeed}
            onPaste={handleImagePaste}
            className="w-full max-w-[430px] bg-white rounded-t-3xl p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-stone-900">📸 새 동네 피드 공유</h3>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="p-1 rounded-full hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            {/* 사진 첨부 */}
            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1.5">
                피드 사진 (갤러리 또는 감성 테마)
              </label>

              <p className="mb-1.5 text-[10px] text-stone-400">이미지를 복사한 뒤 이 창에서 Ctrl+V로 붙여넣을 수 있어요.</p>
              {newImage ? (
                <div className="relative rounded-2xl overflow-hidden border border-stone-200 aspect-video bg-stone-100">
                  <img src={newImage} alt="미리보기" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setNewImage('')}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-4 rounded-2xl border border-dashed border-stone-300 hover:border-[#FF6B57] bg-stone-50 flex flex-col items-center justify-center gap-1 text-xs text-stone-600 cursor-pointer transition-colors"
                  >
                    <Camera className="w-5 h-5 text-[#FF6B57]" />
                    <span className="font-bold">내 사진첩에서 고르기</span>
                  </button>

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    <span className="text-[10px] text-stone-400 shrink-0">추천 사진:</span>
                    {PRESET_FEED_PHOTOS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setNewImage(p.url)}
                        className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-[10px] font-medium text-stone-700 whitespace-nowrap cursor-pointer"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 캡션 본문 */}
            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">문구 입력</label>
              <textarea
                rows={4}
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                placeholder="오늘 나눈 동네 산책, 맛있는 음식, 라이브룸 후기를 자유롭게 적어보세요..."
                className="w-full p-3 rounded-2xl border border-stone-200 text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#FF6B57]"
              />
            </div>

            {/* 해시태그 */}
            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">
                해시태그 (쉼표로 구분)
              </label>
              <input
                type="text"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                placeholder="예: 송도카페, 등원후자유, 오늘날씨"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#FF6B57]"
              />
            </div>

            <button
              type="submit"
              disabled={!newImage || !newCaption.trim()}
              className={`w-full py-3.5 rounded-2xl text-xs font-bold shadow-md cursor-pointer transition-colors ${
                newImage && newCaption.trim()
                  ? 'bg-[#FF6B57] hover:bg-[#f05a46] text-white'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              피드 등록하기
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
