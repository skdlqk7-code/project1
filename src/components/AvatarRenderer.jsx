import React from 'react';

/**
 * 바람의나라 & 싸이월드 미니미 감성의 정통 레트로 픽셀/도트 아트 2D 아바타 렌더러
 * - 4방향 전환(facing: 'down' | 'up' | 'left' | 'right')
 * - 걸을 때 발과 상체가 콩콩 뛰는 자연스러운 2D 걷기(isWalking)
 * - 성별, 도트 헤어, 도트 의상, 도트 소품, 이펙트
 */
export default function AvatarRenderer({
  gender = 'female',
  hair = 'long-wave',
  outfit = 'dress-pink',
  accessory = null,
  effect = null,
  size = 'md', // 'sm' (32px), 'md' (52px), 'lg' (76px), 'xl' (100px)
  isSpeaking = false,
  audioLevel = 0,
  facing = 'down', // 'down' (정면), 'up' (뒷모습), 'left' (왼쪽), 'right' (오른쪽)
  isWalking = false,
  walkingStep = 0,
}) {
  const sizeMap = {
    sm: 'w-8 h-10',
    md: 'w-14 h-18',
    lg: 'w-20 h-26',
    xl: 'w-28 h-36',
  };

  const isFemale = gender === 'female';
  const isBack = facing === 'up';
  const isLeft = facing === 'left';

  // 걷기 중일 때 바람의나라 스타일 픽셀 바운스
  const walkBob = isWalking ? (walkingStep % 2 === 0 ? -2 : 0) : 0;
  const speakBob = isSpeaking || audioLevel > 15 ? -2 : 0;
  const totalY = walkBob + speakBob;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${sizeMap[size] || sizeMap.md}`}
      style={{
        transform: `translateY(${totalY}px) ${isLeft ? 'scaleX(-1)' : 'scaleX(1)'}`,
        transition: 'transform 0.05s linear',
        imageRendering: 'pixelated',
      }}
    >
      {/* 1. 음성 감지 시 퍼지는 초록 픽셀 음파 링 */}
      {(isSpeaking || audioLevel > 15) && (
        <span
          className="absolute -inset-1.5 rounded-2xl bg-emerald-400/35 animate-ping pointer-events-none"
          style={{ animationDuration: '0.8s' }}
        />
      )}

      {/* 2. 장착 이펙트 */}
      {effect === 'sparkle' && (
        <div className="absolute -inset-2 pointer-events-none flex items-center justify-center animate-pulse">
          <span className="absolute -top-2 -right-1 text-xs">✨</span>
          <span className="absolute -bottom-1 -left-1 text-xs">⭐</span>
        </div>
      )}
      {effect === 'fire' && (
        <div className="absolute -top-3.5 inset-x-0 flex justify-center pointer-events-none animate-bounce">
          <span className="text-sm">🔥</span>
        </div>
      )}
      {effect === 'hearts' && (
        <div className="absolute -top-3 right-0 pointer-events-none animate-pulse">
          <span className="text-xs">💖</span>
        </div>
      )}

      {/* 3. 싸이월드 미니미 64x80 도트 SVG */}
      <svg
        viewBox="0 0 64 80"
        className="w-full h-full drop-shadow-sm"
        shapeRendering="crispEdges"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 바닥 그림자 타원 */}
        <ellipse cx="32" cy="76" rx="16" ry="3" fill="#3D3028" opacity="0.25" />

        {/* ---------------- A. 다리 & 신발 (걷기 교차 스텝) ---------------- */}
        {isFemale ? (
          <g>
            {/* 왼다리 & 오른다리 교차 걸음걸이 */}
            <rect
              x="25"
              y={isWalking && walkingStep % 2 === 0 ? 61 : 63}
              width="5"
              height="8"
              fill="#FCE1CC"
            />
            <rect
              x="34"
              y={isWalking && walkingStep % 2 === 1 ? 61 : 63}
              width="5"
              height="8"
              fill="#FCE1CC"
            />
            {/* 핑크 플랫 슈즈 */}
            <rect
              x="24"
              y={isWalking && walkingStep % 2 === 0 ? 67 : 69}
              width="7"
              height="4"
              fill="#FF788B"
            />
            <rect
              x="33"
              y={isWalking && walkingStep % 2 === 1 ? 67 : 69}
              width="7"
              height="4"
              fill="#FF788B"
            />
          </g>
        ) : (
          <g>
            <rect
              x="24"
              y={isWalking && walkingStep % 2 === 0 ? 59 : 61}
              width="6"
              height="10"
              fill="#2E3C4E"
            />
            <rect
              x="34"
              y={isWalking && walkingStep % 2 === 1 ? 59 : 61}
              width="6"
              height="10"
              fill="#2E3C4E"
            />
            {/* 스니커즈 */}
            <rect
              x="23"
              y={isWalking && walkingStep % 2 === 0 ? 67 : 69}
              width="8"
              height="4"
              fill="#FFFFFF"
            />
            <rect
              x="33"
              y={isWalking && walkingStep % 2 === 1 ? 67 : 69}
              width="8"
              height="4"
              fill="#FFFFFF"
            />
          </g>
        )}

        {/* ---------------- B. 상체 & 의상 도트 ---------------- */}
        {isFemale ? (
          outfit === 'knit-beige' ? (
            <g>
              <rect x="20" y="42" width="24" height="18" fill="#D8C3A5" />
              <rect x="18" y="44" width="4" height="13" fill="#C2AB8D" />
              <rect x="42" y="44" width="4" height="13" fill="#C2AB8D" />
              <rect x="22" y="58" width="20" height="7" fill="#6B594B" />
              {!isBack && <rect x="28" y="41" width="8" height="3" fill="#FCE1CC" />}
            </g>
          ) : outfit === 'hoodie-lavender' ? (
            <g>
              <rect x="19" y="41" width="26" height="19" fill="#BFA7DF" />
              <rect x="17" y="44" width="4" height="14" fill="#AB91CE" />
              <rect x="43" y="44" width="4" height="14" fill="#AB91CE" />
              {!isBack && <rect x="24" y="49" width="16" height="7" fill="#FFFFFF" opacity="0.4" />}
              <rect x="22" y="59" width="20" height="6" fill="#363945" />
            </g>
          ) : outfit === 'dress-floral' ? (
            <g>
              <rect x="21" y="42" width="22" height="23" fill="#F8B4C0" />
              <rect x="19" y="44" width="4" height="12" fill="#E89AA8" />
              <rect x="41" y="44" width="4" height="12" fill="#E89AA8" />
              {!isBack && (
                <>
                  <rect x="27" y="52" width="2" height="2" fill="#FFFFFF" />
                  <rect x="35" y="56" width="2" height="2" fill="#FFFFFF" />
                </>
              )}
            </g>
          ) : (
            // 기본 핑크 원피스
            <g>
              <rect x="21" y="42" width="22" height="22" fill="#FF8496" />
              <rect x="19" y="44" width="4" height="12" fill="#F06C80" />
              <rect x="41" y="44" width="4" height="12" fill="#F06C80" />
              <rect x="20" y="54" width="24" height="10" fill="#FF9EAD" />
              {!isBack && (
                <>
                  <rect x="27" y="41" width="10" height="3" fill="#FCE1CC" />
                  <rect x="30" y="45" width="4" height="2" fill="#FFFFFF" />
                </>
              )}
            </g>
          )
        ) : (
          outfit === 'running-blue' ? (
            <g>
              <rect x="20" y="41" width="24" height="20" fill="#3B82F6" />
              <rect x="18" y="43" width="4" height="13" fill="#2563EB" />
              <rect x="42" y="43" width="4" height="13" fill="#2563EB" />
              {!isBack && <rect x="23" y="46" width="18" height="2" fill="#FFFFFF" />}
            </g>
          ) : outfit === 'trench-beige' ? (
            <g>
              <rect x="19" y="41" width="26" height="22" fill="#C8B39B" />
              {!isBack && (
                <>
                  <rect x="28" y="41" width="8" height="5" fill="#3B4B5B" />
                  <rect x="31" y="45" width="2" height="8" fill="#1E293B" />
                </>
              )}
              <rect x="17" y="43" width="4" height="14" fill="#B39E87" />
              <rect x="43" y="43" width="4" height="14" fill="#B39E87" />
            </g>
          ) : (
            // 기본 네이비 후드
            <g>
              <rect x="20" y="41" width="24" height="20" fill="#263445" />
              <rect x="18" y="43" width="4" height="14" fill="#1C2735" />
              <rect x="42" y="43" width="4" height="14" fill="#1C2735" />
              {!isBack && <rect x="25" y="49" width="14" height="6" fill="#38495E" />}
            </g>
          )
        )}

        {/* 손 */}
        <rect x="18" y="55" width="4" height="4" fill="#FCE1CC" />
        <rect x="42" y="55" width="4" height="4" fill="#FCE1CC" />

        {/* ---------------- C. 목 & 얼굴 / 뒷모습 ---------------- */}
        <rect x="28" y="38" width="8" height="4" fill="#F5C8AC" />
        <rect x="17" y="16" width="30" height="24" fill="#FCE1CC" />
        <rect x="19" y="14" width="26" height="28" fill="#FCE1CC" />

        {/* 정면/측면일 때만 얼굴 이목구비 렌더링, 뒷모습(up)일 때는 전체 뒷머리 */}
        {!isBack ? (
          <g>
            {/* 볼터치 */}
            <rect x="20" y="29" width="4" height="3" fill="#FFA5A5" opacity="0.85" />
            <rect x="40" y="29" width="4" height="3" fill="#FFA5A5" opacity="0.85" />
            {/* 도트 눈 */}
            <rect x="23" y="23" width="3" height="4" fill="#2A1B14" />
            <rect x="38" y="23" width="3" height="4" fill="#2A1B14" />
            <rect x="23" y="23" width="1.5" height="1.5" fill="#FFFFFF" />
            <rect x="38" y="23" width="1.5" height="1.5" fill="#FFFFFF" />
            {/* 도트 입 */}
            {isSpeaking || audioLevel > 15 ? (
              <g>
                <rect x="30" y="31" width="4" height="3" fill="#D34B4B" />
                <rect x="31" y="31" width="2" height="1" fill="#FFFFFF" />
              </g>
            ) : (
              <rect x="30" y="32" width="4" height="1.5" fill="#B35D4D" />
            )}
          </g>
        ) : (
          // 뒷모습일 때 얼굴 전체를 뒷머리색으로 덮음
          <rect x="17" y="16" width="30" height="24" fill={isFemale ? '#422B1E' : '#332A25'} />
        )}

        {/* ---------------- D. 도트 헤어스타일 ---------------- */}
        {isFemale ? (
          hair === 'twintail' ? (
            <g fill="#42291D">
              <rect x="16" y="12" width="32" height="10" />
              <rect x="18" y="10" width="28" height="4" />
              <rect x="9" y="22" width="8" height="14" />
              <rect x="47" y="22" width="8" height="14" />
              <rect x="13" y="20" width="4" height="3" fill="#FF788B" />
              <rect x="47" y="20" width="4" height="3" fill="#FF788B" />
            </g>
          ) : hair === 'bob-cut' ? (
            <g fill="#4B3324">
              <rect x="16" y="11" width="32" height="10" />
              <rect x="18" y="9" width="28" height="4" />
              <rect x="14" y="16" width="6" height="18" />
              <rect x="44" y="16" width="6" height="18" />
            </g>
          ) : hair === 'bun' ? (
            <g fill="#3D291D">
              <rect x="26" y="2" width="12" height="9" />
              <rect x="16" y="11" width="32" height="10" />
              <rect x="18" y="9" width="28" height="4" />
            </g>
          ) : (
            // 기본 롱 웨이브
            <g fill="#422B1E">
              <rect x="16" y="10" width="32" height="11" />
              <rect x="18" y="8" width="28" height="4" />
              <rect x="14" y="16" width="6" height="28" />
              <rect x="44" y="16" width="6" height="28" />
              <rect x="12" y="32" width="7" height="16" />
              <rect x="45" y="32" width="7" height="16" />
            </g>
          )
        ) : (
          <g fill="#332A25">
            <rect x="17" y="9" width="30" height="11" />
            <rect x="19" y="7" width="26" height="4" />
            <rect x="15" y="15" width="5" height="12" />
            <rect x="44" y="15" width="5" height="12" />
          </g>
        )}

        {/* ---------------- E. 착장 소품 (정면일 때만 렌더) ---------------- */}
        {!isBack && accessory === 'glasses' && (
          <g fill="#333333">
            <rect x="21" y="22" width="7" height="6" fill="none" stroke="#222" strokeWidth="1" />
            <rect x="36" y="22" width="7" height="6" fill="none" stroke="#222" strokeWidth="1" />
            <rect x="28" y="24" width="8" height="1" fill="#222" />
          </g>
        )}

        {accessory === 'crown' && (
          <g>
            <rect x="26" y="3" width="12" height="7" fill="#FFD700" />
            <polygon points="26,3 29,7 32,3 35,7 38,3 38,9 26,9" fill="#FFB700" />
          </g>
        )}

        {accessory === 'cap' && (
          <g>
            <rect x="15" y="8" width="34" height="8" fill="#3B82F6" />
            <rect x="13" y="14" width="38" height="3" fill="#1D4ED8" />
          </g>
        )}

        {!isBack && accessory === 'coffee' && (
          <g>
            <rect x="44" y="50" width="7" height="10" fill="#E2E8F0" opacity="0.8" />
            <rect x="45" y="53" width="5" height="6" fill="#4B2810" />
            <rect x="46" y="47" width="1.5" height="4" fill="#10B981" />
          </g>
        )}
      </svg>
    </div>
  );
}
