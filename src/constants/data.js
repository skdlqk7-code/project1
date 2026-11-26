// ---------------- 1. 시·도별 주요 시군구 목록 (사용자 지정 행정구역 100% 반영) ----------------
export const REGIONS = {
  서울특별시: [
    '종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구',
    '노원구', '은평구', '서대문구', '마포구', '양천구', '강서구', '구로구', '금천구', '영등포구', '동작구',
    '관악구', '서초구', '강남구', '송파구', '강동구'
  ],
  인천광역시: [
    '제물포구', '영종구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서해구', '검단구',
    '강화군', '옹진군'
  ],
  부산광역시: [
    '중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구', '북구', '해운대구', '사하구',
    '금정구', '강서구', '연제구', '수영구', '사상구', '기장군'
  ],
  대구광역시: [
    '중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군', '군위군'
  ],
  대전광역시: [
    '동구', '중구', '서구', '유성구', '대덕구'
  ],
  울산광역시: [
    '중구', '남구', '동구', '북구', '울주군'
  ],
  세종특별자치시: [
    '읍·면·동 단위'
  ],
  경기도: [
    '수원시', '성남시', '의정부시', '안양시', '부천시', '광명시', '평택시', '동두천시', '안산시', '고양시',
    '과천시', '구리시', '남양주시', '오산시', '시흥시', '군포시', '의왕시', '하남시', '용인시', '파주시',
    '이천시', '안성시', '김포시', '화성시', '광주시', '양주시', '포천시', '여주시',
    '연천군', '가평군', '양평군'
  ],
  강원특별자치도: [
    '춘천시', '원주시', '강릉시', '동해시', '태백시', '속초시', '삼척시',
    '홍천군', '횡성군', '영월군', '평창군', '정선군', '철원군', '화천군', '양구군', '인제군', '고성군', '양양군'
  ],
  충청북도: [
    '청주시', '충주시', '제천시',
    '보은군', '옥천군', '영동군', '증평군', '진천군', '괴산군', '음성군', '단양군'
  ],
  충청남도: [
    '천안시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', '당진시',
    '금산군', '부여군', '서천군', '청양군', '홍성군', '예산군', '태안군'
  ],
  전북특별자치도: [
    '전주시', '군산시', '익산시', '정읍시', '남원시', '김제시',
    '완주군', '진안군', '무주군', '장수군', '임실군', '순창군', '고창군', '부안군'
  ],
  전남광주통합특별시: [
    '목포시', '여수시', '순천시', '나주시', '광양시',
    '동구', '서구', '남구', '북구', '광산구',
    '담양군', '곡성군', '구례군', '고흥군', '보성군', '화순군', '장흥군', '강진군', '해남군',
    '영암군', '무안군', '함평군', '영광군', '장성군', '완도군', '진도군', '신안군'
  ],
  경상북도: [
    '포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시', '문경시', '경산시',
    '의성군', '청송군', '영양군', '영덕군', '청도군', '고령군', '성주군', '칠곡군', '예천군', '봉화군', '울진군', '울릉군'
  ],
  경상남도: [
    '창원시', '진주시', '통영시', '사천시', '김해시', '밀양시', '거제시', '양산시',
    '의령군', '함안군', '창녕군', '고성군', '남해군', '하동군', '산청군', '함양군', '거창군', '합천군'
  ],
  제주특별자치도: [
    '제주시', '서귀포시'
  ]
};

// ---------------- 2. 앱 전용 시그니처 인사말 (만남의 암호) ----------------
export const APP_CATCHPHRASES = {
  main: '혹시... 미니...?',
  sub: '우리 동네 워밍업 & 라이브 미니룸의 첫인사 암호',
  detail: '처음 만나는 모임이나 라이브룸에서 어색할 때 외쳐보세요!\n"혹시... 미니님이세요? 😊"\n당근보다 더 따뜻하게 어색함을 녹여주는 우리만의 신호입니다.',
  options: [
    { title: '혹시... 미니...?', desc: '가장 추천! 아바타 미니미로 처음 알아볼 때', badge: '대표 시그니처 🏆' },
    { title: '오늘 워밍하셨어요?', desc: '동네 루틴과 가벼운 수다 시작할 때', badge: '워밍업 인사 ☕' },
    { title: '도토리 하나 톡!', desc: '라이브룸에서 반가움의 건배를 건넬 때', badge: '감성 암호 🌰' },
  ]
};

