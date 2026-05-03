const nodemailer = require('nodemailer');

const projects = [
    {
        id: 'neural-support-agent',
        title: 'Neural Support Agent',
        client: 'FinEdge SaaS',
        category: 'AI',
        image: '/images/ai-chat.png',
        tech: ['LangGraph', 'OpenAI', 'Python', 'Redis'],
        description: 'Autonomous financial analysis system and support layer handling complex customer queries with stateful memory.',
        metrics: [
            { label: 'Resolution Time', value: '-71%' },
            { label: 'Human Handoffs', value: '-50%' },
            { label: 'CSAT Score', value: '4.8/5' }
        ],
        problem: 'FinEdge was scaling rapidly and their support volume was doubling every quarter, leading to increased burnout and wait times.',
        solution: 'We designed a multi-agent system using LangGraph that can autonomously handle account reconciliations and policy queries.',
        architecture: ['Multi-agent Orchestration', 'Stateful State Machine', 'Vector RAG with Hybrid Search']
    },
    {
        id: 'headless-commerce',
        title: 'Headless Commerce Relaunch',
        client: 'Lumen Apparel',
        category: 'E-commerce',
        image: '/images/ecommerce.png',
        tech: ['Shopify Hydrogen', 'Next.js 15', 'TypeScript', 'Tailwind'],
        description: 'Complete re-platforming and performance optimization for a high-volume global lifestyle brand.',
        metrics: [
            { label: 'LCP Performance', value: '1.1s' },
            { label: 'Conversion Rate', value: '+24%' },
            { label: 'Checkout Speed', value: '-40%' }
        ],
        problem: 'Lumen Apparel legacy architecture was causing 4s+ load times and high cart abandonment during peak drops.',
        solution: 'Migration to a headless architecture using Shopify Oxygen and Next.js, with edge-cached product data and custom checkout.',
        architecture: ['Headless Backend (Shopify)', 'Edge-Optimized Frontend', 'Global CDN Distribution']
    },
    {
        id: 'b2b-growth-engine',
        title: 'B2B Growth Engine',
        client: 'Northwind Cloud',
        category: 'Marketing',
        image: '/images/marketing.png',
        tech: ['TypeScript', 'GTM', 'PostHog', 'Airtable API'],
        description: 'Programmatic SEO and lead attribution engine that scaled inbound traffic by 4x in six months.',
        metrics: [
            { label: 'Inbound Leads', value: '4.2x' },
            { label: 'Landing Page Load', value: '0.8s' },
            { label: 'Cost Per Lead', value: '-35%' }
        ],
        problem: 'Northwind was struggling to attribute leads correctly across their complex B2B sales cycle.',
        solution: 'Implemented a custom lead capture and programmatic SEO engine that dynamically generates landing pages based on search intent.',
        architecture: ['Programmatic CMS Integration', 'Custom Attribution Engine', 'Automated Lead Qualification']
    },
    {
        id: 'multi-tenant-saas',
        title: 'Multi-Tenant SaaS Platform',
        client: 'ScaleForce',
        category: 'SaaS',
        image: '/images/ecommerce.png',
        tech: ['Node.js', 'PostgreSQL', 'Docker', 'AWS'],
        description: 'Engineering a robust multi-tenant architecture with isolated data layers and automatic provisioning for enterprise scale.',
        metrics: [
            { label: 'Tenant Isolation', value: '100%' },
            { label: 'Provisioning', value: 'Automated' },
            { label: 'Uptime', value: '99.99%' }
        ],
        problem: 'ScaleForce needed a way to onboard enterprise clients quickly without manual infrastructure setup.',
        solution: 'Built a dynamic orchestration layer that spins up isolated environments per tenant on AWS ECS.',
        architecture: ['Containerized Orchestration', 'Database Multi-tenancy', 'IAM Scoped Access']
    },
    {
        id: 'rag-knowledge-copilot',
        title: 'RAG Knowledge Copilot',
        client: 'LegalTech Corp',
        category: 'AI',
        image: '/images/ai-chat.png',
        tech: ['Pinecone', 'LangChain', 'Next.js', 'Azure AI'],
        description: 'Internal knowledge retrieval system for legal teams, reducing research time from hours to minutes.',
        metrics: [
            { label: 'Research Time', value: '-90%' },
            { label: 'Accuracy Rate', value: '96%' },
            { label: 'Document Sync', value: 'Real-time' }
        ],
        problem: 'Legal professionals spent excessive time manually searching through millions of case files.',
        solution: 'Developed a Retrieval-Augmented Generation (RAG) system with semantic search and citation verification.',
        architecture: ['Vector Embeddings', 'Hybrid Search Strategy', 'Citation Verification Layer']
    },
    {
        id: 'design-system-overhaul',
        title: 'Design System Overhaul',
        client: 'Global MedTech',
        category: 'Design',
        image: '/images/marketing.png',
        tech: ['Figma', 'React', 'Storybook', 'Tailwind'],
        description: 'Creating a unified, accessible design language implemented as a high-performance React component library.',
        metrics: [
            { label: 'Designer Speed', value: '2x' },
            { label: 'A11y Score', value: '100' },
            { label: 'Code Reuse', value: '85%' }
        ],
        problem: 'MedTech product teams were shipping inconsistent UIs, leading to high design debt and poor user experience.',
        solution: 'Established a "single source of truth" design token system and component library with 100% accessibility compliance.',
        architecture: ['Atomic Design Methodology', 'Token-based Theming', 'Automated A11y Testing']
    }
];

