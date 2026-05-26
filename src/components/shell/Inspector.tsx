import { useState } from 'react';
import { useProject } from '../../store/project';
import type { NodeType, EdgeType, BubbleNode, BubbleEdge } from '../../types';
import { NODE_STYLES } from '../canvas/node-shapes';
import { EDGE_STYLE } from '../canvas/Edge';
import { UsageMeter } from '../ai/UsageMeter';
import { AIPanel } from '../ai/AIPanel';
import { ExportPanel } from '../export/ExportPanel';
import { buildNodeMjPrompt, buildMasterMjPrompt, DEFAULT_MJ_PARAMS, sanitizeEnglishPrompt } from '../templates/mj-keyword-dict';
import { geminiCall, NoKeyError } from '../ai/gemini';
import { SYSTEM_MJ_NODE, SYSTEM_MJ_MASTER, userMessageForMjNode, userMessageForMjMaster } from '../ai/prompts';
import './Inspector.css';

const NODE_TYPES: NodeType[] = ['room', 'vista', 'treasure', 'boss', 'hub', 'save'];
const EDGE_TYPES: EdgeType[] = ['open', 'locked', 'oneway', 'ability', 'vista'];

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
  const baseStyle = NODE_STYLES[node.type];
  const rx = Math.round(baseStyle.rx * size * Math.sqrt(aspect));
  const ry = Math.round(baseStyle.ry * size / Math.sqrt(aspect));

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
        <span>크기 · {Math.round(size * 100)}% · {rx}×{ry}</span>
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
          <button
            onClick={() => { resizeNode(node.id, 1); setNodeAspect(node.id, 1); }}
            className="ins-size-reset"
            title="크기·형태 모두 기본값"
          >↻</button>
        </div>
        <p className="ins-hint-mini">캔버스의 파란 핸들을 드래그하면 가로·세로를 자유롭게 조절</p>
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
        <span>키워드 태그 (노드 아래·MJ 프롬프트에 반영)</span>
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
  const [loadingMaster, setLoadingMaster] = useState(false);
  const [loadingNode, setLoadingNode] = useState(false);
  const [aiNote, setAiNote] = useState<string | null>(null);

  const node = nodeId ? project.nodes.find((n) => n.id === nodeId) : undefined;
  // 파라미터는 항상 프롬프트 안에 통합되어 출력됨 (별도 입력 X)
  const masterPrompt = project.mjMasterPrompt ?? buildMasterMjPrompt(project);
  const nodePrompt = node ? (node.mjPrompt ?? buildNodeMjPrompt(node, project)) : '';

  const generateMasterOffline = () => {
    setMjMaster(buildMasterMjPrompt(project));
    setAiNote('오프라인 템플릿으로 생성됨');
  };

  const generateMasterAI = async () => {
    setLoadingMaster(true);
    setAiNote(null);
    try {
      const r = await geminiCall({
        system: SYSTEM_MJ_MASTER,
        user: userMessageForMjMaster(project, DEFAULT_MJ_PARAMS),
        maxTokens: 400,
      });
      setMjMaster(sanitizeEnglishPrompt(r.text));
      setAiNote(`AI 생성 (${r.modelUsed}${r.fallback ? ' · 폴백' : ''})`);
    } catch (e: any) {
      if (e instanceof NoKeyError) {
        setAiNote('AI 키 없음 — 오프라인 템플릿으로 대체');
        setMjMaster(buildMasterMjPrompt(project));
      } else {
        setAiNote(`AI 실패: ${e.message ?? e}`);
      }
    } finally {
      setLoadingMaster(false);
    }
  };

  const generateNodeOffline = () => {
    if (!node) return;
    updateNode(node.id, { mjPrompt: buildNodeMjPrompt(node, project) });
    setAiNote('오프라인 템플릿으로 생성됨');
  };

  const generateNodeAI = async () => {
    if (!node) return;
    setLoadingNode(true);
    setAiNote(null);
    try {
      const r = await geminiCall({
        system: SYSTEM_MJ_NODE,
        user: userMessageForMjNode(project, node.id, DEFAULT_MJ_PARAMS),
        preferModel: 'gemini-2.5-flash',
        maxTokens: 300,
      });
      updateNode(node.id, { mjPrompt: sanitizeEnglishPrompt(r.text) });
      setAiNote(`AI 생성 (${r.modelUsed}${r.fallback ? ' · 폴백' : ''})`);
    } catch (e: any) {
      if (e instanceof NoKeyError) {
        updateNode(node.id, { mjPrompt: buildNodeMjPrompt(node, project) });
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
          user: userMessageForMjNode(project, n.id, DEFAULT_MJ_PARAMS),
          preferModel: 'gemini-2.5-flash',
          maxTokens: 300,
        });
        updateNode(n.id, { mjPrompt: sanitizeEnglishPrompt(r.text) });
        aiCount += 1;
      } catch {
        updateNode(n.id, { mjPrompt: buildNodeMjPrompt(n, project) });
        offCount += 1;
      }
    }
    setAiNote(`완료 — AI ${aiCount}건, 오프라인 ${offCount}건`);
    setLoadingNode(false);
  };

  const copy = (text: string) => navigator.clipboard?.writeText(text);

  return (
    <div className="ins-mj">
      <section className="ins-mj-section">
        <header className="ins-mj-head">
          <h4>마스터 프롬프트</h4>
          <span className="caption">레벨 전체 무드보드 · 파라미터 포함</span>
        </header>
        <textarea
          className="ins-mj-textarea ins-mono"
          rows={6}
          value={masterPrompt}
          onChange={(e) => setMjMaster(e.target.value)}
          placeholder="Generate a master prompt..."
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
          <span className="caption">{node ? `${node.name} · 파라미터 포함` : '노드 선택 없음'}</span>
        </header>
        <textarea
          className="ins-mj-textarea ins-mono"
          rows={6}
          value={nodePrompt}
          onChange={(e) => node && updateNode(node.id, { mjPrompt: e.target.value })}
          placeholder="노드를 선택하면 표시됩니다."
          disabled={!node}
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
