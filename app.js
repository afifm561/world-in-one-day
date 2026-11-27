import { edition, stories, briefs } from "./data.js";

const W = 1024;
const PAD = 40;
const CW = W - PAD * 2;

const PAPER = "#f6f0e5";
const INK = "#1a2430";
const SOFT = "#414a56";
const MUTED = "#7a7266";
const RED = "#a8332a";
const RULE = "#d3c9b8";

const canvas = document.getElementById("page");
const ctx = canvas.getContext("2d");

const serif = (size, weight = 700, style = "normal") =>
  `${style} ${weight} ${size}px Georgia, "Times New Roman", serif`;
const sans = (size, weight = 400) =>
  `${weight} ${size}px "Helvetica Neue", Helvetica, Arial, sans-serif`;

const all = [...stories, ...briefs].map((s, i) => ({ ...s, id: i + 1 }));
const lead = all[0];
const secondaries = all.slice(1, 4);
const cards = all.slice(4, 8);
const shortLines = all.slice(8);

const minutes = (s) => {
  const [h, m] = s.time.split(":").map(Number);
  return h * 60 + m;
};

function countBy(key) {
  const map = new Map();
  for (const s of all) map.set(s[key], (map.get(s[key]) || 0) + 1);
  return [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

const regions = countBy("region");
const fields = countBy("field");
const regionSummary = regions.map(([name, n]) => `${name} ${n}`).join(" · ");

// ---------- drawing helpers ----------

function rule(y, color = RULE, thickness = 1) {
  ctx.fillStyle = color;
  ctx.fillRect(PAD, y, CW, thickness);
}

function lines(text, font, maxW) {
  ctx.font = font;
  const out = [];
  let cur = "";
  for (const word of String(text).split(/\s+/)) {
    const next = cur ? `${cur} ${word}` : word;
    if (ctx.measureText(next).width > maxW && cur) {
      out.push(cur);
      cur = word;
    } else {
      cur = next;
    }
  }
  if (cur) out.push(cur);
  return out;
}

function fit(text, font, maxW, maxLines = 99) {
  const arr = lines(text, font, maxW);
  if (arr.length <= maxLines) return arr;
  const cut = arr.slice(0, maxLines);
  ctx.font = font;
  let last = cut[maxLines - 1];
  while (last.length > 1 && ctx.measureText(`${last}…`).width > maxW) last = last.slice(0, -1);
  cut[maxLines - 1] = `${last.replace(/[\s,;:]+$/, "")}…`;
  return cut;
}

function drawLines(arr, x, firstBaseline, font, color, lineHeight = 1.25, align = "left") {
  const size = Number(/(\d+(?:\.\d+)?)px/.exec(font)[1]);
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  arr.forEach((line, i) => ctx.fillText(line, x, firstBaseline + i * size * lineHeight));
  ctx.textAlign = "left";
}

function spaced(text, x, baseline, size, weight, color, tracking = 0, align = "left") {
  const font = sans(size, weight);
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = "left";
  const chars = [...String(text)];
  const widths = chars.map((ch) => ctx.measureText(ch).width);
  const total = widths.reduce((a, b) => a + b, 0) + tracking * Math.max(0, chars.length - 1);
  let cx = align === "right" ? x - total : align === "center" ? x - total / 2 : x;
  chars.forEach((ch, i) => {
    ctx.fillText(ch, cx, baseline);
    cx += widths[i] + tracking;
  });
  return total;
}

// Numbers identify a story everywhere: on the page, and on the clock below.
function pinLabel(n) {
  return String(n).padStart(2, "0");
}

// ---------- the day, as a clock ----------

function drawClock(cx, cy, r) {
  ctx.save();
  ctx.strokeStyle = "rgba(26,36,48,.30)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(26,36,48,.12)";
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.30, 0, Math.PI * 2);
  ctx.stroke();

  for (let h = 0; h < 24; h += 1) {
    const a = (h / 24) * Math.PI * 2 - Math.PI / 2;
    const major = h % 6 === 0;
    const r1 = r - (major ? 16 : 7);
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
    ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    ctx.strokeStyle = major ? "rgba(26,36,48,.55)" : "rgba(26,36,48,.22)";
    ctx.lineWidth = major ? 1.4 : 1;
    ctx.stroke();
  }

  ctx.font = sans(9.5, 600);
  ctx.fillStyle = MUTED;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const h of [0, 6, 12, 18]) {
    const a = (h / 24) * Math.PI * 2 - Math.PI / 2;
    ctx.fillText(String(h).padStart(2, "0"), cx + Math.cos(a) * (r - 29), cy + Math.sin(a) * (r - 29));
  }

  const byTime = [...all].sort((a, b) => minutes(a) - minutes(b));
  const placed = [];
  const clear = (x, y) => placed.every((p) => (p.x - x) ** 2 + (p.y - y) ** 2 > 20 ** 2);

  byTime.forEach((story, i) => {
    const a = (minutes(story) / 1440) * Math.PI * 2 - Math.PI / 2;
    let rr = r * (0.36 + 0.50 * (i / Math.max(1, byTime.length - 1)));
    let x = cx + Math.cos(a) * rr;
    let y = cy + Math.sin(a) * rr;
    let guard = 0;
    while (!clear(x, y) && guard < 40 && rr < r - 18) {
      rr += 2.5;
      x = cx + Math.cos(a) * rr;
      y = cy + Math.sin(a) * rr;
      guard += 1;
    }
    placed.push({ x, y });

    ctx.beginPath();
    ctx.arc(x, y, 9, 0, Math.PI * 2);
    ctx.fillStyle = story.lead ? RED : INK;
    ctx.fill();
    ctx.fillStyle = PAPER;
    ctx.font = sans(9, 700);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(story.id), x, y + 0.5);
  });

  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";
  ctx.restore();
}

