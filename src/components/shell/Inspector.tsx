import { useState } from 'react';
import { useProject } from '../../store/project';
import type { NodeType, EdgeType, BubbleNode, BubbleEdge } from '../../types';
import { NODE_STYLES } from '../canvas/node-shapes';
import { EDGE_STYLE } from '../canvas/Edge';
import { UsageMeter } from '../ai/UsageMeter';
import { AIPanel } from '../ai/AIPanel';
import { ExportPanel } from '../export/ExportPanel';
import { buildNodeMjPrompt, buildMasterMjPrompt, DEFAULT_MJ_PARAMS } from '../templates/mj-keyword-dict';
import { geminiCall, NoKeyError } from '../ai/gemini';
import { SYSTEM_MJ_NODE, SYSTEM_MJ_MASTER, userMessageForMjNode, userMessageForMjMaster } from '../ai/prompts';
import './Inspector.css';

const NODE_TYPES: NodeType[] = ['room', 'vista', 'treasure', 'boss', 'hub', 'save'];
const EDGE_TYPES: EdgeType[] = ['open', 'locked', 'oneway', 'ability'];

const ICON_OPTIONS = [
  'chasm', 'treasure_visible', 'dash_required', 'key', 'lock',
  'oneway', 'ability_gate', 'enemy', 'trap', 'pressure_plate',
  'switch', 'save_altar', 'vista', 'water', 'fire', 'ice', 'shadow', 'light',
];

export function Inspector() {
  const selection = useProject((s) => s.selection);
  const project = useProject((s) => s.project);

  const node = selection.kind === 'node' ? project.nodes.find((n) => n.id === selection.id) : null;
  const edge = selection.kind === 'edge' ? project.edges.find((e) => e.id === selection.id) : null;
  const postit = selection.kind === 'postit' ? project.postits.find((p) => p.id === selection.id) : null;

  const [tab, setTab] = useState<'inspect' | 'ai' | 'export' | 'mj'>('inspect');

  return (
    <aside className="inspector edge-left">
      <div className="ins-tabs">
        <button className={tab === 'inspect' ? 'is-active' : ''} onClick={() => setTab('inspect')}>속성</button>
        <button className={tab === 'mj' ? 'is-active' : ''} onClick={() => setTab('mj')}>MJ 프롬프트</button>
        <button className={tab === 'ai' ? 'is-active' : ''} onClick={() => setTab('ai')}>AI</button>
        <button className={tab === 'export' ? 'is-active' : ''} onClick={() => setTab('export')}>Export</button>
      </div>

      <div className="ins-body">
        {tab === 'inspect' && (
          <>
            {node && <NodeInspector node={node} />}
            {edge && <EdgeInspector edge={edge} />}
            {postit && <PostitInspector postitId={postit.id} />}
            {!node && !edge && !postit && <EmptyInspector />}
          </>
        )}
        {tab === 'mj' && <MjPanel nodeId={node?.id} />}
        {tab === 'ai' && <AIPanel />}
        {tab === 'export' && <ExportPanel />}
      </div>

      <UsageMeter />
    </aside>
  );
}

function aspectLabel(a: number, circleA: number): string {
  if (Math.abs(a - circleA) < 0.04) return '원형';
  if (Math.abs(a - 1) < 0.04) return '기본';
  if (a > 1) return `가로 ${a.toFixed(2)}×`;
  return `세로 ${(1 / a).toFixed(2)}×`;
}

function EmptyInspector() {
  return (
    <div className="ins-empty">
      <p className="hand">아무것도 선택되지 않았습니다.</p>
      <ul className="ins-empty-tips caption">
        <li>· 노드를 클릭 → 속성 편집</li>
        <li>· 노드 우측 핸들에서 드래그 → 엣지 그리기</li>
        <li>· 포스트잇을 캔버스로 드래그 → 노드로 승격</li>
      </ul>
    </div>
  );
}

