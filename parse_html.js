const jsdom = require("jsdom");
const fs = require("fs");
const { JSDOM } = jsdom;

const html = fs.readFileSync('lovable_html.txt', 'utf-8');
const dom = new JSDOM(html);
const document = dom.window.document;

function printElement(el, depth = 0) {
  if (!el) return;
  const indent = '  '.repeat(depth);
  const tag = el.tagName ? el.tagName.toLowerCase() : '';
  const classes = el.className || '';
  const text = el.childNodes.length === 1 && el.firstChild.nodeType === 3 ? el.textContent.trim().substring(0, 50) : '';
  
  if (tag) console.log(`${indent}<${tag} class="${classes}">${text ? ' ' + text : ''}`);
  
  if (depth < 6) { // limit depth to avoid massive logs
      for (const child of el.children) {
        printElement(child, depth + 1);
      }
  }
}

// Nav
console.log("=== NAV ===");
printElement(document.querySelector('nav'));

// Hero
console.log("\n=== HERO ===");
printElement(document.querySelector('h1')?.closest('section') || document.querySelector('h1')?.parentNode);

// Stats section
console.log("\n=== STATS ===");
const h2s = document.querySelectorAll('h2');
h2s.forEach(h2 => {
    if (h2.textContent.includes('70+')) {
        printElement(h2.closest('div'));
    }
});

// Services / cards
console.log("\n=== SERVICES CARDS ===");
const section = document.querySelectorAll('section')[1];
if (section) printElement(section, 1);

