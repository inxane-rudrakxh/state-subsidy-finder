import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemesFile = fs.readFileSync(path.join(__dirname, '../src/data/schemes.ts'), 'utf8');

// Extract all ALL_STATES from the file. There is a line:
// export const ALL_STATES = Array.from(new Set(SCHEMES.map((s) => s.state))).sort();
// Wait, we can just extract the states from STATE_INFO keys
const stateMatches = [...schemesFile.matchAll(/  "?(.*?)"?: \{/g)];
const states = stateMatches.map(m => m[1]).filter(s => s && s !== 'name' && s !== 'capital' && s !== 'industries' && s !== 'blurb');

// Extract scheme IDs. They are generated via `id: ${state.toLowerCase().replace(/\s+/g, "-")}-${i + 1}`
// Or I can just match all `name: "(.*?)"` inside `make("State", [ ... ])` blocks.
const makeBlocks = [...schemesFile.matchAll(/make\("(.*?)", \[([\s\S]*?)\]\)/g)];

const schemes = [];
makeBlocks.forEach(block => {
  const state = block[1];
  const itemsStr = block[2];
  const items = [...itemsStr.matchAll(/\{ name: "(.*?)"/g)];
  items.forEach((item, i) => {
    schemes.push(`${state.toLowerCase().replace(/\s+/g, "-")}-${i + 1}`);
  });
});

const baseUrl = "https://find-my-subsidy.vercel.app";

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/explore</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
`;

// Only unique states
const uniqueStates = [...new Set(states)].filter(s => !['ALL_CATEGORIES', 'ALL_STATES'].includes(s));

uniqueStates.forEach((state) => {
  const slug = state.toLowerCase().replace(/\s+/g, "-");
  sitemap += `  <url>
    <loc>${baseUrl}/state/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
});

schemes.forEach((id) => {
  sitemap += `  <url>
    <loc>${baseUrl}/scheme/${id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
});

sitemap += `</urlset>`;

fs.mkdirSync(path.join(__dirname, '../public'), { recursive: true });
fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
console.log('✅ Generated public/sitemap.xml');

const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
fs.writeFileSync(path.join(__dirname, '../public/robots.txt'), robots);
console.log('✅ Generated public/robots.txt');
