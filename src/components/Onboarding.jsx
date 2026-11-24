import React from 'react';
import { ChevronLeft, MapPin, Sparkles } from 'lucide-react';
import { ONBOARDING_MOMENTS, ONBOARDING_PEOPLE, REGIONS } from '../constants/data';

export default function Onboarding({
  obStep,
  setObStep,
  selectedMoment,
  setSelectedMoment,
  selectedPeople,
  setSelectedPeople,
  selectedCity,
  setSelectedCity,
  selectedDistrict,
  setSelectedDistrict,
  onFinish,
  onSkip,
}) {
  const currentDistricts = REGIONS[selectedCity] || [];

  return (
    <div className="min-h-screen bg-[#F6F7FB] flex justify-center font-sans">
      <div className="w-full max-w-[430px] bg-white min-h-screen flex flex-col justify-between p-6 shadow-xl">
        <div>
          {/* 상단 프로그레스 및 네비게이션: CU 퍼플 프로그레스 바 */}
          <div className="flex items-center gap-2 mb-6">
            {obStep > 1 ? (
              <button
                type="button"
                onClick={() => setObStep((s) => s - 1)}
                className="p-1 rounded-full hover:bg-purple-50 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 text-stone-700" />
              </button>
            ) : (
              <div className="w-7" />
            )}
            <div className="flex-1 grid grid-cols-3 gap-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 rounded-full transition-colors ${
                    obStep >= step ? 'bg-[#6B2896]' : 'bg-purple-100'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={onSkip}
              className="text-xs text-stone-400 hover:text-stone-600 cursor-pointer font-bold"
            >
              건너뛰기
            </button>
          </div>

          {/* 1단계: 함께하고 싶은 순간 */}
          {obStep === 1 && (
            <div>
              <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#00D084]/20 text-[#008A56] mb-2 inline-block">
                STEP 1 · 취향 선택
              </span>
              <h1 className="text-2xl font-black leading-snug mb-2 text-stone-900">
                어떤 순간에<br />함께하고 싶으세요?
              </h1>
              <p className="text-xs text-stone-500 mb-6">
                선택하신 결에 맞춰 메인 피드와 워밍업 방을 골라드려요.
              </p>
              <div className="space-y-3">
                {ONBOARDING_MOMENTS.map((item) => {
                  const active = selectedMoment === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedMoment(item.id)}
                      className={`w-full text-left p-4 rounded-3xl border text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? 'border-[#6B2896] bg-[#6B2896]/5 text-[#6B2896] ring-2 ring-[#6B2896]/20 shadow-xs'
                          : 'border-purple-100 bg-[#F6F7FB] hover:border-purple-200 text-stone-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2단계: 어울리고 싶은 사람들 */}
          {obStep === 2 && (
            <div>
              <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#00D084]/20 text-[#008A56] mb-2 inline-block">
                STEP 2 · 이웃 취향
              </span>
              <h1 className="text-2xl font-black leading-snug mb-1 text-stone-900">
                어떤 사람들과<br />어울리고 싶으세요?
              </h1>
              <p className="text-xs text-stone-500 mb-6">최대 2개까지 선택할 수 있어요</p>
              <div className="grid grid-cols-3 gap-3">
                {ONBOARDING_PEOPLE.map((person) => {
                  const active = selectedPeople.includes(person.id);
                  return (
                    <button
                      key={person.id}
                      type="button"
                      onClick={() => {
                        if (active) {
                          setSelectedPeople((prev) => prev.filter((p) => p !== person.id));
                        } else if (selectedPeople.length < 2) {
                          setSelectedPeople((prev) => [...prev, person.id]);
                        }
                      }}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-3xl border transition-all cursor-pointer ${
                        active
                          ? 'border-[#6B2896] bg-[#6B2896]/10 ring-2 ring-[#6B2896]/20 text-[#6B2896] shadow-xs'
                          : 'border-purple-100 hover:border-purple-200 text-stone-700 bg-[#F6F7FB]'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl mb-2 shadow-xs">
                        {person.emoji}
                      </div>
                      <span className="text-xs font-black text-center">{person.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3단계: 사용자 지정 전국 시·도 및 시군구 정밀 선택 */}
          {obStep === 3 && (
            <div>
              <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#00D084]/20 text-[#008A56] mb-2 inline-block">
                STEP 3 · 전국 행정구역
              </span>
              <h1 className="text-2xl font-black leading-snug mb-1 text-stone-900">
                어디서 활동하시나요?
              </h1>
              <p className="text-xs text-stone-500 mb-4">
                현재 선택: <strong className="text-[#6B2896]">{selectedCity} {selectedDistrict}</strong>
              </p>

              {/* 시/도 가로 스크롤 칩 (전국 16개 시도) */}
              <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
                {Object.keys(REGIONS).map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      setSelectedCity(city);
                      setSelectedDistrict(REGIONS[city][0]);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-black whitespace-nowrap cursor-pointer transition-colors ${
                      selectedCity === city
                        ? 'bg-[#6B2896] text-white shadow-xs'
                        : 'bg-purple-50 text-stone-600 hover:bg-purple-100'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>

              {/* 해당 시/도의 시/군/구 리스트 */}
              <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
                {currentDistricts.map((dist) => {
                  const active = selectedDistrict === dist;
                  return (
                    <button
                      key={dist}
                      type="button"
                      onClick={() => setSelectedDistrict(dist)}
                      className={`p-3 rounded-2xl border text-xs font-bold text-left cursor-pointer transition-all ${
                        active
                          ? 'border-[#6B2896] bg-[#6B2896]/10 text-[#6B2896] ring-1 ring-[#6B2896]'
                          : 'border-purple-100 text-stone-700 hover:border-purple-200 bg-[#F6F7FB]'
                      }`}
                    >
                      {dist}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 하단 버튼: CU 퍼플 메인 버튼 */}
        <div className="pt-6">
          {obStep < 3 ? (
            <button
              type="button"
              disabled={obStep === 1 && !selectedMoment}
              onClick={() => setObStep((s) => s + 1)}
              className={`w-full py-3.5 rounded-3xl font-black text-xs transition-colors cursor-pointer ${
                obStep === 1 && !selectedMoment
                  ? 'bg-purple-50 text-stone-400 cursor-not-allowed'
                  : 'bg-[#6B2896] hover:bg-[#521c75] text-white shadow-md'
              }`}
            >
              다음
            </button>
          ) : (
            <button
              type="button"
              onClick={onFinish}
              className="w-full py-3.5 rounded-3xl font-black text-xs bg-[#6B2896] hover:bg-[#521c75] text-white shadow-lg cursor-pointer"
            >
              {selectedCity} {selectedDistrict} 모임 시작하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
