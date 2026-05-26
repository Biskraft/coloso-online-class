/* ─────────────────────────────────────────────────────────
   WorldBuilding 시나리오 48편 → ConceptTemplate 자동 변환
   - Vite glob import로 빌드 타임에 raw 마크다운 로드
   - 정규식 파서로 메타데이터 추출
   - Topview에서 seedPostits 자동 생성
   ───────────────────────────────────────────────────────── */

import type { ConceptTemplate, Mechanic } from './concept-library';
import type { PostitColor } from '../../types';

// Vite glob: 빌드 시 모든 .md를 raw 문자열로 import
const scenarioFiles = import.meta.glob('../../worldbuilding/scenarios/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const topviewFiles = import.meta.glob('../../worldbuilding/topview/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

/* 장르 → mechanic 매핑 */
function classifyMechanic(genre: string, title: string): Mechanic {
  const t = (genre + ' ' + title).toLowerCase();
  if (/잠입|stealth|heist|shadow|spy|infilt/i.test(t)) return 'stealth';
  if (/퍼즐|puzzle/i.test(t)) return 'puzzle';
  if (/내러티브|narrative|드라마|외교|대화|추리|감성|평화/i.test(t)) return 'narrative';
  if (/생존|survival|호러|escape|도주|호위|safe.?zone defense/i.test(t)) return 'survival';
  if (/탐험|exploration|어드벤처|adventure|오픈월드|walking|배달|크래프팅|탐사|고고학|첫.?조우|first.?contact/i.test(t)) return 'exploration';
  if (/초능력|각성|awakening|능력|기원|first.?day|플랫포머|플랫폼/i.test(t)) return 'ability';
  if (/슈터|shooter|디펜스|defense|공성|핵.?앤.?슬래시|hack|소울|souls|격투|메카닉|전술|호드|군중|점령|함대|tactic|combat|보스/i.test(t)) return 'combat';
  return 'exploration';
}

/* mechanic 별 후보 색상 (포스트잇 시드용) */
const POSTIT_COLOR_BY_TAG: Record<string, PostitColor> = {
  enemy: 'pink', combat: 'pink', boss: 'pink', risk: 'pink',
  reward: 'yellow', treasure: 'yellow', key: 'yellow', goal: 'yellow', tool: 'yellow',
  mood: 'lilac', mystery: 'lilac', secret: 'lilac',
  vista: 'mint', landmark: 'mint', hub: 'mint', rest: 'mint',
  teach: 'blue', practice: 'blue', mechanic: 'blue',
};

/* 한 줄 트림·메타기호 제거 헬퍼 */
const stripMd = (s: string) =>
  s.replace(/\*\*/g, '').replace(/^[-*]\s*/, '').replace(/^#+\s*/, '').trim();

/* 한 시나리오 마크다운 파싱 */
function parseScenario(raw: string, basename: string): ConceptTemplate {
  const lines = raw.split(/\r?\n/);
  const id = basename.replace(/\.md$/, '').toLowerCase().replace(/_/g, '-');

  // 제목: # S01: Data Heist (데이터 강탈)
  const titleLine = lines[0] || '';
  const titleMatch = titleLine.match(/^[#﻿\s]*S(\d+):\s*(.+?)(?:\s*\((.+?)\))?\s*$/);
  const num = titleMatch?.[1] ?? '?';
  const engTitle = titleMatch?.[2]?.trim() ?? basename;
  const korTitle = titleMatch?.[3]?.trim() ?? '';
  const title = korTitle ? `S${num} ${korTitle}` : `S${num} ${engTitle}`;

  // 장르 / 주인공 / 핵심 목표 / Vibe
  const grab = (pattern: RegExp): string => {
    for (const l of lines) {
      const m = l.match(pattern);
      if (m) return stripMd(m[1]);
    }
    return '';
  };

  const genre = grab(/^[-*\s]+\*\*장르\*\*:\s*\*\*?(.+?)\*?\*?\s*$/);
  const protagonist = grab(/^[-*\s]+\*\*주인공\*\*:\s*(.+)$/);
  const goal = grab(/^[-*\s]+\*\*핵심 목표\*\*:\s*(.+)$/);
  const vibe = grab(/^[-*\s]+\*\*The Vibe\*\*:\s*(.+)$/);

  // 3C 코어 메커닉 — Controls 줄
  const controls = grab(/^[-*\s]+\*\*Controls\*\*:\s*(.+)$/);

  // 배경 / 시간대 / 색상
  const background = grab(/^[-*\s]+\*\*배경\*\*:\s*(.+)$/);
  const timeRange = grab(/^[-*\s]+\*\*주요 시간대\*\*:\s*(.+)$/);

  // Zone 라인들
  const zones: Array<{ name: string; desc: string }> = [];
  const zonePattern = /^[-*\s]+\*\*Zone\s+\d+[^*]*\*\*\s*-?\s*(.+)$/;
  for (const l of lines) {
    const m = l.match(zonePattern);
    if (m) {
      const full = m[1].trim();
      const dashIdx = full.indexOf(' - ');
      if (dashIdx > 0) {
        zones.push({ name: full.slice(0, dashIdx).trim(), desc: full.slice(dashIdx + 3).trim() });
      } else {
        zones.push({ name: full, desc: '' });
      }
    }
  }

  // Act 1/2/3 핵심 — "### Act N: 부제" 다음 "**공간**:" 줄
  const acts: Array<{ title: string; space: string; pacing: string }> = [];
  for (let i = 0; i < lines.length; i++) {
    const am = lines[i].match(/^###\s+Act\s+(\d+):\s*(.+?)\s*\(/);
    if (am) {
      const idx = parseInt(am[1], 10);
      const subtitle = am[2].trim();
      let space = '', pacing = '';
      for (let j = i + 1; j < Math.min(i + 12, lines.length); j++) {
        const sp = lines[j].match(/^[-*\s]+\*\*공간\*\*:\s*(.+)$/);
        if (sp) space = stripMd(sp[1]);
        const pc = lines[j].match(/^[-*\s]+\*\*페이싱\*\*:\s*(.+)$/);
        if (pc) pacing = stripMd(pc[1]);
        if (lines[j].startsWith('### Act')) break;
      }
      acts[idx - 1] = { title: subtitle, space, pacing };
    }
  }

  // Vibe에서 참고 게임 추출 (참고: ... 부분)
  const vibeRef = vibe.match(/참고:\s*(.+?)(?:\)|$)/);
  const fantasyHook = vibeRef ? vibeRef[1].trim() : vibe.split('.')[0];

  // Pacing 자동 조립
  const pacingStr = acts
    .filter(Boolean)
    .map((a) => a.title || a.space)
    .join(' → ');

  const mechanic = classifyMechanic(genre, korTitle + ' ' + engTitle);

  // seedPostits: Zone + Act 정보 기반
  const seedPostits = buildSeedPostits({
    zones, acts, goal, vibe, background, timeRange, controls,
  });

  return {
    id,
    title,
    mechanic,
    genres: [genre, '3D 게임'].filter(Boolean),
    concept: {
      theme: [background, timeRange].filter(Boolean).join(', '),
      intent: goal || (protagonist ? `${protagonist}의 여정` : '시나리오 진행'),
      coreMechanic: controls || protagonist,
      learningGoals: extractLearningGoals(acts, zones),
      pacing: pacingStr || 'Low → Rising → Climax → Release',
      fantasyHook,
    },
    seedPostits,
  };
}

function buildSeedPostits(o: {
  zones: Array<{ name: string; desc: string }>;
  acts: Array<{ title: string; space: string; pacing: string }>;
  goal: string; vibe: string; background: string; timeRange: string; controls: string;
}): ConceptTemplate['seedPostits'] {
  const cards: ConceptTemplate['seedPostits'] = [];

  // 배경
  if (o.background) {
    cards.push({ text: `배경 — ${o.background}${o.timeRange ? ` (${o.timeRange})` : ''}`, color: 'mint', tags: ['mood'] });
  }

  // Zones
  o.zones.slice(0, 5).forEach((z) => {
    if (z.name) cards.push({
      text: z.desc ? `${z.name} — ${z.desc}` : z.name,
      color: 'mint', tags: ['zone'],
    });
  });

  // Acts
  o.acts.filter(Boolean).forEach((a, i) => {
    const txt = a.space ? `Act ${i + 1} · ${a.title} — ${a.space}` : `Act ${i + 1} · ${a.title}`;
    const color: PostitColor = a.pacing?.includes('Climax') || a.pacing?.includes('High') ? 'pink'
      : a.pacing?.includes('Low') || a.pacing?.includes('Rest') ? 'mint'
      : 'blue';
    cards.push({ text: txt, color, tags: ['act'] });
  });

  // 코어 메커닉
  if (o.controls) {
    cards.push({ text: `핵심 조작 — ${o.controls}`, color: 'yellow', tags: ['mechanic'] });
  }

  // 핵심 목표
  if (o.goal) {
    cards.push({ text: `목표 — ${o.goal}`, color: 'pink', tags: ['goal'] });
  }

  return cards;
}

function extractLearningGoals(
  acts: Array<{ title: string; space: string; pacing: string }>,
  zones: Array<{ name: string }>,
): string[] {
  const goals: string[] = [];
  if (acts.length >= 3) {
    goals.push('3-Act 페이싱 곡선 (Low → Rising → Climax)');
  }
  if (zones.length >= 3) {
    goals.push(`${zones.length} Zone 다층 구조 설계`);
  }
  if (acts[1]?.title) {
    goals.push(`중간 Act 긴장 고조: ${acts[1].title}`);
  }
  return goals;
}

/* ─── 빌드 타임 변환 결과 ─── */

function basename(path: string): string {
  return path.split('/').pop() ?? path;
}

export const SCENARIO_TEMPLATES: ConceptTemplate[] = Object.entries(scenarioFiles)
  .map(([path, raw]) => {
    try {
      return parseScenario(raw, basename(path));
    } catch (e) {
      console.warn('시나리오 파싱 실패', path, e);
      return null;
    }
  })
  .filter((x): x is ConceptTemplate => x !== null)
  .sort((a, b) => a.id.localeCompare(b.id));

/* ─── 시나리오·Topview raw 마크다운 (Library 패널용) ─── */

export interface ScenarioDoc {
  id: string;          // s01, s02, ...
  num: number;
  title: string;       // S01 Data Heist
  scenarioMd: string;
  topviewMd?: string;
}

export const SCENARIO_DOCS: ScenarioDoc[] = SCENARIO_TEMPLATES.map((tpl) => {
  const numMatch = tpl.id.match(/s(\d+)/);
  const num = numMatch ? parseInt(numMatch[1], 10) : 0;
  const scenarioPath = Object.keys(scenarioFiles).find((p) => basename(p).toLowerCase().startsWith(`s${String(num).padStart(2, '0')}_`));
  const topviewPath = Object.keys(topviewFiles).find((p) => basename(p).toLowerCase().startsWith(`s${String(num).padStart(2, '0')}_`));
  return {
    id: tpl.id,
    num,
    title: tpl.title,
    scenarioMd: scenarioPath ? scenarioFiles[scenarioPath] : '',
    topviewMd: topviewPath ? topviewFiles[topviewPath] : undefined,
  };
}).sort((a, b) => a.num - b.num);

/* ─── 데이터베이스 (00~04) raw 마크다운 ─── */

const dbFiles = import.meta.glob('../../worldbuilding/databases/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface ReferenceDoc {
  id: string;
  title: string;
  md: string;
}

const DB_TITLE_MAP: Record<string, string> = {
  '00_Overview.md': 'Nexus Multiverse — 세계관 개요',
  '01_Genre_Database.md': '장르 데이터베이스',
  '02_Characters_Database.md': '캐릭터 데이터베이스',
  '03_Scenarios_Database.md': '시나리오 인덱스',
  '04_Level_Design_Guide.md': '레벨 디자인 가이드',
};

export const REFERENCE_DOCS: ReferenceDoc[] = Object.entries(dbFiles)
  .map(([path, md]) => {
    const name = basename(path);
    return {
      id: name.replace(/\.md$/, ''),
      title: DB_TITLE_MAP[name] ?? name,
      md,
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id));
