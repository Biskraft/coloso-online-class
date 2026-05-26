/* ─────────────────────────────────────────────────────────
   결정론적 Midjourney 프롬프트 생성기
   다이어그램(노드+엣지+컨셉) → MJ 프롬프트
   ───────────────────────────────────────────────────────── */

import type { Project, BubbleNode, NodeType } from '../../types';
// BubbleNode type is used in helpers; no value import needed.

/* ── 노드 타입별 영문 묘사 ── */
const NODE_TYPE_DESC: Record<NodeType, string> = {
  room:     'an interior chamber with stone walls and ambient lighting',
  vista:    'a sweeping vista with distant landmark and dramatic depth',
  treasure: 'a treasure chamber, gilded relic on a pedestal, beams of light',
  boss:     'a vast boss arena, towering silhouette, atmospheric tension',
  hub:      'a central hub plaza with multiple converging paths',
  save:     'a small sanctuary with a glowing altar, restful warmth',
};

/* ── 아이콘 키 → 키워드 ── */
const ICON_TO_KW: Record<string, string> = {
  chasm:           'wide chasm splitting the floor',
  treasure_visible:'distant treasure glimmering across the gap',
  dash_required:   'narrow leap of faith over a void',
  key:             'ornate key resting on stone',
  lock:            'massive locked door, iron bolts',
  oneway:          'one-way drop, no return',
  ability_gate:    'mystical barrier of light',
  enemy:           'silhouettes of patrolling enemies',
  trap:            'trap mechanism, blades or arrows',
  pressure_plate:  'ancient pressure plate on the floor',
  switch:          'lever mechanism set in the wall',
  save_altar:      'glowing save altar',
  vista:           'panoramic view, distant landmark',
  water:           'reflective water surface',
  fire:            'flickering fire and embers',
  ice:             'frozen ice crystals everywhere',
  shadow:          'long dramatic shadows',
  light:           'shafts of warm light',
};

/* ── 메커닉/테마 → 마스터 스타일 키워드 ── */
const THEME_KEYWORDS: Array<{ match: RegExp; keywords: string[] }> = [
  { match: /사원|temple/i,        keywords: ['ancient temple ruins', 'weathered stone columns', 'overgrown vegetation', 'shafts of warm sunlight'] },
  { match: /성당|cathedral/i,     keywords: ['shattered cathedral', 'gothic arches', 'stained glass shards on the floor', 'dust motes in light'] },
  { match: /협곡|canyon/i,        keywords: ['desert canyon', 'wind-eroded sandstone', 'rope bridges', 'golden hour'] },
  { match: /묘소|crypt|catacomb/i,keywords: ['underground crypt', 'low torchlit ceilings', 'sarcophagi', 'cold stone'] },
  { match: /화산|volcano/i,       keywords: ['active volcano interior', 'molten lava rivers', 'obsidian formations', 'ember haze'] },
  { match: /시계탑|clock tower/i, keywords: ['victorian clock tower', 'giant brass gears', 'pendulum chamber', 'amber gaslight'] },
  { match: /해|sea|ocean|침수/i,  keywords: ['flooded fortress', 'half-submerged corridors', 'coral and barnacles', 'shafts of blue light through water'] },
  { match: /첨탑|spire/i,         keywords: ['windswept spire', 'wrought iron walkways', 'cloud sea below', 'piercing sun'] },
  { match: /저택|manor|mansion/i, keywords: ['victorian manor', 'baroque wallpaper', 'flickering candelabra', 'long oak halls'] },
  { match: /창고|warehouse/i,     keywords: ['rainy night warehouse', 'shipping containers', 'sodium vapor lights', 'wet concrete reflections'] },
  { match: /성|castle/i,          keywords: ['medieval castle interior', 'tapestries and torchlight', 'cold stone walls'] },
  { match: /우주|space|sci-fi/i,  keywords: ['derelict space station', 'flickering emergency lighting', 'panel readouts', 'cold metal corridors'] },
  { match: /신전|shrine/i,        keywords: ['jungle temple', 'mossy stone', 'shafts of green light through canopy'] },
  { match: /감옥|prison/i,        keywords: ['stone prison interior', 'iron bars', 'damp torchlit corridors'] },
  { match: /동굴|cave/i,          keywords: ['crystal cave', 'bioluminescent flora', 'damp stone'] },
  { match: /숲|forest/i,          keywords: ['ancient forest', 'colossal trees', 'soft beams of sunlight', 'leaf litter'] },
  { match: /마을|village/i,       keywords: ['fog-shrouded village', 'wooden buildings', 'lantern light', 'low rooftops'] },
  { match: /항구|harbor|port/i,   keywords: ['old harbor', 'wooden piers', 'fog and gulls'] },
  { match: /기지|base|station/i,  keywords: ['arctic research base', 'snow drifts', 'cold blue light'] },
  { match: /사막|desert/i,        keywords: ['vast desert', 'shifting dunes', 'mirage haze'] },
  { match: /쇼핑몰|mall/i,        keywords: ['abandoned shopping mall', 'broken neon signs', 'overturned carts'] },
  { match: /병원|hospital/i,      keywords: ['dim hospital corridor', 'flickering fluorescent', 'gurneys'] },
  { match: /피라미드|pyramid/i,   keywords: ['ancient pyramid interior', 'hieroglyph walls', 'shafts of golden light'] },
];

