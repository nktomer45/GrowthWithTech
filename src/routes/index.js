const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const chatController = require('../controllers/chatController');

router.get('/', homeController.getHomePage);
router.get('/services', homeController.getServicesPage);
router.get('/portfolio', homeController.getPortfolioPage);
router.get('/case-studies', homeController.getCaseStudiesPage);
router.get('/case-study/:id', homeController.getCaseStudyPage);
router.get('/about', homeController.getAboutPage);
router.get('/contact', homeController.getContactPage);
router.get('/offline', homeController.getOfflinePage);
router.post('/contact', homeController.postContactPage);

// New Sitemap Routes
router.get('/blog', homeController.getBlogPage);
router.get('/careers', homeController.getCareersPage);
router.get('/services/web-development', homeController.getServiceWebDev);
router.get('/services/ai-automation', homeController.getServiceAiAuto);
router.get('/services/graphic-design', homeController.getServiceDesign);
router.get('/services/seo-marketing', homeController.getServiceSeo);
router.get('/services/cloud-architecture', homeController.getServiceCloud);

// API Routes
router.post('/api/chat', chatController.handleChat);

// SEO & Indexing
router.get('/sitemap.xml', homeController.getSitemapXml);
router.get('/robots.txt', (req, res) => {
    res.sendFile(require('path').join(__dirname, '../public/robots.txt'));
});
router.get('/ai.txt', (req, res) => {
    res.sendFile(require('path').join(__dirname, '../public/ai.txt'));
});

module.exports = router;

