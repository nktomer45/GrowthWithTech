const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://id-preview--4c6a3001-8aca-4cd1-9399-feb9eb89cf57.lovable.app/', { waitUntil: 'networkidle2' });
  const html = await page.content();
  fs.writeFileSync('lovable_html.txt', html);
  await browser.close();
})();