// ---------------- 3. 미니 라운지 2D 픽셀 배경 테마 옵션 ----------------
export const ROOM_BACKGROUND_THEMES = [
  {
    id: 'living-room',
    name: '방장의 아늑한 거실 🛋️',
    desc: '원목 마루바닥과 따스한 햇살 창문',
    bgClass: 'bg-[#EFE8DD]',
    floorColor: '#D8C3A5',
    tag: '기본 테마',
  },
  {
    id: 'moonlight-park',
    name: '달빛공원 & 벚꽃 🌸',
    desc: '반딧불이 맴도는 푸른 잔디와 벚꽃 나무',
    bgClass: 'bg-[#1C2833]',
    floorColor: '#273746',
    tag: '자연환경',
  },
  {
    id: 'paris-cafe',
    name: '파리 에펠탑 노천카페 ☕',
    desc: '유럽풍 돌바닥과 에펠탑 실루엣',
    bgClass: 'bg-[#2C3E50]',
    floorColor: '#34495E',
    tag: '해외 명소',
  },
  {
    id: 'sunset-beach',
    name: '하와이 선셋 비치 🏖️',
    desc: '황금빛 노을 바다와 야자수 해변',
    bgClass: 'bg-[#7B3F00]/90',
    floorColor: '#C49767',
    tag: '휴양지',
  },
];

// ---------------- 4. 룸 꾸미기 인테리어 소품 데이터 ----------------
export const ROOM_INTERIOR_ITEMS = [
  { id: 'item-rug-circle', name: '보들보들 핑크 러그', type: '인테리어', emoji: '🧶', cost: 150, desc: '바닥에 깔면 아늑함 200%' },
  { id: 'item-turntable', name: '레트로 LP 턴테이블', type: '인테리어', emoji: '📻', cost: 250, desc: '잔잔한 BGM 감성 연출' },
  { id: 'item-plant-pot', name: '몬스테라 대형 화분', type: '인테리어', emoji: '🪴', cost: 120, desc: '공간을 싱그럽게 만들어줘요' },
  { id: 'item-mood-lamp', name: '달빛 감성 무드등', type: '인테리어', emoji: '💡', cost: 200, desc: '은은한 밤 분위기' },
  { id: 'item-coffee-table', name: '원목 티테이블', type: '인테리어', emoji: '☕', cost: 180, desc: '커피 한 잔 놓기 좋은 테이블' },
];

// ---------------- 5. 샘플 모임 데이터 ----------------
export const INITIAL_ROOMS = [
  {
    id: 'mom-1',
    category: '마미모임',
    badge: '🍼 23년생 또래맘',
    title: '23년생 또래맘 등원 후 모닝커피',
    subtitle: '내일 오전 10:30 · 센트럴파크 근처 카페',
    mode: '복합모드',
    theme: 'living-room',
    current: 3,
    max: 4,
    noShowNote: '아이 컨디션 사유 2시간 전 무료 변경 가능',
    members: [
      { id: 'm1', name: '민지맘', tag: '23년생맘', gender: 'female', hair: 'long-wave', outfit: 'dress-pink', accessory: 'coffee', x: 25, y: 40, speech: '혹시... 미니...?' },
      { id: 'm2', name: '서연맘', tag: '커피수혈', gender: 'female', hair: 'bob-cut', outfit: 'knit-beige', accessory: 'glasses', x: 65, y: 36, speech: '네! 저 맞아요 ☕' },
      { id: 'm3', name: '하은맘', tag: '등원완료', gender: 'female', hair: 'twintail', outfit: 'hoodie-lavender', accessory: null, x: 45, y: 65, speech: '오늘도 무사등원!' },
    ],
  },
  {
    id: 'mom-2',
    category: '마미모임',
    badge: '🌙 육퇴 후 수다',
    title: '오늘 밤 9시 30분 · 육퇴 후 30분 음성 수다',
    subtitle: '실시간 음성방 · 민낯/집콕 환영 · #비교금지',
    mode: '음성수다',
    theme: 'moonlight-park',
    current: 4,
    max: 5,
    noShowNote: '집에서 편하게 접속 · 갑작스런 육아 호출 양해',
    members: [
      { id: 'm4', name: '지우맘', tag: '육퇴완료', gender: 'female', hair: 'bun', outfit: 'pajama-star', accessory: 'crown', x: 25, y: 42, speech: '드디어 육퇴...' },
      { id: 'm5', name: '유진맘', tag: '와인한잔', gender: 'female', hair: 'bob-cut', outfit: 'knit-beige', accessory: 'glasses', x: 70, y: 40, speech: '오늘 하루 길었네요' },
      { id: 'm6', name: '다온맘', tag: '말동무필요', gender: 'female', hair: 'long-wave', outfit: 'dress-pink', accessory: 'coffee', x: 50, y: 68, speech: '반가워요 미니님들!' },
    ],
  },
  {
    id: 'routine-1',
    category: '동네루틴',
    badge: '🏃 40분 루틴',
    title: '퇴근 후 가벼운 40분 러닝 + 제로콜라',
    subtitle: '오늘 저녁 19:30 · 달빛공원 트랙',
    mode: '복합모드',
    theme: 'sunset-beach',
    current: 3,
    max: 5,
    noShowNote: '비/미세먼지 시 자동 일정 조율',
    members: [
      { id: 'r1', name: '준호', tag: '초보러너', gender: 'male', hair: 'dandy', outfit: 'running-blue', accessory: 'cap', x: 28, y: 36, speech: '천천히 뛰어요!' },
      { id: 'r2', name: '소영', tag: '제로콜라파', gender: 'female', hair: 'twintail', outfit: 'hoodie-lavender', accessory: 'cap', x: 68, y: 45, speech: '끝나고 콜라 건배!' },
    ],
  },
];

