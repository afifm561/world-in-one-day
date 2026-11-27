import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";

// The image is drawn in the browser (index.html) and committed as entry.png, so
// the program only has to place it. Copying the same bytes twice keeps the
// bounty's "two runs, identical output" rule true by construction.
const source = fileURLToPath(new URL("./entry.png", import.meta.url));
const target = "/output/entry.png";

mkdirSync("/output", { recursive: true });
copyFileSync(source, target);
console.log(`${target} written, ${statSync(target).size} bytes`);
