import type { Project } from '../../types';
import { NODE_STYLES } from '../canvas/node-shapes';
import { EDGE_STYLE } from '../canvas/Edge';

export function buildMarkdown(p: Project): string {
  const lines: string[] = [];
  lines.push(`# ${p.name}`);
  lines.push('');
  lines.push(`> 생성일: ${new Date(p.updatedAt).toLocaleString('ko-KR')}`);
  lines.push('');

  // 컨셉
  lines.push('## 컨셉');
  const c = p.concept;
  if (c.theme) lines.push(`- **테마**: ${c.theme}`);
  if (c.intent) lines.push(`- **의도**: ${c.intent}`);
  if (c.coreMechanic) lines.push(`- **코어 메커닉**: ${c.coreMechanic}`);
  if (c.pacing) lines.push(`- **페이싱**: ${c.pacing}`);
  if (c.learningGoals?.length) {
    lines.push(`- **학습 목표**:`);
    c.learningGoals.forEach((g) => lines.push(`  - ${g}`));
  }
  if (c.fantasyHook) lines.push(`- **판타지 후크**: ${c.fantasyHook}`);
  lines.push('');

  // 노드
  if (p.nodes.length > 0) {
    lines.push('## 룸 명세');
    lines.push('');
    for (const n of p.nodes) {
      const s = NODE_STYLES[n.type];
      lines.push(`### ${s.icon} ${n.name} — _${s.label}_`);
      lines.push('');
      if (n.icons.length > 0) lines.push(`- 태그: ${n.icons.map((i) => `\`${i}\``).join(', ')}`);
      if (n.notes) {
        lines.push('');
        lines.push(n.notes);
      }
      if (n.mjPrompt) {
        lines.push('');
        lines.push('**Midjourney**:');
        lines.push('```');
        lines.push(n.mjPrompt);
        lines.push('```');
      }
      lines.push('');
    }
  }

  // 엣지
  if (p.edges.length > 0) {
    lines.push('## 동선');
    lines.push('');
    lines.push('| 출발 | → | 도착 | 타입 | 메타 |');
    lines.push('|:--|:--|:--|:--|:--|');
    for (const e of p.edges) {
      const from = p.nodes.find((n) => n.id === e.from)?.name ?? '?';
      const to = p.nodes.find((n) => n.id === e.to)?.name ?? '?';
      const st = EDGE_STYLE[e.type];
      const meta = e.keyId ? `🔑 ${e.keyId}` : e.abilityId ? `✦ ${e.abilityId}` : e.label ?? '';
      lines.push(`| ${from} | → | ${to} | ${st.label} | ${meta} |`);
    }
    lines.push('');
  }

  // 마스터 MJ
  if (p.mjMasterPrompt) {
    lines.push('## 마스터 Midjourney 프롬프트');
    lines.push('');
    lines.push('```');
    lines.push(p.mjMasterPrompt);
    lines.push('```');
    lines.push('');
  }

  // 포스트잇 (남은 것)
  const unpromoted = p.postits.filter((x) => !x.promoted);
  if (unpromoted.length > 0) {
    lines.push('## 보류 메모');
    lines.push('');
    for (const ps of unpromoted) {
      lines.push(`- ${ps.text}${ps.tags.length ? ` _(${ps.tags.join(', ')})_` : ''}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}