// ---------------- 6. AI 질문 세트 ----------------
export const AI_QUESTIONS = {
  마미모임: [
    '오늘 육퇴 후 나에게 주고 싶은 보상 1위는 무엇인가요?',
    '육아하면서 "이건 진짜 잘 샀다!" 싶은 꿀템 하나만 꼽는다면?',
    '오늘 하루 중 가장 마음이 몽글몽글했던 순간은 언제였나요?',
  ],
  동네루틴: [
    '오늘 하루 에너지가 가장 높았던 시간대와 가장 떨어졌던 시간대는?',
    '요즘 내 일상을 가볍게 지켜주는 나만의 작은 습관이 있나요?',
    '오늘 루틴 끝나고 가장 먹고 싶거나 하고 싶은 한 가지는?',
  ],
  원데이: [
    '수업 시작 전 3분 워밍업! 오늘 처음 해보는 분? 만들고 싶은 느낌은?',
    '최근에 "아, 나 이런 취향도 있었네?" 하고 새로 알게 된 게 있나요?',
    '오늘 완성한 결과물을 누구에게 제일 먼저 보여주고 싶나요?',
  ],
};

// ---------------- 7. 싸이월드 미니미 도트 스타일 착장 데이터 ----------------
export const AVATAR_CUSTOMIZE_OPTIONS = {
  gender: [
    { id: 'female', name: '여성 미니미', icon: '👩‍🦰' },
    { id: 'male', name: '남성 미니미', icon: '🧑' },
  ],
  femaleHair: [
    { id: 'long-wave', name: '도트 롱 웨이브', preview: '💇‍♀️' },
    { id: 'twintail', name: '양갈래 깜찍 헤어', preview: '👧' },
    { id: 'bob-cut', name: '도트 단발컷', preview: '👩' },
    { id: 'bun', name: '올림 똥머리', preview: '👱‍♀️' },
  ],
  maleHair: [
    { id: 'dandy', name: '도트 댄디컷', preview: '👨' },
    { id: 'natural-part', name: '가르마 펌', preview: '🧑‍🦱' },
    { id: 'comma-hair', name: '아이돌 쉼표머리', preview: '🧑' },
    { id: 'short-clean', name: '시원한 도트 숏컷', preview: '🧔' },
  ],
  femaleOutfits: [
    { id: 'dress-pink', name: '러블리 핑크 원피스', preview: '👗', cost: 0, desc: '기본 단정한 도트 원피스' },
    { id: 'knit-beige', name: '포근 베이지 니트', preview: '👚', cost: 150, desc: '카페 모임에 어울리는 포근룩' },
    { id: 'hoodie-lavender', name: '라벤더 오버핏 후드', preview: '🧥', cost: 200, desc: '등원룩 & 집앞 산책 최적' },
    { id: 'dress-floral', name: '플라워 롱 드레스', preview: '🌸', cost: 300, desc: '화사하고 단아한 분위기' },
  ],
  maleOutfits: [
    { id: 'hoodie-navy', name: '네이비 캐주얼 후드', preview: '🧥', cost: 0, desc: '편안하고 깔끔한 데일리룩' },
    { id: 'running-blue', name: '스포티 러닝 트레이닝', preview: '🏃‍♂️', cost: 150, desc: '가벼운 운동과 산책에 굿' },
    { id: 'trench-beige', name: '클래식 베이지 트렌치', preview: '👔', cost: 250, desc: '차분하고 댄디한 느낌' },
    { id: 'shirt-white', name: '린넨 화이트 셔츠', preview: '👕', cost: 200, desc: '시원하고 청량한 감성' },
  ],
  accessories: [
    { id: 'acc-none', name: '선택 안함', preview: '❌', cost: 0 },
    { id: 'coffee', name: '손에 든 아이스 아아', preview: '☕', cost: 150, desc: '여유로운 커피 타임' },
    { id: 'glasses', name: '도트 스마트 안경', preview: '👓', cost: 100, desc: '지적이고 부드러운 인상' },
    { id: 'crown', name: '골드 육퇴 왕관', preview: '👑', cost: 250, desc: '오늘 하루 최고였던 나에게' },
    { id: 'cap', name: '스트릿 볼캡', preview: '🧢', cost: 120, desc: '민낯도 스타일리시하게' },
    { id: 'beret', name: '예술가 베레모', preview: '🎨', cost: 180, desc: '원데이 클래스 느낌 충만' },
  ],
  effects: [
    { id: 'eff-none', name: '이펙트 없음', preview: '❌', cost: 0 },
    { id: 'sparkle', name: '반짝 오라', preview: '✨', cost: 200, desc: '미니미 주변에 은은한 별빛' },
    { id: 'fire', name: '텐션 불꽃', preview: '🔥', cost: 250, desc: '오늘 기운 솟아나는 날' },
    { id: 'hearts', name: '하트 퐁퐁', preview: '💖', cost: 200, desc: '사랑스럽고 따뜻한 기운' },
  ],
};