function NodeInspector({ node }: { node: BubbleNode }) {
  const updateNode = useProject((s) => s.updateNode);
  const removeNode = useProject((s) => s.removeNode);
  const resizeNode = useProject((s) => s.resizeNode);
  const setNodeAspect = useProject((s) => s.setNodeAspect);
  const size = node.size ?? 1;
  const aspect = node.aspect ?? 1;
  // 원형으로 만드는 aspect 계산 — 타입 기본 rx/ry로부터 역산
  const baseStyle = NODE_STYLES[node.type];
  const circleAspect = Math.sqrt(baseStyle.ry / baseStyle.rx);

  return (
    <div className="ins-section">
      <div className="ins-section-head">
        <span className="caption">노드</span>
        <button className="ins-del" onClick={() => removeNode(node.id)}>삭제</button>
      </div>

      <label className="ins-field">
        <span>이름</span>
        <input value={node.name} onChange={(e) => updateNode(node.id, { name: e.target.value })} />
      </label>

      <label className="ins-field">
        <span>크기 · {Math.round(size * 100)}%</span>
        <div className="ins-size-row">
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.05"
            value={size}
            onChange={(e) => resizeNode(node.id, parseFloat(e.target.value))}
            className="ins-size-slider"
          />
          <button onClick={() => resizeNode(node.id, 1)} className="ins-size-reset" title="기본 크기로">↻</button>
        </div>
      </label>

      <label className="ins-field">
        <span>형태 · {aspectLabel(aspect, circleAspect)}</span>
        <div className="ins-size-row">
          <input
            type="range"
            min="0.4"
            max="2.5"
            step="0.05"
            value={aspect}
            onChange={(e) => setNodeAspect(node.id, parseFloat(e.target.value))}
            className="ins-size-slider"
          />
          <button onClick={() => setNodeAspect(node.id, 1)} className="ins-size-reset" title="기본 비율로">↻</button>
        </div>
        <div className="ins-aspect-presets">
          <button
            onClick={() => setNodeAspect(node.id, 0.6)}
            className={Math.abs(aspect - 0.6) < 0.05 ? 'is-active' : ''}
            title="세로 타원"
          >▌세로</button>
          <button
            onClick={() => setNodeAspect(node.id, circleAspect)}
            className={Math.abs(aspect - circleAspect) < 0.05 ? 'is-active' : ''}
            title="원형"
          >◯ 원형</button>
          <button
            onClick={() => setNodeAspect(node.id, 1)}
            className={Math.abs(aspect - 1) < 0.05 ? 'is-active' : ''}
            title="타입 기본 비율"
          >◌ 기본</button>
          <button
            onClick={() => setNodeAspect(node.id, 1.7)}
            className={Math.abs(aspect - 1.7) < 0.05 ? 'is-active' : ''}
            title="가로 타원"
          >▬가로</button>
        </div>
      </label>

      <label className="ins-field">
        <span>타입</span>
        <div className="ins-chips">
          {NODE_TYPES.map((t) => {
            const s = NODE_STYLES[t];
            return (
              <button
                key={t}
                className={`ins-chip ${node.type === t ? 'is-active' : ''}`}
                onClick={() => updateNode(node.id, { type: t })}
                style={{ borderColor: node.type === t ? s.stroke : undefined }}
              >
                <span className="ins-chip-icon">{s.icon}</span> {s.label}
              </button>
            );
          })}
        </div>
      </label>

      <label className="ins-field">
        <span>아이콘 태그</span>
        <div className="ins-chips ins-chips--small">
          {ICON_OPTIONS.map((k) => {
            const on = node.icons.includes(k);
            return (
              <button
                key={k}
                className={`ins-chip ins-chip--small ${on ? 'is-active' : ''}`}
                onClick={() => {
                  const next = on ? node.icons.filter((x) => x !== k) : [...node.icons, k];
                  updateNode(node.id, { icons: next });
                }}
              >{k}</button>
            );
          })}
        </div>
      </label>

      <label className="ins-field">
        <span>노트</span>
        <textarea
          rows={5}
          value={node.notes}
          onChange={(e) => updateNode(node.id, { notes: e.target.value })}
          placeholder="이 방에서 일어나는 일, 적, 환경 디테일…"
        />
      </label>

      {node.promotedFrom && (
        <div className="ins-meta caption">↩ 포스트잇에서 승격됨</div>
      )}
    </div>
  );
}