const services = [
    { title: 'Web Development', icon: 'code', description: 'Production-grade web apps with React, TypeScript, and edge-first infrastructure.' },
    { title: 'Digital Marketing', icon: 'chart-line', description: 'SEO, content systems, and analytics that compound traffic and conversion.' },
    { title: 'Paid Ads Management', icon: 'bullhorn', description: 'Performance campaigns across Google, Meta, and LinkedIn with full attribution.' },
    { title: 'UI/UX Design', icon: 'palette', description: 'Premium design systems and product flows engineered for clarity and conversion.' },
    { title: 'E-commerce Development', icon: 'shopping-cart', description: 'Headless storefronts on Shopify, Medusa, and custom stacks built to scale.' },
    { title: 'Agentic AI Solutions', icon: 'robot', description: 'Autonomous agents that plan, call tools, and ship measurable business outcomes.' },
    { title: 'LLM API Integrations', icon: 'plug', description: 'OpenAI, Anthropic, Gemini, and open models wired into your product securely.' },
    { title: 'Custom AI Chatbots', icon: 'comments', description: 'RAG-powered assistants tailored to your data, tone, and customer journey.' }
];

exports.getHomePage = (req, res) => {
    res.render('index', {
        title: 'GrowthWithTech | AI, Web & Growth Engineering Studio',
        seoDesc: 'GrowthWithTech is a senior engineering studio in Noida delivering AI agents, scalable web platforms, SEO, digital marketing, and growth systems. 25+ products shipped. 15+ clients worldwide.',
        pageUrl: '/',
        schemaType: 'WebPage',
        projects: projects.slice(0, 4),
        services: services
    });
};

exports.getPortfolioPage = (req, res) => {
    res.render('portfolio', {
        title: 'Portfolio | GrowthWithTech — AI, Web & Growth Projects',
        seoDesc: 'Explore GrowthWithTech\'s portfolio of AI systems, headless e-commerce builds, B2B growth engines, and SaaS platforms delivering real business outcomes.',
        pageUrl: '/portfolio',
        breadcrumbs: [
            { name: 'Home', url: 'https://growthwithtech.com/' },
            { name: 'Portfolio', url: 'https://growthwithtech.com/portfolio' }
        ],
        projects: projects
    });
};

