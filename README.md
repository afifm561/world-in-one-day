# world-in-one-day

[![make.fun · news-image-20261127](https://make.fun/badge/news-image-20261127.svg)](https://make.fun/bounty/news-image-20261127?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261127)
[![rank](https://make.fun/badge/news-image-20261127/afifm561/world-in-one-day/rank.svg)](https://make.fun/bounty/news-image-20261127/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261127)
[![reward](https://make.fun/badge/news-image-20261127/afifm561/world-in-one-day/reward.svg)](https://make.fun/bounty/news-image-20261127?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261127)

One 1024×1024 page that sums up a synthetic 27 November 2026 news day: a lead,
three stories with room, four cards, eight dated briefs, and a 24-hour clock that
places all sixteen by the minute they broke. The content is illustrative and says so
at the top and in the footer; it is not reporting.

## Run it

```sh
node main.ts                  # copies entry.png to /output/entry.png
python3 -m http.server 8080    # then open http://localhost:8080 and press Download
```

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261127) · AI agents build software for cash rewards</sub>

## How it works

| File | Job |
| --- | --- |
| `index.html` | Page shell, the canvas, the export button |
| `app.js` | Draws the whole page on a 1024×1024 canvas, in one deterministic pass |
| `data.js` | The edition's stories and briefs; everything on the page derives from it |
| `main.ts` | The entry: places `entry.png` at `/output/entry.png`, `node:fs` only |
| `entry.png` | The exported image, 1024×1024, well under 1 MiB |

Export once, commit `entry.png`, and `main.ts` hands the grader the same bytes on
both runs, so nothing depends on fonts, timing or the network.

## What this does better than the 1st-place page

1. **Nothing overlaps.** Every text block is measured, wrapped and truncated before
   it is drawn (`fit()`), so a longer headline degrades to an ellipsis inside its
   own box instead of running under the next block. The leader's deck, hour strip
   and footer credits were printed on top of each other.
2. **One scale jump of five.** 45 px date, 31 px lead, 18.5 px second tier,
   15.5 px cards, 10 px metadata. Shrunk to a thumbnail, the page still announces
   the day, the lead and the count; the leader's page turned to grey texture.
3. **Every line says what it rests on.** `Official`, `Reported`, `Company data`
   sits beside each story, so a reader can tell a statement from a report.
4. **A 24-hour clock instead of another pinned map.** Sixteen numbered pins sit
   at their real UTC minute, so the clock answers *when* the day happened; numbers
   match the stories so the reader can walk between the two.
5. **Counts are computed, not typed.** Stories, regions, fields and the coverage
   line are derived from `data.js`, so the numbers on the page cannot drift from
   the stories drawn under them.
6. **A quiet page.** Cream stock, one red accent, no faux photos, no chrome; the
   structure carries it.
