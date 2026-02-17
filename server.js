const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Trust proxy to get real IP addresses (important for Render/Vercel)
app.set('trust proxy', true);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Visitor Schema - Now tracks unique IPs
const visitorSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true,
        unique: true
    },
    firstVisit: {
        type: Date,
        default: Date.now
    },
    lastVisit: {
        type: Date,
        default: Date.now
    },
    visitCount: {
        type: Number,
        default: 1
    }
});

const Visitor = mongoose.model('Visitor', visitorSchema);

// Counter Schema - Stores total unique visitors count
const counterSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'visitors'
    },
    count: {
        type: Number,
        default: 0
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

const Counter = mongoose.model('Counter', counterSchema);

// Suggestion Schema
const suggestionSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Anonymous'
    },
    email: {
        type: String,
        default: 'Not provided'
    },
    suggestion: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema);

// Initialize counter if it doesn't exist
const initializeCounter = async () => {
    try {
        const counter = await Counter.findOne({ name: 'visitors' });
        if (!counter) {
            await Counter.create({ name: 'visitors', count: 0 });
            console.log('✅ Visitor counter initialized');
        }
    } catch (error) {
        console.error('Error initializing counter:', error);
    }
};

initializeCounter();

// Helper function to get client IP
const getClientIP = (req) => {
    // Try to get IP from various headers (for proxies, load balancers, etc.)
    const forwarded = req.headers['x-forwarded-for'];
    const real = req.headers['x-real-ip'];
    const ip = forwarded ? forwarded.split(',')[0].trim() : 
               real || 
               req.connection.remoteAddress || 
               req.socket.remoteAddress;
    
    // Clean up IP (remove IPv6 prefix if present)
    return ip.replace(/^::ffff:/, '');
};

// API Routes

// Get total unique visitor count
app.get('/api/visitors', async (req, res) => {
    try {
        const counter = await Counter.findOne({ name: 'visitors' });
        res.json({ count: counter ? counter.count : 0 });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching visitor count' });
    }
});

// Increment visitor count (only if new IP)
app.post('/api/visitors/increment', async (req, res) => {
    try {
        const clientIP = getClientIP(req);
        console.log(`📍 Visitor from IP: ${clientIP}`);
        
        // Check if this IP has visited before
        let visitor = await Visitor.findOne({ ip: clientIP });
        
        if (!visitor) {
            // New unique visitor
            visitor = await Visitor.create({ 
                ip: clientIP,
                firstVisit: new Date(),
                lastVisit: new Date(),
                visitCount: 1
            });
            
            // Increment the total counter
            let counter = await Counter.findOne({ name: 'visitors' });
            if (!counter) {
                counter = await Counter.create({ name: 'visitors', count: 1 });
            } else {
                counter.count += 1;
                counter.lastUpdated = new Date();
                await counter.save();
            }
            
            console.log(`✨ New unique visitor! Total: ${counter.count}`);
            
            res.json({ 
                count: counter.count,
                message: 'New unique visitor counted',
                isNewVisitor: true
            });
        } else {
            // Existing visitor - just update last visit time
            visitor.lastVisit = new Date();
            visitor.visitCount += 1;
            await visitor.save();
            
            const counter = await Counter.findOne({ name: 'visitors' });
            
            console.log(`👋 Returning visitor from IP: ${clientIP}`);
            
            res.json({ 
                count: counter ? counter.count : 0,
                message: 'Returning visitor - count not incremented',
                isNewVisitor: false
            });
        }
    } catch (error) {
        console.error('Error incrementing visitor count:', error);
        res.status(500).json({ error: 'Error incrementing visitor count' });
    }
});

// Get visitor statistics (admin/debug endpoint)
app.get('/api/visitors/stats', async (req, res) => {
    try {
        const totalUnique = await Visitor.countDocuments();
        const counter = await Counter.findOne({ name: 'visitors' });
        const recentVisitors = await Visitor.find()
            .sort({ lastVisit: -1 })
            .limit(10)
            .select('-ip'); // Don't expose IPs publicly
        
        res.json({
            totalUniqueVisitors: totalUnique,
            counterValue: counter ? counter.count : 0,
            recentVisits: recentVisitors.length
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching stats' });
    }
});

// Submit suggestion
app.post('/api/suggestions', async (req, res) => {
    try {
        const { name, email, suggestion } = req.body;
        
        if (!suggestion || !suggestion.trim()) {
            return res.status(400).json({ error: 'Suggestion is required' });
        }

        const newSuggestion = await Suggestion.create({
            name: name || 'Anonymous',
            email: email || 'Not provided',
            suggestion: suggestion.trim()
        });

        console.log('📝 New suggestion received:', {
            name: newSuggestion.name,
            suggestion: newSuggestion.suggestion
        });

        res.json({ 
            success: true,
            message: 'Suggestion submitted successfully',
            data: newSuggestion
        });
    } catch (error) {
        console.error('Error submitting suggestion:', error);
        res.status(500).json({ error: 'Error submitting suggestion' });
    }
});

// Get all suggestions (for admin)
app.get('/api/suggestions', async (req, res) => {
    try {
        const suggestions = await Suggestion.find().sort({ createdAt: -1 });
        res.json({ 
            count: suggestions.length,
            suggestions 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching suggestions' });
    }
});

// Reset visitor count (for testing purposes)
app.post('/api/visitors/reset', async (req, res) => {
    try {
        // Reset counter
        await Counter.findOneAndUpdate(
            { name: 'visitors' }, 
            { count: 0, lastUpdated: new Date() }
        );
        
        // Delete all visitor records
        await Visitor.deleteMany({});
        
        res.json({ message: 'Visitor count and records reset successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error resetting visitor count' });
    }
});

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 API endpoint: http://localhost:${PORT}/api`);
});
