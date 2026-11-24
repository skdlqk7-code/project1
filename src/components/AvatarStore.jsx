import React, { useState } from 'react';
import AvatarRenderer from './AvatarRenderer';
import { AVATAR_CUSTOMIZE_OPTIONS, ROOM_INTERIOR_ITEMS } from '../constants/data';
import { Coins, Check, Sparkles, CreditCard, ShoppingBag, X, CheckCircle2 } from 'lucide-react';

// 충전 결제 패키지 옵션
const CASH_PACKAGES = [
  { id: 'cash-1', amount: 1000, bonus: 0, price: 1000, label: '1,000 캐시', badge: null },
  { id: 'cash-3', amount: 3000, bonus: 300, price: 3000, label: '3,300 캐시', badge: '+10% 보너스 🎁' },
  { id: 'cash-5', amount: 5000, bonus: 1000, price: 5000, label: '6,000 캐시', badge: '인기 🏆 (+20%)' },
  { id: 'cash-10', amount: 10000, bonus: 3000, price: 10000, label: '13,000 캐시', badge: '최대 혜택 🔥 (+30%)' },
];

export default function AvatarStore({
  myAvatar,
  setMyAvatar,
  cash,
  setCash,
}) {
  const [activeCategory, setActiveCategory] = useState('gender'); // 'gender' | 'hair' | 'outfit' | 'acc' | 'interior' | 'charge'
  const isFemale = (myAvatar.gender || 'female') === 'female';

  // 4번: 아이템 구매 결제 확인 모달 상태
  const [buyingItem, setBuyingItem] = useState(null);
  const [purchaseToast, setPurchaseToast] = useState('');

  // 4번: 캐시 충전 결제 모달 상태
  const [showChargeModal, setShowChargeModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(CASH_PACKAGES[1]);
  const [paymentMethod, setPaymentMethod] = useState('kakaopay'); // 'kakaopay' | 'tosspay' | 'card'
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState('');

  const currentHairList = isFemale
    ? AVATAR_CUSTOMIZE_OPTIONS.femaleHair
    : AVATAR_CUSTOMIZE_OPTIONS.maleHair;

  const currentOutfitList = isFemale
    ? AVATAR_CUSTOMIZE_OPTIONS.femaleOutfits
    : AVATAR_CUSTOMIZE_OPTIONS.maleOutfits;

  // 아이템 구매 결제 확정
  const handleConfirmPurchase = () => {
    if (!buyingItem) return;
    if (cash < buyingItem.cost) {
      alert('보유 캐시가 부족합니다. 캐시를 먼저 충전해주세요!');
      return;
    }

    setCash((c) => c - buyingItem.cost);
    setMyAvatar((prev) => {
      const isOutfit = buyingItem.type === '의상';
      const isAcc = buyingItem.type === '소품';
      const isInterior = buyingItem.type === '인테리어';

      return {
        ...prev,
        ownedItems: [...(prev.ownedItems || []), buyingItem.id],
        outfit: isOutfit ? buyingItem.id : prev.outfit,
        accessory: isAcc ? buyingItem.id : prev.accessory,
      };
    });

    setPurchaseToast(`✨ [${buyingItem.name}] 구매 및 착장이 완료되었습니다!`);
    setBuyingItem(null);
    setTimeout(() => setPurchaseToast(''), 3000);
  };

  // 캐시 PG 결제 시뮬레이션
  const handleProcessPayment = (e) => {
    e.preventDefault();
    const totalAdded = selectedPackage.amount + selectedPackage.bonus;
    setCash((c) => c + totalAdded);
    setPaymentSuccessMsg(`🎉 ${selectedPackage.price.toLocaleString()}원 결제 완료! +${totalAdded.toLocaleString()} 캐시 충전`);

    setTimeout(() => {
      setPaymentSuccessMsg('');
      setShowChargeModal(false);
    }, 1800);
  };

  return (
    <div className="space-y-4">
      {/* 상단 캐시 잔액 및 충전 결제 버튼 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-stone-900">도트 피팅룸 & 인테리어 상점</h2>
          <p className="text-xs text-stone-500">싸이월드 미니미 착장과 2D 룸 꾸미기 소품</p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              setCash((c) => c + 100);
              setPurchaseToast('🎬 30초 광고 시청 완료! 무료 +100 캐시 적립');
              setTimeout(() => setPurchaseToast(''), 2500);
            }}
            className="px-2.5 py-1.5 rounded-2xl bg-[#00D084]/20 hover:bg-[#00D084]/30 text-[#008A56] text-[11px] font-black cursor-pointer border border-[#00D084]/40 transition-colors"
          >
            🎬 무료 +100
          </button>
          <button
            type="button"
            onClick={() => setShowChargeModal(true)}
            className="px-3 py-1.5 rounded-2xl bg-[#6B2896] hover:bg-[#521c75] text-white text-xs font-black shadow-xs cursor-pointer flex items-center gap-1 transition-colors"
          >
            <Coins className="w-3.5 h-3.5" /> 캐시 충전소
          </button>
        </div>
      </div>

      {purchaseToast && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center animate-bounce">
          {purchaseToast}
        </div>
      )}

      {/* 내 도트 아바타 피팅 쇼케이스 */}
      <div className="p-5 rounded-3xl bg-gradient-to-b from-white to-[#FAF6F2] border border-stone-200 flex flex-col items-center shadow-xs">
        <div className="py-2">
          <AvatarRenderer
            gender={myAvatar.gender || 'female'}
            hair={myAvatar.hair || (isFemale ? 'long-wave' : 'dandy')}
            outfit={myAvatar.outfit || (isFemale ? 'dress-pink' : 'hoodie-navy')}
            accessory={myAvatar.accessory}
            effect={myAvatar.effect}
            size="xl"
          />
        </div>

        <div className="mt-2 text-center w-full max-w-xs">
          <div className="flex items-center justify-center gap-1.5">
            <span className="font-bold text-sm text-stone-900">{myAvatar.name}</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-medium">
              {isFemale ? '여성 미니미' : '남성 미니미'}
            </span>
          </div>
          <p className="text-xs text-[#FF6B57] font-semibold mt-0.5">
            🪙 보유 잔액: {cash.toLocaleString()} 캐시
          </p>
        </div>
      </div>

      {/* 카테고리 탭: 성별, 헤어, 의상, 소품, 룸 인테리어 */}
      <div className="grid grid-cols-5 gap-1 bg-stone-100 p-1 rounded-2xl text-xs font-bold">
        {[
          { id: 'gender', label: '성별' },
          { id: 'hair', label: '헤어' },
          { id: 'outfit', label: '의상' },
          { id: 'acc', label: '소품' },
          { id: 'interior', label: '룸인테리어' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveCategory(tab.id)}
            className={`py-2 rounded-xl transition-all cursor-pointer text-center ${
              activeCategory === tab.id
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. 성별 체형 */}
      {activeCategory === 'gender' && (
        <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-xs">
          <h3 className="text-xs font-bold text-stone-600">성별 기본 체형</h3>
          <div className="grid grid-cols-2 gap-3">
            {AVATAR_CUSTOMIZE_OPTIONS.gender.map((g) => {
              const selected = (myAvatar.gender || 'female') === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() =>
                    setMyAvatar((prev) => ({
                      ...prev,
                      gender: g.id,
                      hair: g.id === 'female' ? 'long-wave' : 'dandy',
                      outfit: g.id === 'female' ? 'dress-pink' : 'hoodie-navy',
                    }))
                  }
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                    selected
                      ? 'border-[#FF6B57] bg-[#FF6B57]/5 ring-2 ring-[#FF6B57]/20 font-bold text-stone-900'
                      : 'border-stone-200 hover:border-stone-300 text-stone-600'
                  }`}
                >
                  <span className="text-3xl">{g.icon}</span>
                  <span className="text-xs">{g.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. 도트 헤어 */}
      {activeCategory === 'hair' && (
        <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-xs">
          <h3 className="text-xs font-bold text-stone-600">도트 헤어스타일</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {currentHairList.map((h) => {
              const selected = myAvatar.hair === h.id;
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setMyAvatar((prev) => ({ ...prev, hair: h.id }))}
                  className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                    selected
                      ? 'border-[#FF6B57] bg-[#FF6B57]/5 ring-2 ring-[#FF6B57]/20 text-stone-900 font-bold'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <span className="text-2xl">{h.preview}</span>
                  <div className="text-left">
                    <p className="text-xs font-semibold">{h.name}</p>
                    <p className="text-[10px] text-stone-400">자유 변경</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. 의상 구매/착장 */}
      {activeCategory === 'outfit' && (
        <div className="space-y-2.5">
          {currentOutfitList.map((item) => {
            const owned = (myAvatar.ownedItems || []).includes(item.id) || item.cost === 0;
            const equipped = myAvatar.outfit === item.id;
            return (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-white border border-stone-200 flex items-center justify-between shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.preview}</span>
                  <div>
                    <p className="text-xs font-bold text-stone-900">{item.name}</p>
                    <p className="text-[11px] text-stone-500">{item.desc}</p>
                  </div>
                </div>

                {owned ? (
                  <button
                    type="button"
                    onClick={() => setMyAvatar((prev) => ({ ...prev, outfit: item.id }))}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                      equipped ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-900 text-white'
                    }`}
                  >
                    {equipped ? '착용중' : '착용하기'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setBuyingItem({ ...item, type: '의상' })}
                    className="px-3.5 py-1.5 rounded-xl bg-[#FF6B57] hover:bg-[#f05a46] text-white text-xs font-bold cursor-pointer shadow-xs"
                  >
                    {item.cost} 캐시 구매
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 4. 도트 소품 */}
      {activeCategory === 'acc' && (
        <div className="space-y-2.5">
          {AVATAR_CUSTOMIZE_OPTIONS.accessories.map((item) => {
            const isNone = item.id === 'acc-none';
            const owned = (myAvatar.ownedItems || []).includes(item.id) || item.cost === 0;
            const equipped = isNone ? !myAvatar.accessory : myAvatar.accessory === item.id;
            return (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-white border border-stone-200 flex items-center justify-between shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.preview}</span>
                  <div>
                    <p className="text-xs font-bold text-stone-900">{item.name}</p>
                    {item.desc && <p className="text-[11px] text-stone-500">{item.desc}</p>}
                  </div>
                </div>

                {owned ? (
                  <button
                    type="button"
                    onClick={() =>
                      setMyAvatar((prev) => ({
                        ...prev,
                        accessory: isNone ? null : item.id,
                      }))
                    }
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                      equipped ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-900 text-white'
                    }`}
                  >
                    {equipped ? '착용중' : '착용하기'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setBuyingItem({ ...item, type: '소품' })}
                    className="px-3.5 py-1.5 rounded-xl bg-[#FF6B57] hover:bg-[#f05a46] text-white text-xs font-bold cursor-pointer shadow-xs"
                  >
                    {item.cost} 캐시 구매
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 5. 2번 요구사항: 룸 인테리어 소품 상점 */}
      {activeCategory === 'interior' && (
        <div className="space-y-2.5">
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-800 font-medium">
            🛋️ 구매한 인테리어 소품은 라이브룸 미니 라운지에 자동으로 아늑하게 배치됩니다!
          </div>

          {ROOM_INTERIOR_ITEMS.map((item) => {
            const owned = (myAvatar.ownedItems || []).includes(item.id);
            return (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-white border border-stone-200 flex items-center justify-between shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.emoji}</span>
                  <div>
                    <p className="text-xs font-bold text-stone-900">{item.name}</p>
                    <p className="text-[11px] text-stone-500">{item.desc}</p>
                  </div>
                </div>

                {owned ? (
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    보유 및 배치중
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setBuyingItem({ ...item, preview: item.emoji, type: '인테리어' })}
                    className="px-3.5 py-1.5 rounded-xl bg-[#FF6B57] hover:bg-[#f05a46] text-white text-xs font-bold cursor-pointer shadow-xs"
                  >
                    {item.cost} 캐시 구매
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 4번 요구사항: 아이템 결제 확인 모달 */}
      {buyingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-[360px] bg-white rounded-3xl p-5 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
              <h3 className="font-bold text-base text-stone-900 flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-[#FF6B57]" /> 아이템 구매 확인
              </h3>
              <button
                type="button"
                onClick={() => setBuyingItem(null)}
                className="p-1 rounded-full hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            <div className="text-center py-2">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 text-3xl flex items-center justify-center mx-auto mb-2">
                {buyingItem.preview}
              </div>
              <h4 className="font-bold text-sm text-stone-900">{buyingItem.name}</h4>
              <p className="text-xs text-stone-500 mt-0.5">{buyingItem.desc}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>아이템 금액:</span>
                <span className="font-bold">{buyingItem.cost} 캐시</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>현재 보유 캐시:</span>
                <span className="font-bold">{cash.toLocaleString()} 캐시</span>
              </div>
              <div className="flex justify-between text-[#FF6B57] font-bold pt-1.5 border-t border-stone-200">
                <span>결제 후 잔액:</span>
                <span>{(cash - buyingItem.cost).toLocaleString()} 캐시</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleConfirmPurchase}
              className="w-full py-3.5 rounded-2xl bg-[#FF6B57] hover:bg-[#f05a46] text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
            >
              캐시로 결제하기 (즉시 착장)
            </button>
          </div>
        </div>
      )}

      {/* 4번 요구사항: 캐시 충전 결제창 모달 (카카오페이 / 토스 / 카드) */}
      {showChargeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleProcessPayment}
            className="w-full max-w-[390px] bg-white rounded-3xl p-5 space-y-4 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
              <div className="flex items-center gap-1.5">
                <Coins className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-base text-stone-900">캐시 충전 결제센터</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowChargeModal(false)}
                className="p-1 rounded-full hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            {paymentSuccessMsg ? (
              <div className="py-8 flex flex-col items-center justify-center space-y-2 text-center animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-bounce" />
                <p className="text-sm font-bold text-stone-800">{paymentSuccessMsg}</p>
              </div>
            ) : (
              <>
                {/* 패키지 선택 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-600 block">
                    충전할 캐시 선택
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {CASH_PACKAGES.map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackage(pkg)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          selectedPackage.id === pkg.id
                            ? 'border-[#FF6B57] bg-[#FF6B57]/5 ring-2 ring-[#FF6B57]/20 text-stone-900 font-bold'
                            : 'border-stone-200 text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        {pkg.badge && (
                          <span className="text-[10px] text-[#FF6B57] font-bold block mb-0.5">
                            {pkg.badge}
                          </span>
                        )}
                        <p className="text-xs font-bold">{pkg.label}</p>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          {pkg.price.toLocaleString()}원
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 결제 수단 선택 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-600 block">
                    간편 결제 수단
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'kakaopay', name: '카카오페이', icon: '🟡' },
                      { id: 'tosspay', name: '토스페이', icon: '🔵' },
                      { id: 'card', name: '신용/체크카드', icon: '💳' },
                    ].map((pm) => (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`py-2.5 px-2 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                          paymentMethod === pm.id
                            ? 'border-stone-900 bg-stone-900 text-white'
                            : 'border-stone-200 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        <span>{pm.icon}</span>
                        <span>{pm.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 최종 결제 금액 */}
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-xs flex items-center justify-between">
                  <span className="text-stone-600 font-medium">최종 결제 금액</span>
                  <span className="text-base font-black text-[#FF6B57]">
                    {selectedPackage.price.toLocaleString()}원
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#FF6B57] hover:bg-[#f05a46] text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
                >
                  {selectedPackage.price.toLocaleString()}원 결제하기
                </button>
              </>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
