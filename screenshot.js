const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  
  // Create an artifact for the full page screenshot
  // Let the system write it out
  console.log('Taking full page screenshot...');
  await page.screenshot({ path: 'local_ui.png', fullPage: true });

  await browser.close();
  console.log('Screenshot saved to local_ui.png');
})();
