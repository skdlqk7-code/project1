import React, { useState } from 'react';
import { Mail, MessageCircle, Send, X, Plus, ChevronRight, Check } from 'lucide-react';
import { INITIAL_CHAT_ROOMS, INITIAL_LETTERS } from '../constants/data';

export default function ChatTab({ myAvatar, selectedDistrict }) {
  const [chatRooms, setChatRooms] = useState(INITIAL_CHAT_ROOMS);
  const [letters, setLetters] = useState(INITIAL_LETTERS);
  const [activeRoom, setActiveRoom] = useState(null);
  const [roomMessages, setRoomMessages] = useState({
    'chat-1': [
      { id: 1, sender: '민지맘', text: '내일 센트럴파크 카페 10시 30분에 만나요!', time: '오후 2:40', isMe: false },
      { id: 2, sender: '서연맘', text: '네 좋습니다~ 유모차 끌고 갈게요!', time: '오후 2:42', isMe: false },
    ],
    'chat-2': [
      { id: 1, sender: '준호', text: '오늘 비 안 올 것 같으니 정상 진행합니다~', time: '오전 11:15', isMe: false },
    ],
    'chat-3': [
      { id: 1, sender: '도현', text: '앞치마는 공방에 준비되어 있습니다 :)', time: '어제', isMe: false },
    ],
  });

  const [inputMsg, setInputMsg] = useState('');
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [showWriteLetter, setShowWriteLetter] = useState(false);
  const [newLetterTo, setNewLetterTo] = useState('민지맘');
  const [newLetterContent, setNewLetterContent] = useState('');
  const [sendSuccessMsg, setSendSuccessMsg] = useState('');

  const unreadLettersCount = letters.filter((l) => !l.read).length;

  // 메시지 전송
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim() || !activeRoom) return;

    const newMsg = {
      id: Date.now(),
      sender: myAvatar.name,
      text: inputMsg.trim(),
      time: '방금',
      isMe: true,
    };

    setRoomMessages((prev) => ({
      ...prev,
      [activeRoom.id]: [...(prev[activeRoom.id] || []), newMsg],
    }));

    // 최근 메시지 업데이트
    setChatRooms((prev) =>
      prev.map((r) =>
        r.id === activeRoom.id ? { ...r, lastMessage: inputMsg.trim(), lastTime: '방금' } : r
      )
    );

    setInputMsg('');
  };

  // 쪽지 전송
  const handleSendLetter = (e) => {
    e.preventDefault();
    if (!newLetterContent.trim()) return;

    const created = {
      id: `letter-${Date.now()}`,
      from: `나(${myAvatar.name}) → ${newLetterTo}`,
      district: selectedDistrict,
      avatarEmoji: myAvatar.gender === 'female' ? '👩' : '👨',
      title: `${newLetterTo}님께 보낸 쪽지`,
      content: newLetterContent.trim(),
      time: '방금',
      read: true,
    };

    setLetters((prev) => [created, ...prev]);
    setNewLetterContent('');
    setShowWriteLetter(false);
    setSendSuccessMsg('💌 쪽지가 성공적으로 전송되었습니다!');
    setTimeout(() => setSendSuccessMsg(''), 2500);
  };

  return (
    <div className="space-y-4">
      {/* 상단 헤더 & 우측 상단 쪽지 버튼 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-stone-900">채팅 & 모임톡</h2>
          <p className="text-xs text-stone-500">{selectedDistrict} 참여자 실시간 대화</p>
        </div>

        {/* 우측 상단 쪽지 버튼 */}
        <button
          type="button"
          onClick={() => setShowLetterModal(true)}
          className="relative px-3.5 py-2 rounded-2xl bg-white border border-stone-200 hover:border-[#FF6B57] text-xs font-bold text-stone-800 flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
        >
          <Mail className="w-4 h-4 text-[#FF6B57]" />
          <span>쪽지함</span>
          {unreadLettersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#FF6B57] text-white text-[10px] font-bold flex items-center justify-center">
              {unreadLettersCount}
            </span>
          )}
        </button>
      </div>

      {sendSuccessMsg && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center animate-fade-in">
          {sendSuccessMsg}
        </div>
      )}

      {/* 1. 활성 채팅방 상세 대화 화면 */}
      {activeRoom ? (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden flex flex-col h-[520px] shadow-sm">
          {/* 채팅방 상단바 */}
          <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveRoom(null)}
                className="text-xs text-stone-500 hover:text-stone-800 font-bold cursor-pointer"
              >
                ← 목록
              </button>
              <div>
                <h3 className="font-bold text-xs text-stone-900">{activeRoom.title}</h3>
                <span className="text-[10px] text-stone-400">참여자 {activeRoom.membersCount}명</span>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4CAF88]/10 text-[#4CAF88] font-bold">
              {activeRoom.category}
            </span>
          </div>

          {/* 대화 메시지 영역 */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-[#FAF8F5]">
            {(roomMessages[activeRoom.id] || []).map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
              >
                {!msg.isMe && (
                  <span className="text-[10px] text-stone-400 mb-0.5 ml-1">{msg.sender}</span>
                )}
                <div
                  className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
                    msg.isMe
                      ? 'bg-[#FF6B57] text-white rounded-tr-none'
                      : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-stone-400 mt-0.5 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* 메시지 전송 인풋 */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-stone-200 flex gap-2"
          >
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="따뜻한 한마디를 남겨보세요..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-stone-100 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#FF6B57]"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-[#FF6B57] hover:bg-[#f05a46] text-white text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      ) : (
        /* 2. 채팅방 목록 */
        <div className="space-y-2.5">
          {chatRooms.map((room) => (
            <div
              key={room.id}
              onClick={() => setActiveRoom(room)}
              className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-[#FF6B57]/60 transition-all cursor-pointer flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-stone-100 flex items-center justify-center text-xl shrink-0">
                  <MessageCircle className="w-5 h-5 text-[#FF6B57]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-xs text-stone-900">{room.title}</h4>
                    <span className="text-[10px] text-stone-400">· {room.membersCount}명</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5 truncate max-w-[210px]">
                    {room.lastMessage}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-[10px] text-stone-400">{room.lastTime}</span>
                {room.unread > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#FF6B57] text-white text-[10px] font-bold flex items-center justify-center">
                    {room.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. 쪽지함 모달 */}
      {showLetterModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center">
          <div className="w-full max-w-[430px] bg-white rounded-t-3xl p-5 space-y-4 max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#FF6B57]" />
                <h3 className="font-bold text-base text-stone-900">쪽지 보관함</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowWriteLetter(true)}
                  className="px-2.5 py-1 rounded-xl bg-[#FF6B57] text-white text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-[#f05a46]"
                >
                  <Plus className="w-3.5 h-3.5" /> 쪽지 쓰기
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLetterModal(false);
                    setSelectedLetter(null);
                  }}
                  className="p-1 rounded-full hover:bg-stone-100 cursor-pointer"
                >
                  <X className="w-5 h-5 text-stone-400" />
                </button>
              </div>
            </div>

            {/* 쪽지 상세 보기 뷰 */}
            {selectedLetter ? (
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{selectedLetter.avatarEmoji}</span>
                    <div>
                      <p className="text-xs font-bold text-stone-900">{selectedLetter.from}</p>
                      <p className="text-[10px] text-stone-400">{selectedLetter.district} · {selectedLetter.time}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedLetter(null)}
                    className="text-xs text-stone-500 underline cursor-pointer"
                  >
                    목록으로
                  </button>
                </div>
                <h4 className="text-sm font-bold text-stone-800">{selectedLetter.title}</h4>
                <p className="text-xs text-stone-700 leading-relaxed bg-white p-3 rounded-xl border border-stone-200">
                  {selectedLetter.content}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setNewLetterTo(selectedLetter.from.split('(')[0]);
                    setSelectedLetter(null);
                    setShowWriteLetter(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold cursor-pointer hover:bg-stone-800"
                >
                  답장 쪽지 보내기
                </button>
              </div>
            ) : (
              /* 받은 쪽지 목록 */
              <div className="space-y-2.5 overflow-y-auto flex-1">
                {letters.map((letItem) => (
                  <div
                    key={letItem.id}
                    onClick={() => {
                      setSelectedLetter(letItem);
                      setLetters((prev) =>
                        prev.map((l) => (l.id === letItem.id ? { ...l, read: true } : l))
                      );
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      letItem.read
                        ? 'bg-stone-50/70 border-stone-200'
                        : 'bg-white border-[#FF6B57]/50 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{letItem.avatarEmoji}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-bold text-stone-900">{letItem.from}</p>
                          {!letItem.read && (
                            <span className="w-2 h-2 rounded-full bg-[#FF6B57]" />
                          )}
                        </div>
                        <p className="text-xs text-stone-600 truncate max-w-[210px] mt-0.5">
                          {letItem.title}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-stone-400 shrink-0">{letItem.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. 새 쪽지 쓰기 모달 */}
      {showWriteLetter && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-end justify-center">
          <form
            onSubmit={handleSendLetter}
            className="w-full max-w-[430px] bg-white rounded-t-3xl p-5 space-y-3.5 shadow-2xl animate-in slide-in-from-bottom"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-stone-900">💌 새 쪽지 보내기</h3>
              <button
                type="button"
                onClick={() => setShowWriteLetter(false)}
                className="p-1 rounded-full hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">받는 사람</label>
              <select
                value={newLetterTo}
                onChange={(e) => setNewLetterTo(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs bg-white text-stone-800"
              >
                <option value="민지맘">민지맘 (23년생 또래맘)</option>
                <option value="서연맘">서연맘 (커피수혈)</option>
                <option value="지우맘">지우맘 (육퇴완료)</option>
                <option value="준호">준호 (초보러너)</option>
                <option value="도현">도현 (키링수집가)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">쪽지 내용</label>
              <textarea
                rows={4}
                value={newLetterContent}
                onChange={(e) => setNewLetterContent(e.target.value)}
                placeholder="상대방에게 전하고 싶은 이야기나 약속 제안을 적어보세요..."
                className="w-full p-3 rounded-xl border border-stone-200 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#FF6B57]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#FF6B57] hover:bg-[#f05a46] text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
            >
              쪽지 전송하기
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
