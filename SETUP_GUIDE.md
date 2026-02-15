# 🎬 Netflix Portfolio - Complete Setup Guide

## Quick Overview
This is a full MERN stack portfolio website with:
- ✅ React frontend with Netflix theme
- ✅ Node.js + Express backend
- ✅ MongoDB database for visitor tracking
- ✅ Real-time visitor counter

---

## 📋 Prerequisites

Before you begin, make sure you have:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version`

2. **MongoDB** (Choose one option):
   - **Option A**: Local MongoDB
     - Download from: https://www.mongodb.com/try/download/community
   - **Option B**: MongoDB Atlas (Cloud - FREE)
     - Sign up at: https://www.mongodb.com/cloud/atlas

3. **npm** (comes with Node.js)
   - Verify: `npm --version`

---

## 🚀 Step-by-Step Setup

### Step 1: Extract Files
Unzip the `netflix-portfolio` folder to your desired location.

### Step 2: Install Backend Dependencies

Open Terminal/Command Prompt in the project folder:

```bash
cd netflix-portfolio
npm install
```

This will install:
- express
- mongoose
- cors
- dotenv

### Step 3: Install Frontend Dependencies

```bash
cd client
npm install
cd ..
```

This will install:
- react
- react-dom
- react-scripts
- axios

### Step 4: Configure MongoDB

#### Option A: Local MongoDB

1. Start MongoDB service:
   - **Windows**: MongoDB should start automatically, or run `mongod`
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

2. The `.env` file is already configured for local MongoDB:
   ```
   MONGODB_URI=mongodb://localhost:27017/portfolio
   ```

#### Option B: MongoDB Atlas (Cloud - Recommended for beginners)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new cluster (Free tier is perfect)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Edit `.env` file and replace the MONGODB_URI:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   ```
   (Replace `username`, `password`, and `cluster` with your actual values)

### Step 5: Start the Application

#### Method 1: Using the Start Script (Easy)

**Mac/Linux:**
```bash
./start.sh
```

**Windows:**
Open two separate terminals:

**Terminal 1 (Backend):**
```bash
npm start
```

**Terminal 2 (Frontend):**
```bash
cd client
npm start
```

#### Method 2: Manual Start (Development Mode)

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

### Step 6: Access the Portfolio

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

The browser should automatically open to http://localhost:3000

---

## 🎯 Verify Everything is Working

1. **Frontend loads**: You should see the Netflix-themed portfolio
2. **Navigation works**: Click on menu items to scroll to sections
3. **Visitor counter**: At the bottom of the page, you should see a visitor count
4. **Backend API**: Visit http://localhost:5000/api/health - you should see:
   ```json
   {"status":"Server is running","timestamp":"..."}
   ```

---

## 🔧 Common Issues & Solutions

### Issue 1: "Port 3000 is already in use"

**Solution:**
```bash
# Kill the process using port 3000
# Mac/Linux:
lsof -ti:3000 | xargs kill

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue 2: "Port 5000 is already in use"

**Solution:**
- Change PORT in `.env` file to 5001 or another port
- Or kill the process like above but use port 5000

### Issue 3: MongoDB Connection Error

**Solution:**
1. Check if MongoDB is running:
   ```bash
   # Mac/Linux:
   sudo systemctl status mongod
   
   # Windows: Check Services for MongoDB
   ```

2. If using MongoDB Atlas:
   - Verify your connection string is correct
   - Make sure your IP is whitelisted in MongoDB Atlas
   - Check username/password are correct

### Issue 4: "Cannot find module 'express'"

**Solution:**
```bash
# Re-install backend dependencies
npm install

# Re-install frontend dependencies
cd client
npm install
```

### Issue 5: Visitor Counter Shows 0 or Doesn't Update

**Solution:**
1. Check if backend is running (http://localhost:5000/api/health)
2. Check browser console for errors (F12 → Console tab)
3. Verify MongoDB connection
4. Test the API directly:
   ```bash
   curl http://localhost:5000/api/visitors
   ```

---

## 📱 Testing the Visitor Counter

1. Open http://localhost:3000
2. Scroll to the bottom - you should see the visitor counter
3. Open in a new incognito/private window
4. The counter should increment
5. Check the database:
   ```bash
   # If using local MongoDB
   mongo
   use portfolio
   db.visitors.find()
   ```

---

## 🎨 Customization Guide

### Change Your Personal Information

Edit these files in `client/src/components/`:

1. **Contact.js** - Email, phone, location
2. **Hero.js** - Name and title
3. **About.js** - About text and stats
4. **Experience.js** - Work experience
5. **Projects.js** - Your projects
6. **Skills.js** - Your technical skills
7. **Education.js** - College details
8. **Achievements.js** - Your achievements

### Change Colors

Edit `client/src/App.css` and modify the CSS variables:

```css
:root {
  --netflix-red: #E50914;      /* Main accent color */
  --netflix-black: #141414;    /* Background */
  --netflix-dark: #000000;     /* Darker sections */
  --netflix-gray: #808080;     /* Secondary text */
  --netflix-light-gray: #b3b3b3; /* Tertiary text */
}
```

---

## 🌐 Deployment

### Deploy Backend (Heroku)

1. Create a Heroku account
2. Install Heroku CLI
3. In project root:
   ```bash
   heroku create your-app-name
   heroku config:set MONGODB_URI="your-mongodb-atlas-uri"
   git push heroku main
   ```

### Deploy Frontend (Vercel/Netlify)

1. Build the frontend:
   ```bash
   cd client
   npm run build
   ```

2. Deploy the `build` folder to Vercel or Netlify

3. Update API URL in frontend to point to your Heroku backend

---

## 📦 Project Structure Explained

```
netflix-portfolio/
├── server.js              # Express server with API routes
├── package.json           # Backend dependencies
├── .env                   # Environment variables (MongoDB URI)
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # All React components
│   │   ├── App.js        # Main App component
│   │   └── App.css       # All styles
│   └── package.json      # Frontend dependencies
└── README.md             # Documentation
```

---

## 🎓 Learning Resources

- **React**: https://react.dev/
- **Node.js**: https://nodejs.org/en/docs/
- **Express**: https://expressjs.com/
- **MongoDB**: https://www.mongodb.com/docs/

---

## 💡 Tips

1. **Always start the backend before frontend**
2. **Keep both terminals running** while developing
3. **Use MongoDB Atlas** for easier setup (no local installation needed)
4. **Check browser console** (F12) for any errors
5. **Check terminal output** for server errors

---

## 🆘 Need Help?

If you encounter any issues:

1. Check this guide thoroughly
2. Read error messages carefully
3. Google the specific error message
4. Check if all dependencies are installed
5. Make sure both servers are running

---

## ✅ Checklist Before Running

- [ ] Node.js installed
- [ ] MongoDB setup (local or Atlas)
- [ ] Backend dependencies installed (`npm install` in root)
- [ ] Frontend dependencies installed (`npm install` in client/)
- [ ] `.env` file configured
- [ ] Backend running (Terminal 1)
- [ ] Frontend running (Terminal 2)
- [ ] Browser opened to http://localhost:3000

---

**Congratulations! Your Netflix-themed portfolio is now live! 🎉**
