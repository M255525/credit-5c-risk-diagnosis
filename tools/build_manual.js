// node tools/build_manual.js —— 由 data.js 與 manual_body.html 產生 manual.html
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
global.window = {};
eval(fs.readFileSync(path.join(root, 'data.js'), 'utf8'));
const D = global.window.C5;
const esc = s => String(s).replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const cn = {cap:'能力', capi:'資本', cond:'條件', char:'品格', coll:'擔保品'};
const unit = r => r.u === '%' ? '%' : r.u === 'x' ? ' 倍' : r.u === '天' ? ' 天' : '';
const ratios = D.RATIOS.map(r => `<tr><td><b>${esc(r.n)}</b>（${cn[r.c]}）<br><small>${esc(r.why)}</small></td><td>${esc(r.f)}</td><td>${r.pts ? (r.dir > 0 ? '≥ ' : '≤ ') + r.pts[2] + unit(r) + '／' + (r.dir > 0 ? '< ' : '> ') + r.pts[1] + unit(r) : '≥ 0 為佳'}</td></tr>`).join('\n');
const avoid = D.AVOID.map(a => `<li><b>${esc(a.t)}</b>（${cn[a.c]}）——自動偵測：${esc(a.d)}</li>`).join('\n');
const tpl = fs.readFileSync(path.join(root, '..', '..', '互動遊戲', 'taiwan-bird-atlas', 'tools', 'manual_tpl.html'), 'utf8');
const m = tpl.match(/<section id="creator">[\s\S]*?<\/section>/);
if (!m) throw new Error('creator section not found');
let out = fs.readFileSync(path.join(__dirname, 'manual_body.html'), 'utf8')
  .replace('{{RATIOS}}', ratios).replace('{{AVOID}}', avoid).replace('{{CREATOR}}', m[0]);
fs.writeFileSync(path.join(root, 'manual.html'), out);
console.log('manual.html written', out.length);