// ---------- the page ----------

function storyBlock(story, x, width, y0) {
  spaced(`${pinLabel(story.id)} · ${story.region} · ${story.field} · ${story.time} UTC`.toUpperCase(), x, y0, 9.5, 700, RED, 1.4);
  drawLines(fit(story.headline, serif(18.5, 700), width, 2), x, y0 + 26, serif(18.5, 700), INK, 1.24);
  drawLines(fit(`${story.status} · ${story.region}`, sans(10, 500), width, 1), x, y0 + 74, sans(10, 500), MUTED, 1.2);
}

function card(story, x, width, y0) {
  ctx.fillStyle = RED;
  ctx.fillRect(x, y0 - 12, 26, 2);
  spaced(pinLabel(story.id), x, y0 + 8, 11, 700, RED, 1.2);
  spaced(story.time, x + width, y0 + 8, 9, 600, MUTED, 1.2, "right");
  drawLines(fit(story.headline, serif(15.5, 700), width, 3), x, y0 + 34, serif(15.5, 700), INK, 1.18);
  drawLines(fit(`${story.region} · ${story.status}`, sans(9, 500), width, 1), x, y0 + 92, sans(9, 500), MUTED, 1.2);
}

function briefLine(story, x, width, baseline) {
  const timeW = 44;
  const textW = width - timeW - 10;
  const label = fit(`${story.region} · ${story.headline}`, sans(10.5, 400), textW, 1)[0];
  ctx.fillStyle = INK;
  ctx.textAlign = "left";
  ctx.fillText(label, x, baseline);
  ctx.fillStyle = MUTED;
  ctx.textAlign = "right";
  ctx.font = sans(9.5, 500);
  ctx.fillText(story.time, x + width, baseline);
  ctx.textAlign = "left";
}

function draw() {
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, W);
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";

  ctx.fillStyle = RED;
  ctx.fillRect(0, 0, W, 6);

  // strip
  spaced(edition.note.toUpperCase(), PAD, 42, 8.5, 500, MUTED, 1.4);
  spaced(`No. ${edition.number}`, W - PAD, 42, 8.5, 500, MUTED, 1.4, "right");
  rule(56, INK, 2);

  // masthead
  ctx.font = serif(40, 700);
  ctx.fillStyle = INK;
  ctx.textAlign = "center";
  ctx.fillText(edition.name, W / 2, 100);
  ctx.textAlign = "left";
  rule(112, RULE, 1);
  rule(118, INK, 2);

  // date and coverage
  spaced(edition.weekday.toUpperCase(), PAD, 148, 10.5, 700, RED, 2.4);
  ctx.font = serif(45, 700);
  ctx.fillStyle = INK;
  ctx.fillText(edition.date, PAD, 196);
  ctx.font = sans(11.5, 400);
  ctx.fillStyle = MUTED;
  ctx.fillText(
    `${all.length} stories · ${regions.length} regions · ${fields.length} fields · every time UTC`,
    PAD,
    216,
  );

  spaced("COVERAGE", 584, 148, 9, 700, MUTED, 1.8);
  drawLines(fit(regionSummary, sans(11, 500), 400, 2), 584, 172, sans(11, 500), SOFT, 1.55);
  rule(230, RULE, 1);

  // lead
  spaced(
    `${pinLabel(lead.id)} · ${lead.region} · ${lead.field} · ${lead.time} UTC · ${lead.status}`.toUpperCase(),
    PAD,
    262,
    10,
    700,
    RED,
    1.6,
  );
  drawLines(fit(lead.headline, serif(31, 700), CW, 2), PAD, 300, serif(31, 700), INK, 1.22);
  drawLines(fit(lead.deck, sans(13.5), 880, 2), PAD, 370, sans(13.5), SOFT, 1.5);
  rule(406, RULE, 1);

  // second tier
  secondaries.forEach((story, i) => storyBlock(story, PAD, 512, 432 + i * 94));

  // clock + caption
  ctx.fillStyle = RULE;
  ctx.fillRect(566, 416, 1, 284);
  drawClock(785, 532, 120);
  ctx.font = sans(9.5, 500);
  ctx.fillStyle = MUTED;
  ctx.textAlign = "center";
  ctx.fillText(`${all.length} stories, each on the hour it broke · UTC`, 785, 684);
  ctx.textAlign = "left";
  rule(710, RULE, 1);

  // cards
  const cardW = (CW - 3 * 16) / 4;
  cards.forEach((story, i) => card(story, PAD + i * (cardW + 16), cardW, 730));
  rule(834, RULE, 1);

  // briefs
  spaced("ALSO ON THE DAY", PAD, 856, 9.5, 700, RED, 1.8);
  spaced("EVERY ONE DATED", W - PAD, 856, 9, 600, MUTED, 1.6, "right");
  const colW = (CW - 20) / 2;
  shortLines.forEach((story, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    briefLine(story, PAD + col * (colW + 20), colW, 882 + row * 26);
  });
  rule(968, RULE, 1);

  // footer
  ctx.font = sans(8.5, 400);
  ctx.fillStyle = MUTED;
  ctx.textAlign = "left";
  ctx.fillText(`Edition ${edition.number} · ${edition.date} · all times UTC`, PAD, 986);
  ctx.textAlign = "right";
  ctx.fillText("A synthetic digest drawn for a design exercise. Not reporting.", W - PAD, 986);
  ctx.textAlign = "left";
}

draw();

document.getElementById("save").addEventListener("click", () => {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "entry.png";
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 4000);
  }, "image/png");
});