// ---------------- 8. 인스타형 피드 샘플 데이터 ----------------
export const INITIAL_FEEDS = [
  {
    id: 'feed-1',
    author: {
      name: '민지맘',
      district: '연수구',
      gender: 'female',
      hair: 'long-wave',
      outfit: 'dress-pink',
      accessory: 'coffee',
    },
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    content: '날씨가 너무 좋아서 아이 등원시키고 센트럴파크 한 바퀴 산책했어요 🌿\n오늘 라이브룸에서 만난 미니님들 덕분에 활력 가득 충전했습니다! "혹시... 미니...?" 하고 인사 건네주신 분 반가웠어요 ㅎㅎ',
    likes: 89,
    userLiked: true,
    commentsCount: 18,
    createdAt: '2시간 전',
    tags: ['송도센트럴파크', '등원후자유', '혹시미니', '모닝산책'],
  },
  {
    id: 'feed-2',
    author: {
      name: '준호',
      district: '서해구',
      gender: 'male',
      hair: 'dandy',
      outfit: 'running-blue',
      accessory: 'cap',
    },
    imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
    content: '청라 호수공원 야간 5km 완주했습니다! 🏃‍♂️\n미세먼지도 없고 바람 시원해서 달리기 딱 좋았네요. 끝나고 편의점 제로콜라 건배까지 완벽한 동네 루틴 완료입니다!',
    likes: 64,
    userLiked: false,
    commentsCount: 9,
    createdAt: '4시간 전',
    tags: ['청라호수공원', '오운완', '야간러닝', '동네루틴'],
  },
  {
    id: 'feed-3',
    author: {
      name: '서연맘',
      district: '검단구',
      gender: 'female',
      hair: 'bob-cut',
      outfit: 'knit-beige',
      accessory: 'glasses',
    },
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    content: '검단 신도시 새로 오픈한 브런치 카페 다녀왔어요 🥞\n프렌치 토스트 진짜 부드럽고 커피향 대박이에요. 주말에 미니님들과 브런치 번개 여기서 하면 너무 좋을 것 같아요 :)',
    likes: 112,
    userLiked: false,
    commentsCount: 24,
    createdAt: '어제',
    tags: ['검단맛집', '브런치카페', '주말번개', '동네카페'],
  },
];