exports.getCaseStudiesPage = (req, res) => {
    res.render('case-studies', {
        title: 'Case Studies | GrowthWithTech — Real Results, Real Engineering',
        seoDesc: 'In-depth engineering case studies from GrowthWithTech. See how we reduced resolution time by 71%, improved LCP to 1.1s, and scaled B2B inbound leads 4x.',
        pageUrl: '/case-studies',
        breadcrumbs: [
            { name: 'Home', url: 'https://growthwithtech.com/' },
            { name: 'Case Studies', url: 'https://growthwithtech.com/case-studies' }
        ],
        projects: projects
    });
};

exports.getCaseStudyPage = (req, res) => {
    const study = projects.find(p => p.id === req.params.id);
    if (!study) return res.status(404).render('404', { title: '404 | GrowthWithTech' });
    res.render('case-study', {
        title: `${study.title} | Case Study — GrowthWithTech`,
        seoDesc: study.description,
        pageUrl: `/case-study/${study.id}`,
        pageType: 'article',
        breadcrumbs: [
            { name: 'Home', url: 'https://growthwithtech.com/' },
            { name: 'Case Studies', url: 'https://growthwithtech.com/case-studies' },
            { name: study.title, url: `https://growthwithtech.com/case-study/${study.id}` }
        ],
        study: study
    });
};

exports.getAboutPage = (req, res) => {
    res.render('about', {
        title: 'About GrowthWithTech | Senior Engineering Studio in Noida',
        seoDesc: 'GrowthWithTech is a senior engineering studio founded in 2013. 5+ years experience, 25+ products shipped, 15+ clients served across AI, web, and growth engineering.',
        pageUrl: '/about',
        breadcrumbs: [
            { name: 'Home', url: 'https://growthwithtech.com/' },
            { name: 'About', url: 'https://growthwithtech.com/about' }
        ]
    });
};

exports.getServicesPage = (req, res) => {
    res.render('services', {
        title: 'Services | GrowthWithTech — Web Dev, AI, SEO & Digital Marketing',
        seoDesc: 'GrowthWithTech offers web development, AI solutions, SEO, digital marketing, paid ads management, mobile app development, e-commerce, and custom chatbots — all under one roof.',
        pageUrl: '/services',
        breadcrumbs: [
            { name: 'Home', url: 'https://growthwithtech.com/' },
            { name: 'Services', url: 'https://growthwithtech.com/services' }
        ],
        services: services
    });
};

exports.getContactPage = (req, res) => {
    // Optionally pre-select service based on plan
    const plan = req.query.plan;
    let selectedService = '';
    if(plan === 'starter') selectedService = 'Web Platform / Architecture';
    else if(plan === 'growth') selectedService = 'Growth & Analytics';
    else if(plan === 'custom') selectedService = 'AI / LLM Integration';

    res.render('contact', {
        title: 'Contact GrowthWithTech | Start Your Project Today',
        seoDesc: 'Get in touch with GrowthWithTech. Email info@growthwithtech.com or call +91 9667854160. Located at Gaur City Mall, Noida. We respond within 48 hours.',
        pageUrl: '/contact',
        breadcrumbs: [
            { name: 'Home', url: 'https://growthwithtech.com/' },
            { name: 'Contact', url: 'https://growthwithtech.com/contact' }
        ],
        selectedService: selectedService,
        successMessage: null,
        errorMessage: null
    });
};

