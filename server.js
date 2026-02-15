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
        res.status(500).json({ error: 'Error incrementing visitor count' });
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