function EdgeInspector({ edge }: { edge: BubbleEdge }) {
  const updateEdge = useProject((s) => s.updateEdge);
  const removeEdge = useProject((s) => s.removeEdge);
  const nodes = useProject((s) => s.project.nodes);
  const from = nodes.find((n) => n.id === edge.from);
  const to = nodes.find((n) => n.id === edge.to);

  return (
    <div className="ins-section">
      <div className="ins-section-head">
        <span className="caption">간선</span>
        <button className="ins-del" onClick={() => removeEdge(edge.id)}>삭제</button>
      </div>

      <div className="ins-edge-flow">
        <span>{from?.name ?? '?'}</span>
        <span className="ins-arrow">→</span>
        <span>{to?.name ?? '?'}</span>
      </div>

      <label className="ins-field">
        <span>타입</span>
        <div className="ins-chips">
          {EDGE_TYPES.map((t) => {
            const s = EDGE_STYLE[t];
            return (
              <button
                key={t}
                className={`ins-chip ${edge.type === t ? 'is-active' : ''}`}
                onClick={() => updateEdge(edge.id, { type: t })}
                style={{ borderColor: edge.type === t ? s.stroke : undefined }}
              >{s.label}</button>
            );
          })}
        </div>
      </label>

      {edge.type === 'locked' && (
        <label className="ins-field">
          <span>키 ID</span>
          <input
            value={edge.keyId ?? ''}
            onChange={(e) => updateEdge(edge.id, { keyId: e.target.value })}
            placeholder="예: dragon_key"
          />
        </label>
      )}

      {edge.type === 'ability' && (
        <label className="ins-field">
          <span>능력 ID</span>
          <input
            value={edge.abilityId ?? ''}
            onChange={(e) => updateEdge(edge.id, { abilityId: e.target.value })}
            placeholder="예: dash"
          />
        </label>
      )}

      <label className="ins-field">
        <span>라벨 (선택)</span>
        <input
          value={edge.label ?? ''}
          onChange={(e) => updateEdge(edge.id, { label: e.target.value })}
        />
      </label>
    </div>
  );
}

function PostitInspector({ postitId }: { postitId: string }) {
  const postit = useProject((s) => s.project.postits.find((p) => p.id === postitId));
  const updatePostit = useProject((s) => s.updatePostit);
  const removePostit = useProject((s) => s.removePostit);
  const [tagInput, setTagInput] = useState('');
  if (!postit) return null;

  const addTag = () => {
    const t = tagInput.trim();
    if (!t) return;
    updatePostit(postit.id, { tags: Array.from(new Set([...postit.tags, t])) });
    setTagInput('');
  };

  return (
    <div className="ins-section">
      <div className="ins-section-head">
        <span className="caption">포스트잇</span>
        <button className="ins-del" onClick={() => removePostit(postit.id)}>삭제</button>
      </div>
      <label className="ins-field">
        <span>내용</span>
        <textarea
          rows={4}
          value={postit.text}
          onChange={(e) => updatePostit(postit.id, { text: e.target.value })}
        />
      </label>
      <label className="ins-field">
        <span>태그 추가</span>
        <div className="ins-tag-input">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') addTag(); }}
            placeholder="태그 + Enter"
          />
          <button onClick={addTag}>+</button>
        </div>
        {postit.tags.length > 0 && (
          <div className="ins-tag-list">
            {postit.tags.map((t) => (
              <button
                key={t}
                className="ins-tag"
                onClick={() => updatePostit(postit.id, { tags: postit.tags.filter((x) => x !== t) })}
              >#{t} ×</button>
            ))}
          </div>
        )}
      </label>
    </div>
  );
}