exports.postContactPage = async (req, res) => {
    try {
        const { name, email, company, service, details } = req.body;

        // Create a transporter using SMTP settings from .env
        // If not set, it will fail gracefully or you can add dummy credentials
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: process.env.SMTP_PORT || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const mailOptions = {
            from: process.env.SMTP_USER || '"GrowthWithTech Website" <noreply@growthwithtech.com>',
            to: 'info@growthwithtech.com', // Send to user's requested email
            subject: `New Lead: ${service} from ${name}`,
            html: `
                <h3>New Project Inquiry from GrowthWithTech.com</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Company:</strong> ${company || 'N/A'}</p>
                <p><strong>Service Requested:</strong> ${service}</p>
                <p><strong>Project Details:</strong></p>
                <blockquote style="background:#f9f9f9; padding:15px; border-left:5px solid #ccc;">${details}</blockquote>
            `
        };

        // Only attempt to send if SMTP user is configured, otherwise simulate success
        if (process.env.SMTP_USER) {
            await transporter.sendMail(mailOptions);
        } else {
            console.log('--- Email Simulation (Configure SMTP in .env to send for real) ---');
            console.log(mailOptions);
        }

        // Render contact page with success message
        res.render('contact', {
            title: 'Message Sent | GrowthWithTech',
            seoDesc: 'Thank you for contacting GrowthWithTech.',
            pageUrl: '/contact',
            breadcrumbs: [
                { name: 'Home', url: 'https://growthwithtech.com/' },
                { name: 'Contact', url: 'https://growthwithtech.com/contact' }
            ],
            selectedService: '',
            successMessage: 'Thank you for reaching out! Your message has been sent successfully. We will get back to you within 48 hours.',
            errorMessage: null
        });

    } catch (error) {
        console.error('Email send error:', error);
        res.render('contact', {
            title: 'Error | GrowthWithTech',
            seoDesc: 'There was an error sending your message.',
            pageUrl: '/contact',
            breadcrumbs: [
                { name: 'Home', url: 'https://growthwithtech.com/' },
                { name: 'Contact', url: 'https://growthwithtech.com/contact' }
            ],
            selectedService: '',
            successMessage: null,
            errorMessage: 'There was a problem sending your message. Please try emailing us directly at info@growthwithtech.com.'
        });
    }
};

// --- NEW SITEMAP ROUTES ---

exports.getBlogPage = (req, res) => {
    res.render('generic-page', {
        title: 'Blog | GrowthWithTech Insights',
        seoDesc: 'Read the latest insights on AI, web development, SEO, and growth marketing from the engineering team at GrowthWithTech.',
        pageUrl: '/blog',
        pageTitle: 'Our Blog',
        pageSubtitle: 'Insights and engineering notes from our team.',
        breadcrumbs: [{ name: 'Home', url: 'https://growthwithtech.com/' }, { name: 'Blog', url: 'https://growthwithtech.com/blog' }]
    });
};

exports.getCareersPage = (req, res) => {
    res.render('generic-page', {
        title: 'Careers | Join GrowthWithTech',
        seoDesc: 'Join GrowthWithTech. We are looking for senior engineers, designers, and growth marketers who care about craft and outcomes.',
        pageUrl: '/careers',
        pageTitle: 'Join the Team',
        pageSubtitle: 'Build the next generation of intelligent products with us.',
        breadcrumbs: [{ name: 'Home', url: 'https://growthwithtech.com/' }, { name: 'Careers', url: 'https://growthwithtech.com/careers' }]
    });
};

exports.getServiceWebDev = (req, res) => {
    res.render('generic-page', {
        title: 'Web & Mobile Development | GrowthWithTech',
        seoDesc: 'High-performance web applications and mobile experiences built with modern stacks (React, Node, Next.js).',
        pageUrl: '/services/web-development',
        pageTitle: 'Web & Mobile Development',
        pageSubtitle: 'Scalable, performant, and accessible digital products.',
        breadcrumbs: [{ name: 'Home', url: 'https://growthwithtech.com/' }, { name: 'Services', url: 'https://growthwithtech.com/services' }, { name: 'Web & Mobile Dev', url: 'https://growthwithtech.com/services/web-development' }]
    });
};

exports.getServiceAiAuto = (req, res) => {
    res.render('generic-page', {
        title: 'AI & Automation | GrowthWithTech',
        seoDesc: 'Custom AI agents, LLM integrations, and process automations that save time and scale business operations.',
        pageUrl: '/services/ai-automation',
        pageTitle: 'AI & Automation',
        pageSubtitle: 'Agentic workflows and LLM integrations that drive real ROI.',
        breadcrumbs: [{ name: 'Home', url: 'https://growthwithtech.com/' }, { name: 'Services', url: 'https://growthwithtech.com/services' }, { name: 'AI & Automation', url: 'https://growthwithtech.com/services/ai-automation' }]
    });
};

