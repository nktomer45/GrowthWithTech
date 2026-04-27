const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  
  const urls = [
    { name: 'home', url: 'http://localhost:3000/' },
    { name: 'services', url: 'http://localhost:3000/services' },
    { name: 'portfolio', url: 'http://localhost:3000/portfolio' },
    { name: 'case-studies', url: 'http://localhost:3000/case-studies' },
    { name: 'case-study', url: 'http://localhost:3000/case-study/neural-support-agent' },
    { name: 'about', url: 'http://localhost:3000/about' },
    { name: 'contact', url: 'http://localhost:3000/contact' }
  ];

  for (const item of urls) {
    console.log(`Taking mobile screenshot for ${item.name}...`);
    await page.goto(item.url, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: `local_ui_mobile_${item.name}.png`, fullPage: true });
  }

  await browser.close();
  console.log('All screenshots saved.');
})();
