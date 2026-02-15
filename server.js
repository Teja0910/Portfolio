const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Visitor Schema
const visitorSchema = new mongoose.Schema({
    count: {
        type: Number,
        default: 0
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

const Visitor = mongoose.model('Visitor', visitorSchema);

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

// Initialize visitor counter if it doesn't exist
const initializeVisitorCounter = async () => {
    try {
        const counter = await Visitor.findOne();
        if (!counter) {
            await Visitor.create({ count: 0 });
            console.log('✅ Visitor counter initialized');
        }
    } catch (error) {
        console.error('Error initializing visitor counter:', error);
    }
};

initializeVisitorCounter();

// API Routes

// Get visitor count
app.get('/api/visitors', async (req, res) => {
    try {
        const visitor = await Visitor.findOne();
        res.json({ count: visitor ? visitor.count : 0 });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching visitor count' });
    }
});

// Increment visitor count
app.post('/api/visitors/increment', async (req, res) => {
    try {
        let visitor = await Visitor.findOne();
        
        if (!visitor) {
            visitor = await Visitor.create({ count: 1 });
        } else {
            visitor.count += 1;
            visitor.lastUpdated = Date.now();
            await visitor.save();
        }
        
        res.json({ 
            count: visitor.count,
            message: 'Visitor count incremented successfully' 
        });
    } catch (error) {
        console.error('Error incrementing visitor count:', error);
        res.status(500).json({ error: 'Error incrementing visitor count' });
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
        await Visitor.findOneAndUpdate({}, { count: 0, lastUpdated: Date.now() });
        res.json({ message: 'Visitor count reset successfully' });
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
