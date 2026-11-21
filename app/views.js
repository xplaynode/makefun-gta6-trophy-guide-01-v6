// Leonida Night Ledger v6 — the Roadmap, Missables and Sources & Save views.
// Rendered from the same data files as the guide, so every number matches the audit strip.
'use strict';
function vEsc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function vCites(arr) { return ' <span class="cite">[' + (arr || []).map(n => { const s = META.sources.find(x => x.n === n); return 'S' + n + ' ' + (s ? s.name.split(' — ')[0] : ''); }).join('; ') + ']</span>'; }
function bars(counts) {
  const max = Math.max.apply(null, Object.values(counts).concat([1]));
  return Object.keys(counts).map(k => '<p style="margin:4px 0">' + vEsc(k) + ': <b>' + counts[k] + '</b></p><div class="bar"><div style="width:' + (counts[k] / max * 100) + '%"></div></div>').join('');
}
window.renderViews = function () {
  // Roadmap — six stages, headline claims each cited.
  let h = '<div class="card"><h2>Roadmap to the platinum — six stages</h2>';
  h += '<h3>Headline claims, each cited</h3><table><tr><th>Claim</th><th>Value</th><th>Sources</th></tr>';
  for (const c of META.roadmapClaims) h += '<tr><td>' + vEsc(c.claim) + (c.note ? '<br><i>' + vEsc(c.note) + '</i>' : '') + '</td><td><b>' + vEsc(c.value) + '</b></td><td>' + vCites(c.c) + (c.cAlt ? ' dissent' + vCites(c.cAlt) : '') + '</td></tr>';
  h += '</table>';
  for (const s of META.stages) h += '<div class="box"><h3>' + vEsc(s.name) + ' — ' + vEsc(s.hours) + '</h3><p>' + vEsc(s.text) + vCites(s.c) + '</p></div>';
  h += '<h3>Missable watch rail</h3><ul>' + META.watchList.map(w => '<li><b>' + vEsc(w.name) + '</b> — ' + vEsc(w.why) + vCites(w.c) + '</li>').join('') + '</ul></div>';
  document.getElementById('view-roadmap').innerHTML = h;

  // Missables — chapter-window grid plus the point-of-no-return timeline in chapter order.
  const chapters = ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Post'];
  let m = '<div class="card"><h2>Missables &amp; points of no return</h2>';
  m += '<p>One trophy is <b>possibly missable</b>: <b>Positive Mental Attitude</b> — its Chapter 1 balcony meditation may close at the end of Chapter 1' + vCites([1, 13]) + '. Everything else stays open in post-story free roam' + vCites([1, 3]) + '.</p>';
  m += '<h3>Chapter-window grid</h3><div class="grid">' + chapters.map((c, i) => '<div class="' + (i === 0 ? 'last' : '') + '"><b>' + c + '</b><br>' + (i === 0 ? 'Balcony meditation LAST CHANCE here' : i === 5 ? 'Free roam — nothing closes' : 'Nothing trophy-related closes') + '</div>').join('') + '</div>';
  m += '<h3>Story gates in chapter order</h3><table><tr><th>Window</th><th>What closes / opens</th><th>Locks at</th><th>Sources</th></tr>';
  for (const r of META.timeline) m += '<tr><td>' + vEsc(r.window) + '</td><td>' + vEsc(r.closes) + '</td><td>' + vEsc(r.locksAt) + '</td><td>' + vCites(r.c) + '</td></tr>';
  m += '</table><h3>Watch list</h3><ul>' + META.watchList.map(w => '<li><b>' + vEsc(w.name) + '</b> — ' + vEsc(w.why) + vCites(w.c) + '</li>').join('') + '</ul></div>';
  document.getElementById('view-missables').innerHTML = m;

  // Sources & Save — registry, disagreements register, progress bars, saved-state panel.
  const byGrade = {}, byKind = {};
  for (const t of TROPHIES) if (state.earned[t.name]) { byGrade[t.grade] = (byGrade[t.grade] || 0) + 1; byKind[t.kind] = (byKind[t.kind] || 0) + 1; }
  let s = '<div class="card"><h2>Sources &amp; Save</h2>';
  s += '<h3>Saved state</h3><p>Stored in this browser under localStorage key <b>leonida-night-ledger-v6</b>: earned flags, YOUR COUNT counters and the spoiler-shield setting. Export file: <b>leonida-night-ledger-save.json</b>.' + (state.lastImport ? ' Last import: <b>' + vEsc(state.lastImport) + '</b>.' : ' No import yet this ledger.') + ' Spoiler shield is ' + (state.spoiler ? '<b>ON</b>' : '<b>OFF</b>') + '.</p>';
  s += '<pre>' + vEsc(JSON.stringify(state, null, 2)).slice(0, 900) + '</pre>';
  s += '<h3>Earned by grade</h3>' + bars(byGrade) + '<h3>Earned by kind</h3>' + bars(byKind);
  s += '<h3>Source registry — ' + META.sources.length + ' sources read ' + vEsc(META.readDate) + '</h3><table><tr><th>#</th><th>Source</th><th>Scope</th><th>Independence</th><th>Used for</th></tr>';
  for (const src of META.sources) s += '<tr><td>S' + src.n + '</td><td>' + vEsc(src.name) + '<br><span class="cite">' + vEsc(src.url) + '</span></td><td>' + vEsc(src.scope) + '</td><td>' + vEsc(src.independence) + '</td><td>' + vEsc(src.usedFor) + '</td></tr>';
  s += '</table><h3>Disagreements register — ' + DISPUTES.length + ' shown both ways</h3>';
  for (const d of DISPUTES) s += '<div class="box diffbox"><h3>' + vEsc(d.trophy) + ' — ' + vEsc(d.topic) + '</h3><p><b>A:</b> ' + vEsc(d.a) + vCites(d.aSrc) + '<br><b>B:</b> ' + vEsc(d.b) + vCites(d.bSrc) + '<br><b>' + vEsc(d.call) + '</b></p></div>';
  s += '</div>';
  document.getElementById('view-sources').innerHTML = s;
};
