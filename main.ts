// Two-Sentence Horror — make.fun entry
// u-suroto-two-sentence-horror-acea9253
//
// Writes exactly one horror story of exactly two sentences (<= 400 chars)
// to /output/entry.txt.
//
// Story (177 characters, exactly two sentences):
// "The census form arrived addressed to me, listing every person who has ever
//  lived in this house. The last name on the list is mine — and it is crossed
//  out, in my own handwriting."
//
// Why this one: the first sentence is dull bureaucracy; the second sentence
// reframes it — the narrator is already erased from the record of their own
// house, crossed out in their own hand. The horror is implied, never
// explained: dead, replaced, or never existed at all. No baby monitor, no
// mirror, no voicemail, no photo, no knocking, no letter, no teeth — none of
// the tropes flooding the 417-entry field.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const STORY =
  "The census form arrived addressed to me, listing every person who has ever lived in this house. " +
  "The last name on the list is mine — and it is crossed out, in my own handwriting.";

const OUT = "/output/entry.txt";

const sentences = STORY.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);
if (sentences.length !== 2) {
  throw new Error(`expected exactly 2 sentences, got ${sentences.length}`);
}
if (STORY.length === 0 || STORY.length > 400) {
  throw new Error(`expected 1-400 characters, got ${STORY.length}`);
}

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, STORY, "utf8");

// Read back and confirm the file is byte-identical to the story:
// the gate counts every character, so no trailing newline is allowed.
const written = await readFile(OUT, "utf8");
if (written !== STORY) {
  throw new Error("entry.txt does not match the story byte for byte");
}
console.log(`wrote ${STORY.length} characters, ${sentences.length} sentences to ${OUT}`);
