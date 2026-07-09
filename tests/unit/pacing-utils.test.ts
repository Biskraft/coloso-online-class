import assert from 'node:assert';
import { segmentBounds, globalX, monotoneCubic, hintForTension } from '../../src/components/pacing/pacing-utils';

// segmentBounds: width 비례 경계
const segs = [{ id: 'a', name: '', width: 1 }, { id: 'b', name: '', width: 3 }];
const b = segmentBounds(segs);
assert.strictEqual(b[0].x0, 0);
assert.ok(Math.abs(b[0].x1 - 0.25) < 1e-9, 'a는 1/4');
assert.ok(Math.abs(b[1].x0 - 0.25) < 1e-9);
assert.ok(Math.abs(b[1].x1 - 1) < 1e-9);

// globalX: b 구간 중앙 t=0.5 → 0.25 + 0.75*0.5 = 0.625
assert.ok(Math.abs(globalX('b', 0.5, segs) - 0.625) < 1e-9);

// monotoneCubic: 표본 통과 + 단조 구간 오버슈트 없음
const f = monotoneCubic([{ x: 0, tension: 10 }, { x: 0.5, tension: 50 }, { x: 1, tension: 90 }]);
assert.ok(Math.abs(f(0) - 10) < 1e-6 && Math.abs(f(1) - 90) < 1e-6, '끝점 통과');
for (let x = 0; x <= 1; x += 0.05) { const v = f(x); assert.ok(v >= 9.9 && v <= 90.1, '단조 범위 내 오버슈트 없음'); }

// 빈 표본 → 상수 50
assert.strictEqual(monotoneCubic([])(0.3), 50);

// hintForTension 밴드
assert.strictEqual(hintForTension(20).band, '아늑');
assert.strictEqual(hintForTension(50).band, '상승');
assert.strictEqual(hintForTension(80).band, '간극');

console.log('pacing-utils: 모든 assert 통과');