// ---------------- 9. 동네 이야기 게시판 샘플 데이터 ----------------
export const INITIAL_POSTS = [
  {
    id: 'post-1',
    category: '🍳 요리·레시피',
    title: '15분 컷! 아이도 잘 먹고 어른도 밥도둑인 소고기 야채 덮밥 🍳',
    content: '퇴근하고 오면 밥하기 진짜 지치잖아요. 냉동실 자투리 소고기랑 양파, 애호박 굴소스로 볶아서 덮밥 해줬는데 아이가 두 그릇 뚝딱 비웠어요! 비법은 버터 반 스푼입니다 :)',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    author: { name: '지우맘', district: '연수구', gender: 'female', hair: 'bun', outfit: 'pajama-star', accessory: 'crown' },
    likes: 42,
    commentsCount: 14,
    createdAt: '1시간 전',
    isPopular: true,
    tags: ['유아식', '초간단요리', '퇴근후15분'],
  },
  {
    id: 'post-2',
    category: '🚗 가족여행·나들이',
    title: '주말에 다녀온 센트럴파크 문보트 & 숨은 잔디밭 피크닉 스팟 🌙',
    content: '주말에 바람 쐬러 센트럴파크 다녀왔어요! 문보트는 낮 3시쯤 대기 10분 정도 걸렸고, 해질녘 뷰가 진짜 예쁩니다. 유모차 끌고 가기 좋은 그늘막 명당 자리 공유해요!',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    author: { name: '서연맘', district: '연수구', gender: 'female', hair: 'bob-cut', outfit: 'knit-beige', accessory: 'glasses' },
    likes: 58,
    commentsCount: 21,
    createdAt: '3시간 전',
    isPopular: true,
    tags: ['주말나들이', '가족여행', '피크닉명당'],
  },
  {
    id: 'post-3',
    category: '☕ 일상·수다',
    title: '동네 베이커리 새로 생겼는데 소금빵 미쳤어요...',
    content: '상가 1층에 새로 오픈한 베이커리인데요, 11시 빵 나오는 시간 맞춰갔더니 갓 구운 소금빵 겉바속촉 그 자체입니다. 근처 사시는 미니님들 꼭 드셔보세요!',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    author: { name: '민지맘', district: '서해구', gender: 'female', hair: 'long-wave', outfit: 'dress-pink', accessory: 'coffee' },
    likes: 31,
    commentsCount: 9,
    createdAt: '5시간 전',
    isPopular: true,
    tags: ['동네맛집', '소금빵성지', '카페투어'],
  },
];

// ---------------- 10. 채팅 및 쪽지 샘플 데이터 (export 복구) ----------------
export const INITIAL_CHAT_ROOMS = [
  {
    id: 'chat-1',
    title: '☕ 연수구 23년생 또래맘 수다방',
    category: '마미모임',
    lastMessage: '내일 카페 10시 30분에 만나요!',
    lastTime: '오후 2:40',
    unread: 2,
    membersCount: 4,
  },
  {
    id: 'chat-2',
    title: '🏃 서해구 야간 러닝 크루',
    category: '동네루틴',
    lastMessage: '오늘 비 안 올 것 같으니 정상 진행합니다~',
    lastTime: '오전 11:15',
    unread: 0,
    membersCount: 5,
  },
  {
    id: 'chat-3',
    title: '🎨 주말 도예/키링 원데이 준비방',
    category: '원데이',
    lastMessage: '앞치마는 공방에 준비되어 있습니다 :)',
    lastTime: '어제',
    unread: 0,
    membersCount: 6,
  },
];

export const INITIAL_LETTERS = [
  {
    id: 'letter-1',
    from: '민지맘',
    district: '연수구',
    title: '혹시... 미니님이세요? 😊 반가웠어요!',
    content: '아까 라이브룸에서 나눈 이야기 공감이 정말 많이 되었어요. 혹시 다음 주 오전에 카페 번개 가실 때 저도 같이 가도 될까요? :)',
    time: '30분 전',
    read: false,
  },
  {
    id: 'letter-2',
    from: '서연맘',
    district: '검단구',
    title: '소금빵 맛집 정보 여쭤봅니다!',
    content: '게시판에 올려주신 소금빵집 위치가 어디 쪽 맞나요? 내일 가보려고요!',
    time: '2시간 전',
    read: true,
  },
];

export const ONBOARDING_MOMENTS = [
  { id: 'm1', label: '🍼 육퇴 후·등원 후 가볍게 수다 떨고 싶어요', defaultCat: '마미모임' },
  { id: 'm2', label: '🏃 퇴근 후·주말에 동네 루틴을 만들고 싶어요', defaultCat: '동네루틴' },
  { id: 'm3', label: '🎨 주말에 새로운 원데이 클래스를 해보고 싶어요', defaultCat: '원데이' },
  { id: 'm4', label: '🎙️ 얼굴 부담 없이 아바타 음성방부터 놀아볼래요', defaultCat: '전체' },
];

export const ONBOARDING_PEOPLE = [
  { id: '또래 육아맘', label: '또래 육아맘', emoji: '🍼' },
  { id: '동네 카페친구', label: '동네 카페친구', emoji: '☕' },
  { id: '러닝·산책 메이트', label: '러닝·산책', emoji: '🏃' },
  { id: '조용한 루틴러', label: '조용한 루틴', emoji: '📚' },
  { id: '금손 원데이러', label: '원데이 클래스', emoji: '🎨' },
  { id: '밤 수다 메이트', label: '밤 수다', emoji: '🌙' },
];
