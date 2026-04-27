const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  
  // Force all reveal elements to be visible for the screenshot
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.innerHTML = '.reveal { opacity: 1 !important; transform: none !important; }';
    document.head.appendChild(style);
  });
  
  console.log('Taking full page screenshot...');
  await page.screenshot({ path: 'local_ui_rendered.png', fullPage: true });

  await browser.close();
  console.log('Screenshot saved to local_ui_rendered.png');
})();
