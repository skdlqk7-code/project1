import React, { useState, useRef } from 'react';
import {
  Heart,
  MessageSquare,
  Plus,
  X,
  Share2,
  Sparkles,
  Send,
  Tag,
  Image as ImageIcon,
  Camera,
} from 'lucide-react';
import AvatarRenderer from './AvatarRenderer';

// 간편하게 선택 가능한 감성 사진 프리셋 (Unsplash 무료 라이선스)
const PRESET_IMAGES = [
  { id: 'img-cook', label: '🍳 요리', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80' },
  { id: 'img-cafe', label: '☕ 카페/빵', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80' },
  { id: 'img-park', label: '🚗 여행/공원', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  { id: 'img-run', label: '🏃 운동', url: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80' },
];

export default function CommunityBoard({
  posts,
  setPosts,
  myAvatar,
  selectedDistrict,
}) {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [selectedPostDetail, setSelectedPostDetail] = useState(null);

  // 글쓰기 폼 상태
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('🍳 요리·레시피');
  const [newTagInput, setNewTagInput] = useState('');
  const [attachedImage, setAttachedImage] = useState('');

  const fileInputRef = useRef(null);

  // 로컬 파일 이미지 선택 처리
  const readImageFile = (file) => {
    if (!file?.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => setAttachedImage(event.target.result);
    reader.readAsDataURL(file);
  };

  const handleImageFileChange = (e) => {
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

  // 댓글 상태
  const [commentsMap, setCommentsMap] = useState({
    'post-1': [
      { id: 1, author: '민지맘', text: '오 버터 반 스푼 꿀팁 메모합니다!! 오늘 저녁 메뉴 당첨이에요 ㅎㅎ', time: '40분 전' },
      { id: 2, author: '하은맘', text: '아이들 야채 먹이기 진짜 힘든데 덮밥으로 하면 잘 먹더라고요!', time: '15분 전' },
    ],
    'post-2': [
      { id: 1, author: '유진맘', text: '문보트 낮에 타도 덥지 않나요? 그늘막 스팟 어디인지 궁금해요~', time: '2시간 전' },
    ],
  });
  const [newCommentText, setNewCommentText] = useState('');

  const categories = [
    '전체',
    '🍳 요리·레시피',
    '🚗 가족여행·나들이',
    '☕ 일상·수다',
    '🏃 운동·루틴',
  ];

  const filteredPosts =
    selectedCategory === '전체'
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  // 좋아요 토글
  const handleToggleLike = (postId, e) => {
    e.stopPropagation();
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = post.userLiked;
          return {
            ...post,
            likes: isLiked ? post.likes - 1 : post.likes + 1,
            userLiked: !isLiked,
          };
        }
        return post;
      })
    );

    if (selectedPostDetail && selectedPostDetail.id === postId) {
      setSelectedPostDetail((prev) => ({
        ...prev,
        likes: prev.userLiked ? prev.likes - 1 : prev.likes + 1,
        userLiked: !prev.userLiked,
      }));
    }
  };

  // 새 글 등록
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const tags = newTagInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const created = {
      id: `post-${Date.now()}`,
      category: newCategory,
      title: newTitle.trim(),
      content: newContent.trim(),
      imageUrl: attachedImage || null,
      author: {
        name: myAvatar.name,
        district: selectedDistrict,
        gender: myAvatar.gender || 'female',
        hair: myAvatar.hair,
        outfit: myAvatar.outfit,
        accessory: myAvatar.accessory,
      },
      likes: 1,
      userLiked: true,
      commentsCount: 0,
      createdAt: '방금',
      isPopular: false,
      tags: tags.length > 0 ? tags : ['동네소통'],
    };

    setPosts((prev) => [created, ...prev]);
    setNewTitle('');
    setNewContent('');
    setNewTagInput('');
    setAttachedImage('');
    setShowWriteModal(false);
  };

  // 댓글 등록
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim() || !selectedPostDetail) return;

    const newComment = {
      id: Date.now(),
      author: myAvatar.name,
      text: newCommentText.trim(),
      time: '방금',
    };

    setCommentsMap((prev) => ({
      ...prev,
      [selectedPostDetail.id]: [...(prev[selectedPostDetail.id] || []), newComment],
    }));

    setPosts((prev) =>
      prev.map((p) =>
        p.id === selectedPostDetail.id
          ? { ...p, commentsCount: p.commentsCount + 1 }
          : p
      )
    );

    setSelectedPostDetail((prev) => ({
      ...prev,
      commentsCount: prev.commentsCount + 1,
    }));

    setNewCommentText('');
  };

  return (
    <div className="space-y-4">
      {/* 상단 헤더 & 이야기 올리기 버튼 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-stone-900">우리 동네 하루 이야기</h2>
          <p className="text-xs text-stone-500">사진과 함께 나누는 레시피 & 여행 & 일상</p>
        </div>
        <button
          type="button"
          onClick={() => setShowWriteModal(true)}
          className="px-3.5 py-2 rounded-2xl bg-[#FF6B57] hover:bg-[#f05a46] text-white text-xs font-bold flex items-center gap-1 shadow-sm cursor-pointer transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> 이야기 올리기
        </button>
      </div>

      {/* 카테고리 필터 칩 */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 게시글 목록 */}
      <div className="space-y-3.5">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPostDetail(post)}
            className="p-4 rounded-3xl bg-white border border-stone-200 hover:border-[#FF6B57]/50 transition-all cursor-pointer space-y-3 shadow-xs overflow-hidden"
          >
            {/* 작성자 정보 & 카테고리 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AvatarRenderer
                  gender={post.author.gender || 'female'}
                  hair={post.author.hair || 'long-wave'}
                  outfit={post.author.outfit || 'dress-pink'}
                  accessory={post.author.accessory}
                  size="sm"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-stone-900">{post.author.name}</span>
                    <span className="text-[10px] text-stone-400">· {post.createdAt}</span>
                  </div>
                  <p className="text-[10px] text-stone-500">{post.author.district || selectedDistrict}</p>
                </div>
              </div>

              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 font-semibold">
                {post.category}
              </span>
            </div>

            {/* 본문 제목 & 내용 */}
            <div>
              <h3 className="font-bold text-sm text-stone-900 leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                {post.content}
              </p>
            </div>

            {/* 첨부된 사진 렌더링 (4번 사진 첨부 기능 지원) */}
            {post.imageUrl && (
              <div className="w-full h-44 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/60">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            {/* 태그 리스트 */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {post.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF8F5] text-stone-600 border border-stone-200"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* 하단 반응 (좋아요 & 댓글) */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={(e) => handleToggleLike(post.id, e)}
                  className={`flex items-center gap-1 font-semibold cursor-pointer transition-colors ${
                    post.userLiked ? 'text-[#FF6B57]' : 'hover:text-[#FF6B57]'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${post.userLiked ? 'fill-current text-[#FF6B57]' : ''}`}
                  />
                  <span>{post.likes}</span>
                </button>
                <div className="flex items-center gap-1 font-semibold">
                  <MessageSquare className="w-4 h-4 text-stone-400" />
                  <span>{post.commentsCount}</span>
                </div>
              </div>
              <span className="text-[11px] text-stone-400">자세히 보기 →</span>
            </div>
          </div>
        ))}
      </div>

      {/* 글 상세 보기 모달 */}
      {selectedPostDetail && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center">
          <div className="w-full max-w-[430px] bg-white rounded-t-3xl p-5 space-y-4 max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <span className="text-xs font-bold text-[#FF6B57]">
                {selectedPostDetail.category}
              </span>
              <button
                type="button"
                onClick={() => setSelectedPostDetail(null)}
                className="p-1 rounded-full hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              <div className="flex items-center gap-2.5">
                <AvatarRenderer
                  gender={selectedPostDetail.author.gender || 'female'}
                  hair={selectedPostDetail.author.hair || 'long-wave'}
                  outfit={selectedPostDetail.author.outfit || 'dress-pink'}
                  accessory={selectedPostDetail.author.accessory}
                  size="md"
                />
                <div>
                  <h4 className="font-bold text-xs text-stone-900">{selectedPostDetail.author.name}</h4>
                  <p className="text-[10px] text-stone-400">
                    {selectedPostDetail.author.district || selectedDistrict} · {selectedPostDetail.createdAt}
                  </p>
                </div>
              </div>

              <h2 className="text-base font-bold text-stone-900 leading-snug">
                {selectedPostDetail.title}
              </h2>

              {selectedPostDetail.imageUrl && (
                <div className="w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                  <img
                    src={selectedPostDetail.imageUrl}
                    alt={selectedPostDetail.title}
                    className="w-full max-h-72 object-cover"
                  />
                </div>
              )}

              <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-line bg-[#FAF8F5] p-3.5 rounded-2xl border border-stone-200">
                {selectedPostDetail.content}
              </p>

              {/* 좋아요 버튼 */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handleToggleLike(selectedPostDetail.id, e)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                    selectedPostDetail.userLiked
                      ? 'bg-[#FF6B57]/10 text-[#FF6B57] border-[#FF6B57]'
                      : 'bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${selectedPostDetail.userLiked ? 'fill-current' : ''}`}
                  />
                  <span>공감 {selectedPostDetail.likes}</span>
                </button>
              </div>

              {/* 댓글 목록 */}
              <div className="space-y-2.5 pt-2 border-t border-stone-100">
                <h5 className="text-xs font-bold text-stone-800">
                  댓글 {selectedPostDetail.commentsCount}개
                </h5>

                <div className="space-y-2">
                  {(commentsMap[selectedPostDetail.id] || []).map((c) => (
                    <div key={c.id} className="p-2.5 rounded-xl bg-stone-50 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-800">{c.author}</span>
                        <span className="text-[10px] text-stone-400">{c.time}</span>
                      </div>
                      <p className="text-stone-600 leading-relaxed">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 댓글 입력창 */}
            <form onSubmit={handleAddComment} className="flex gap-2 pt-2 border-t border-stone-200">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="따뜻한 댓글을 남겨보세요..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-stone-100 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#FF6B57]"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-[#FF6B57] hover:bg-[#f05a46] text-white text-xs font-bold cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4번 요구사항: 사진 첨부 기능이 포함된 글쓰기 모달 */}
      {showWriteModal && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-end justify-center">
          <form
            onSubmit={handleCreatePost}
            onPaste={handleImagePaste}
            className="w-full max-w-[430px] bg-white rounded-t-3xl p-5 space-y-3.5 shadow-2xl animate-in slide-in-from-bottom max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-stone-900">✍️ 오늘의 하루 이야기 올리기</h3>
              <button
                type="button"
                onClick={() => setShowWriteModal(false)}
                className="p-1 rounded-full hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">카테고리</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  '🍳 요리·레시피',
                  '🚗 가족여행·나들이',
                  '☕ 일상·수다',
                  '🏃 운동·루틴',
                ].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setNewCategory(c)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer text-left ${
                      newCategory === c
                        ? 'border-[#FF6B57] bg-[#FF6B57]/10 text-[#FF6B57]'
                        : 'border-stone-200 text-stone-600'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">제목</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="예: 15분 만에 완성한 아이 덮밥 & 남편 야식 레시피!"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#FF6B57]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">내용</label>
              <textarea
                rows={4}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="재료, 조리 순서, 가족과 함께한 순간의 팁이나 소감을 편하게 적어주세요..."
                className="w-full p-3 rounded-xl border border-stone-200 text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#FF6B57]"
              />
            </div>

            {/* 📸 사진 첨부 기능 (파일 업로드 + 프리셋) */}
            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1.5 flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-[#FF6B57]" /> 사진 첨부 (내 갤러리 또는 추천 사진)
              </label>

              <p className="mb-1.5 text-[10px] text-stone-400">이미지를 복사한 뒤 이 창에서 Ctrl+V로 붙여넣을 수 있어요.</p>
              {attachedImage ? (
                <div className="relative rounded-2xl overflow-hidden border border-stone-200 h-36 bg-stone-100">
                  <img src={attachedImage} alt="첨부 미리보기" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setAttachedImage('')}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80"
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
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2.5 rounded-xl border border-dashed border-stone-300 hover:border-[#FF6B57] bg-stone-50 flex items-center justify-center gap-1.5 text-xs text-stone-600 cursor-pointer transition-colors"
                  >
                    <ImageIcon className="w-4 h-4 text-[#FF6B57]" />
                    <span>내 기기에서 사진 불러오기</span>
                  </button>

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    <span className="text-[10px] text-stone-400 shrink-0">추천 테마:</span>
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setAttachedImage(preset.url)}
                        className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-[10px] font-medium text-stone-700 whitespace-nowrap cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">
                태그 (쉼표로 구분)
              </label>
              <input
                type="text"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                placeholder="예: 초간단, 주말점심, 아이밥상"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#FF6B57]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#FF6B57] hover:bg-[#f05a46] text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
            >
              사진과 함께 이야기 등록하기
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
