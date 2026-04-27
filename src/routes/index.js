const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.getHomePage);
router.get('/services', homeController.getServicesPage);
router.get('/portfolio', homeController.getPortfolioPage);
router.get('/case-studies', homeController.getCaseStudiesPage);
router.get('/case-study/:id', homeController.getCaseStudyPage);
router.get('/about', homeController.getAboutPage);
router.get('/contact', homeController.getContactPage);

// SEO & Indexing
router.get('/sitemap.xml', homeController.getSitemapXml);
router.get('/robots.txt', (req, res) => {
    res.sendFile(require('path').join(__dirname, '../public/robots.txt'));
});
router.get('/ai.txt', (req, res) => {
    res.sendFile(require('path').join(__dirname, '../public/ai.txt'));
});

module.exports = router;

