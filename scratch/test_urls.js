const http = require('http');

const urls = [
  '/',
  '/offline',
  '/css/main.css',
  '/js/animations.js',
  '/images/growthwithtech.png',
  '/manifest.json'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${url}`, (res) => {
      console.log(`${url}: ${res.statusCode}`);
      resolve(res.statusCode);
    }).on('error', (err) => {
      console.log(`${url}: ERROR - ${err.message}`);
      resolve(500);
    });
  });
}

(async () => {
  for (const url of urls) {
    await checkUrl(url);
  }
})();
