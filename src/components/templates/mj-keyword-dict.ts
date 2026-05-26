/* ─────────────────────────────────────────────────────────
   결정론적 Midjourney 프롬프트 생성기
   다이어그램(노드+엣지+컨셉) → MJ 프롬프트
   ───────────────────────────────────────────────────────── */

import type { Project, BubbleNode, NodeType } from '../../types';

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

/* ── 마스터 프롬프트 생성 ── */
export function buildMasterMjPrompt(p: Project, paramsOverride?: string): string {
  const { concept } = p;
  const text = `${concept.theme} ${concept.intent} ${concept.pacing}`;
  const themeKw = collectKw(text, THEME_KEYWORDS);
  const moodKw = collectKw(concept.pacing + ' ' + concept.intent, MOOD_KEYWORDS);

  const subject = concept.theme || 'a video game level concept';
  const intent = concept.intent ? `evoking ${concept.intent.replace(/^플레이어가\s*/, '')}` : '';

  const parts = [
    subject,
    themeKw.join(', '),
    intent,
    moodKw.join(', '),
    'concept art for a video game level, painterly digital art, cinematic composition, rich material detail',
  ].filter(Boolean);

  return `${parts.join(', ')} ${paramsOverride ?? DEFAULT_MJ_PARAMS}`.replace(/\s+/g, ' ').trim();
}

/* ── 노드별 프롬프트 ── */
export function buildNodeMjPrompt(
  node: BubbleNode,
  p: Project,
  paramsOverride?: string,
): string {
  const { concept } = p;
  const text = `${concept.theme} ${concept.intent}`;
  const themeKw = collectKw(text, THEME_KEYWORDS);

  const subject = node.name || NODE_TYPE_DESC[node.type];
  const typeDesc = NODE_TYPE_DESC[node.type];
  const iconKws = node.icons.map((k) => ICON_TO_KW[k]).filter(Boolean);

  const parts = [
    subject,
    typeDesc,
    iconKws.join(', '),
    themeKw.slice(0, 3).join(', '),
    'video game concept art, painterly digital illustration, cinematic lighting, atmospheric depth',
  ].filter(Boolean);

  return `${parts.join(', ')} ${paramsOverride ?? DEFAULT_MJ_PARAMS}`.replace(/\s+/g, ' ').trim();
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
