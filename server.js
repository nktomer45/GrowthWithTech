const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disabled to allow external fonts/images and inline scripts/styles in EJS
}));

// Rate Limiting (Prevents DDoS and brute force)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === 'production' ? 100 : 2000, // Limit each IP to 100 in production, 2000 in dev
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Static Files
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(express.json({ limit: '10kb' })); // Limit body payload to prevent DoS
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Routes
const indexRouter = require('./src/routes/index');
app.use('/', indexRouter);

// 404 Handler
app.use((req, res) => {
    res.status(404).render('404', { title: '404 - Page Not Found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