/* ── 분위기 키워드 (페이싱 기반) ── */
const MOOD_KEYWORDS: Array<{ match: RegExp; keywords: string[] }> = [
  { match: /잔잔|평온|차분/i,    keywords: ['contemplative atmosphere', 'soft ambient lighting'] },
  { match: /긴장|위기|불안/i,    keywords: ['ominous atmosphere', 'high contrast lighting', 'heavy shadows'] },
  { match: /클라이맥스|보스|결전/i, keywords: ['climactic dramatic atmosphere', 'volumetric light shafts', 'epic scale'] },
  { match: /느림|느린|slow/i,    keywords: ['unhurried mood', 'still air'] },
  { match: /빠름|추격|chase/i,   keywords: ['dynamic motion', 'sense of speed', 'kinetic energy'] },
];

/* ── 기본 파라미터 (사용자가 편집 가능) ── */
export const DEFAULT_MJ_PARAMS = '--ar 16:9 --v 8.1 --style raw --stylize 250 --chaos 8';

/* ── 한국어 입력 → 영어 fallback 키워드 ── */
const KOREAN_RE = /[가-힯㄰-㆏ᄀ-ᇿ]/;
const hasKorean = (s: string) => KOREAN_RE.test(s);

/** 최종 출력 sanitize — 한글이 어떤 경로로든 섞이면 모두 제거 + 공백 정리 */
export function sanitizeEnglishPrompt(s: string): string {
  return s
    .replace(/[가-힯㄰-㆏ᄀ-ᇿ]+/g, '')      // 한글 음절·자모·자판
    .replace(/[一-龥]+/g, '')                 // 한자
    .replace(/[ぁ-んァ-ヶー]+/g, '')           // 일본 가나
    .replace(/,\s*,/g, ',')                   // 빈 쉼표 정리
    .replace(/,\s*$/g, '')                    // 끝에 남은 쉼표
    .replace(/\s+/g, ' ')
    .trim();
}

/* 컨셉 의도/페이싱 → 영어 mood 변환 (간단 사전식) */
const INTENT_KEYWORDS: Array<{ match: RegExp; keywords: string[] }> = [
  { match: /능력|ability|power|skill/i,   keywords: ['ability acquisition moment', 'ritualistic discovery'] },
  { match: /스텔스|stealth|잠입|infilt/i, keywords: ['stealthy infiltration', 'tense quiet atmosphere'] },
  { match: /퍼즐|puzzle|수수께끼/i,        keywords: ['puzzle setting', 'intricate mechanisms'] },
  { match: /전투|combat|battle|싸움/i,    keywords: ['combat arena energy', 'kinetic tension'] },
  { match: /탐험|exploration|발견|discover/i, keywords: ['exploratory wonder', 'rewarding discovery'] },
  { match: /생존|survival|위기/i,         keywords: ['survival pressure', 'scarce resources'] },
  { match: /감정|narrative|이야기|drama/i, keywords: ['emotional atmosphere', 'narrative weight'] },
  { match: /추격|chase|escape/i,          keywords: ['high-speed chase', 'urgent momentum'] },
  { match: /보스|boss|클라이맥스|climax/i, keywords: ['climactic boss encounter', 'epic confrontation'] },
];