function MjPanel({ nodeId }: { nodeId?: string }) {
  const project = useProject((s) => s.project);
  const setMjMaster = useProject((s) => s.setMjMaster);
  const updateNode = useProject((s) => s.updateNode);
  const [params, setParams] = useState(DEFAULT_MJ_PARAMS);
  const [loadingMaster, setLoadingMaster] = useState(false);
  const [loadingNode, setLoadingNode] = useState(false);
  const [aiNote, setAiNote] = useState<string | null>(null);

  const node = nodeId ? project.nodes.find((n) => n.id === nodeId) : undefined;
  const masterPrompt = project.mjMasterPrompt ?? buildMasterMjPrompt(project, params);
  const nodePrompt = node ? (node.mjPrompt ?? buildNodeMjPrompt(node, project, params)) : '';

  const generateMasterOffline = () => {
    setMjMaster(buildMasterMjPrompt(project, params));
    setAiNote('오프라인 템플릿으로 생성됨');
  };

  const generateMasterAI = async () => {
    setLoadingMaster(true);
    setAiNote(null);
    try {
      const r = await geminiCall({
        system: SYSTEM_MJ_MASTER,
        user: userMessageForMjMaster(project, params),
        maxTokens: 400,
      });
      setMjMaster(r.text.trim());
      setAiNote(`AI 생성 (${r.modelUsed}${r.fallback ? ' · 폴백' : ''})`);
    } catch (e: any) {
      if (e instanceof NoKeyError) {
        setAiNote('AI 키 없음 — 오프라인 템플릿으로 대체');
        setMjMaster(buildMasterMjPrompt(project, params));
      } else {
        setAiNote(`AI 실패: ${e.message ?? e}`);
      }
    } finally {
      setLoadingMaster(false);
    }
  };

  const generateNodeOffline = () => {
    if (!node) return;
    updateNode(node.id, { mjPrompt: buildNodeMjPrompt(node, project, params) });
    setAiNote('오프라인 템플릿으로 생성됨');
  };

  const generateNodeAI = async () => {
    if (!node) return;
    setLoadingNode(true);
    setAiNote(null);
    try {
      const r = await geminiCall({
        system: SYSTEM_MJ_NODE,
        user: userMessageForMjNode(project, node.id, params),
        preferModel: 'gemini-2.5-flash',
        maxTokens: 300,
      });
      updateNode(node.id, { mjPrompt: r.text.trim() });
      setAiNote(`AI 생성 (${r.modelUsed}${r.fallback ? ' · 폴백' : ''})`);
    } catch (e: any) {
      if (e instanceof NoKeyError) {
        updateNode(node.id, { mjPrompt: buildNodeMjPrompt(node, project, params) });
        setAiNote('AI 키 없음 — 오프라인 템플릿으로 대체');
      } else {
        setAiNote(`AI 실패: ${e.message ?? e}`);
      }
    } finally {
      setLoadingNode(false);
    }
  };

  const generateAllNodes = async () => {
    setLoadingNode(true);
    setAiNote('전체 노드 생성 중…');
    let aiCount = 0, offCount = 0;
    for (const n of project.nodes) {
      try {
        const r = await geminiCall({
          system: SYSTEM_MJ_NODE,
          user: userMessageForMjNode(project, n.id, params),
          preferModel: 'gemini-2.5-flash',
          maxTokens: 300,
        });
        updateNode(n.id, { mjPrompt: r.text.trim() });
        aiCount += 1;
      } catch {
        updateNode(n.id, { mjPrompt: buildNodeMjPrompt(n, project, params) });
        offCount += 1;
      }
    }
    setAiNote(`완료 — AI ${aiCount}건, 오프라인 ${offCount}건`);
    setLoadingNode(false);
  };

  const copy = (text: string) => navigator.clipboard?.writeText(text);

  return (
    <div className="ins-mj">
      <div className="ins-mj-params">
        <label className="ins-field">
          <span>파라미터 (직접 편집)</span>
          <input
            className="ins-mono"
            value={params}
            onChange={(e) => setParams(e.target.value)}
          />
        </label>
      </div>

      <section className="ins-mj-section">
        <header className="ins-mj-head">
          <h4>마스터 프롬프트</h4>
          <span className="caption">레벨 전체 무드보드</span>
        </header>
        <textarea
          className="ins-mj-textarea ins-mono"
          rows={5}
          readOnly
          value={masterPrompt}
        />
        <div className="ins-mj-actions">
          <button onClick={generateMasterOffline}>오프라인 재생성</button>
          <button onClick={generateMasterAI} disabled={loadingMaster} className="ins-mj-ai">
            {loadingMaster ? '생성 중…' : 'AI 생성'}
          </button>
          <button onClick={() => copy(masterPrompt)}>복사</button>
        </div>
      </section>

      <section className="ins-mj-section">
        <header className="ins-mj-head">
          <h4>노드 프롬프트</h4>
          <span className="caption">{node ? node.name : '노드 선택 없음'}</span>
        </header>
        <textarea
          className="ins-mj-textarea ins-mono"
          rows={5}
          readOnly
          value={nodePrompt}
          placeholder="노드를 선택하면 표시됩니다."
        />
        <div className="ins-mj-actions">
          <button onClick={generateNodeOffline} disabled={!node}>오프라인 재생성</button>
          <button onClick={generateNodeAI} disabled={!node || loadingNode} className="ins-mj-ai">
            {loadingNode ? '생성 중…' : 'AI 생성'}
          </button>
          <button onClick={() => copy(nodePrompt)} disabled={!nodePrompt}>복사</button>
        </div>
        <button onClick={generateAllNodes} disabled={loadingNode || project.nodes.length === 0} className="ins-mj-all">
          모든 노드 일괄 생성 ({project.nodes.length})
        </button>
      </section>

      {aiNote && <p className="ins-mj-note caption">{aiNote}</p>}
    </div>
  );
}