exports.getServiceDesign = (req, res) => {
    res.render('generic-page', {
        title: 'Graphic Design & Branding | GrowthWithTech',
        seoDesc: 'Premium UI/UX design, brand identity, and design systems engineered for clarity and conversion.',
        pageUrl: '/services/graphic-design',
        pageTitle: 'Graphic Design & Branding',
        pageSubtitle: 'Premium design systems crafted for modern brands.',
        breadcrumbs: [{ name: 'Home', url: 'https://growthwithtech.com/' }, { name: 'Services', url: 'https://growthwithtech.com/services' }, { name: 'Design & Branding', url: 'https://growthwithtech.com/services/graphic-design' }]
    });
};

exports.getServiceSeo = (req, res) => {
    res.render('generic-page', {
        title: 'SEO & Digital Marketing | GrowthWithTech',
        seoDesc: 'Data-driven marketing, programmatic SEO, and paid ad management to scale your inbound lead generation.',
        pageUrl: '/services/seo-marketing',
        pageTitle: 'SEO & Digital Marketing',
        pageSubtitle: 'Data-driven growth engines and inbound marketing.',
        breadcrumbs: [{ name: 'Home', url: 'https://growthwithtech.com/' }, { name: 'Services', url: 'https://growthwithtech.com/services' }, { name: 'SEO & Marketing', url: 'https://growthwithtech.com/services/seo-marketing' }]
    });
};

exports.getServiceCloud = (req, res) => {
    res.render('generic-page', {
        title: 'Cloud Architecture & DevOps | GrowthWithTech',
        seoDesc: 'Robust cloud infrastructure, CI/CD pipelines, and DevOps consulting for secure, scalable software deployments.',
        pageUrl: '/services/cloud-architecture',
        pageTitle: 'Cloud Architecture & DevOps',
        pageSubtitle: 'Secure, scalable, and automated cloud infrastructure.',
        breadcrumbs: [{ name: 'Home', url: 'https://growthwithtech.com/' }, { name: 'Services', url: 'https://growthwithtech.com/services' }, { name: 'Cloud & DevOps', url: 'https://growthwithtech.com/services/cloud-architecture' }]
    });
};

exports.getSitemapXml = (req, res) => {
    const pages = [
        { url: '/',              priority: '1.0', freq: 'weekly'  },
        { url: '/services',      priority: '0.9', freq: 'monthly' },
        { url: '/services/web-development', priority: '0.8', freq: 'monthly' },
        { url: '/services/ai-automation', priority: '0.8', freq: 'monthly' },
        { url: '/services/graphic-design', priority: '0.8', freq: 'monthly' },
        { url: '/services/seo-marketing', priority: '0.8', freq: 'monthly' },
        { url: '/services/cloud-architecture', priority: '0.8', freq: 'monthly' },
        { url: '/portfolio',     priority: '0.8', freq: 'monthly' },
        { url: '/case-studies',  priority: '0.8', freq: 'monthly' },
        { url: '/about',         priority: '0.7', freq: 'monthly' },
        { url: '/blog',          priority: '0.7', freq: 'weekly'  },
        { url: '/careers',       priority: '0.5', freq: 'monthly' },
        { url: '/contact',       priority: '0.7', freq: 'monthly' },
        ...projects.map(p => ({
            url: `/case-study/${p.id}`,
            priority: '0.6',
            freq: 'yearly'
        }))
    ];

    const today = new Date().toISOString().split('T')[0];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>https://growthwithtech.com${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
};

exports.getOfflinePage = (req, res) => {
    res.render('offline', {
        title: 'Offline | GrowthWithTech',
        seoDesc: 'You are currently offline. GrowthWithTech is a senior engineering studio delivering AI agents and scalable web platforms.',
        pageUrl: '/offline'
    });
};