/* ── 마스터 프롬프트 생성 — 전체 게임 무드보드/Key Art 톤 ──
   설계 원칙:
   - 특정 룸·노드를 그리지 않는다. 게임 *전체*의 분위기·팔레트·시대·라이팅을 묘사.
   - 컨셉 + 모든 노드의 icon·type을 *집계*해서 공통 요소 추출.
   - 페이싱 분석으로 dominant mood 결정.
   - "Key art / promotional poster / mood board" 톤으로 마무리.
*/
export function buildMasterMjPrompt(p: Project, paramsOverride?: string): string {
  const { concept, nodes } = p;
  const fullText = `${concept.theme} ${concept.intent} ${concept.pacing} ${concept.coreMechanic}`;
  const themeKw = collectKw(fullText, THEME_KEYWORDS);
  const moodKw = collectKw(concept.pacing + ' ' + concept.intent, MOOD_KEYWORDS);
  const intentKw = collectKw(fullText, INTENT_KEYWORDS);

  // ─── 노드 집계 ─── 가장 자주 등장하는 환경/오브젝트 요소
  const iconCount = new Map<string, number>();
  nodes.forEach((n) => n.icons.forEach((k) => {
    iconCount.set(k, (iconCount.get(k) ?? 0) + 1);
  }));
  const topIconKeys = [...iconCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([k]) => ICON_TO_KW[k])
    .filter(Boolean);

  // ─── 페이싱 dominant mood 결정 ───
  const pacingMood = decidePacingMood(concept.pacing, nodes);

  // ─── 노드 타입 비중으로 장르 톤 ───
  const typeMix = nodeTypeMix(nodes);

  // 영문 theme 살리되 너무 길면 첫 30자만
  const englishTheme = concept.theme && !hasKorean(concept.theme)
    ? concept.theme.slice(0, 60)
    : '';

  // ─── 합성 ───
  // 1) Establishing subject — 환경의 *전체* (한 룸이 아님)
  const establishing = englishTheme
    ? `a cohesive game world set in ${englishTheme}`
    : themeKw.length > 0
      ? `a cohesive game world featuring ${themeKw.slice(0, 2).join(' and ')}`
      : 'a cohesive game world atmosphere';

  // 2) 핵심 환경 요소들 (theme + 빈번 아이콘)
  const worldElements = [...themeKw.slice(0, 3), ...topIconKeys].slice(0, 5);

  // 3) 게임플레이 의도 (서브텍스트로)
  const playfeel = intentKw.length > 0
    ? `gameplay feeling: ${intentKw.slice(0, 2).join(', ')}`
    : '';

  // 4) 분위기 / 라이팅 / 팔레트
  const atmosphere = pacingMood.atmosphere;
  const lighting = pacingMood.lighting;
  const palette = derivePalette(themeKw, typeMix);

  // 5) Key art 톤 고정 마감
  const keyArtMarker = 'key art mood board for a video game, promotional poster composition, painterly digital illustration, cinematic wide shot, layered atmospheric depth, masterful color theory';

  const parts = [
    establishing,
    worldElements.join(', '),
    playfeel,
    atmosphere,
    lighting,
    palette,
    moodKw.join(', '),
    keyArtMarker,
  ].filter(Boolean);

  return sanitizeEnglishPrompt(`${parts.join(', ')} ${paramsOverride ?? DEFAULT_MJ_PARAMS}`);
}

/* 페이싱 텍스트와 노드 타입 비중으로 atmosphere/lighting 결정 */
function decidePacingMood(pacingText: string, nodes: BubbleNode[]): { atmosphere: string; lighting: string } {
  const bossCount = nodes.filter((n) => n.type === 'boss').length;
  const saveCount = nodes.filter((n) => n.type === 'save').length;
  const vistaCount = nodes.filter((n) => n.type === 'vista').length;
  const t = pacingText.toLowerCase();

  // climax 우세 — 에픽 무드
  if (bossCount >= 2 || /클라이맥스|climax|결전|epic/i.test(t)) {
    return {
      atmosphere: 'epic dramatic atmosphere with rising tension across the world',
      lighting: 'cinematic high-contrast lighting, god rays, deep shadows',
    };
  }
  // vista 많음 — 평온/탐험
  if (vistaCount >= 2 || /탐험|exploration|평온|벨앙스/i.test(t)) {
    return {
      atmosphere: 'contemplative serene atmosphere with awe-inspiring scale',
      lighting: 'soft volumetric light, golden hour ambient glow',
    };
  }
  // save·rest 많음 — 차분
  if (saveCount >= 2 || /휴식|차분|stillness/i.test(t)) {
    return {
      atmosphere: 'restful intimate atmosphere with quiet beats',
      lighting: 'warm ambient lantern light, soft shadows',
    };
  }
  // 기본 — 균형 잡힌 모험 톤
  return {
    atmosphere: 'balanced adventurous atmosphere with shifting moods',
    lighting: 'naturalistic cinematic lighting with subtle gradients',
  };
}

function nodeTypeMix(nodes: BubbleNode[]): Record<string, number> {
  const m: Record<string, number> = {};
  nodes.forEach((n) => { m[n.type] = (m[n.type] ?? 0) + 1; });
  return m;
}

function derivePalette(themeKw: string[], typeMix: Record<string, number>): string {
  const t = themeKw.join(' ').toLowerCase();
  // 환경 기반 팔레트 힌트
  if (/lava|volcano|ember|molten/.test(t)) return 'molten orange and obsidian black palette with ember accents';
  if (/snow|arctic|ice|frozen|blizzard/.test(t)) return 'icy blue and stark white palette with cold cyan accents';
  if (/jungle|forest|moss/.test(t)) return 'deep green and weathered stone palette with shafts of warm light';
  if (/desert|dune|sandstone/.test(t)) return 'golden amber and rust palette with mirage haze';
  if (/space|station|metal|sci.?fi|cyber/.test(t)) return 'cool steel blue and neon accent palette';
  if (/cathedral|gothic|stone/.test(t)) return 'cold stone gray and stained-glass jewel-tone palette';
  if (/manor|victorian|mansion/.test(t)) return 'sepia and oak wood palette with candlelight gold';
  if (/water|ocean|flooded|coral/.test(t)) return 'submerged teal and bone-white palette with refracted caustics';
  // 노드 타입 비중 기반 폴백
  if ((typeMix.boss ?? 0) >= 2) return 'high-contrast crimson and charcoal palette';
  if ((typeMix.vista ?? 0) >= 2) return 'wide naturalistic palette with horizon depth';
  return 'cohesive painterly palette with harmonized accent colors';
}

/* ── 노드별 프롬프트 — 출력은 100% 영어 ── */
export function buildNodeMjPrompt(
  node: BubbleNode,
  p: Project,
  paramsOverride?: string,
): string {
  const { concept } = p;
  const text = `${concept.theme} ${concept.intent} ${concept.coreMechanic}`;
  const themeKw = collectKw(text, THEME_KEYWORDS);

  // 노드 이름이 영문이면 살리고, 한국어면 영어 타입 디스크립션만 사용
  const englishName = node.name && !hasKorean(node.name) ? node.name : '';
  const typeDesc = NODE_TYPE_DESC[node.type];
  const subject = englishName || typeDesc;
  const iconKws = node.icons.map((k) => ICON_TO_KW[k]).filter(Boolean);

  const parts = [
    subject,
    englishName ? typeDesc : '',  // 영문 이름 있으면 typeDesc도 부가 정보로
    iconKws.join(', '),
    themeKw.slice(0, 3).join(', '),
    'video game concept art, painterly digital illustration, cinematic lighting, atmospheric depth',
  ].filter(Boolean);

  return sanitizeEnglishPrompt(`${parts.join(', ')} ${paramsOverride ?? DEFAULT_MJ_PARAMS}`);
}

function collectKw(
  text: string,
  list: Array<{ match: RegExp; keywords: string[] }>,
): string[] {
  const out: string[] = [];
  for (const { match, keywords } of list) {
    if (match.test(text)) out.push(...keywords);
  }
  return Array.from(new Set(out));
}
