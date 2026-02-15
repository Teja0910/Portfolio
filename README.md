# Netflix-Themed Portfolio - MERN Stack

A stunning Netflix-themed portfolio website built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring a visitor counter that tracks the number of people who visited the portfolio.

## 🎬 Features

- **Netflix-Inspired Design**: Dark theme with signature red accents and cinematic animations
- **Visitor Counter**: Real-time visitor tracking stored in MongoDB
- **Responsive Design**: Fully responsive across all devices
- **Modern Tech Stack**: Built with React, Node.js, Express, and MongoDB
- **Smooth Animations**: Professional animations and transitions throughout
- **Component-Based Architecture**: Clean, reusable React components

## 📋 Tech Stack

### Frontend
- **React 18**: Modern React with Hooks
- **Axios**: HTTP client for API calls
- **CSS3**: Custom styling with animations

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for visitor tracking
- **Mongoose**: MongoDB object modeling

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### 1. Clone the repository
```bash
git clone <repository-url>
cd netflix-portfolio
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Install Frontend Dependencies
```bash
cd client
npm install
cd ..
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/portfolio

# Server Configuration
PORT=5000

# For production with MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

### 5. Setup MongoDB

**Option A: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service
- The database will be created automatically

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in `.env` file

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Start Backend Server:**
```bash
npm run dev
```
Backend will run on http://localhost:5000

**Terminal 2 - Start React Frontend:**
```bash
cd client
npm start
```
Frontend will run on http://localhost:3000

### Production Mode

**Build Frontend:**
```bash
cd client
npm run build
```

**Start Server:**
```bash
npm start
```

## 📁 Project Structure

```
netflix-portfolio/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Header.js
│   │   │   ├── Hero.js
│   │   │   ├── About.js
│   │   │   ├── Experience.js
│   │   │   ├── Projects.js
│   │   │   ├── Skills.js
│   │   │   ├── Education.js
│   │   │   ├── Achievements.js
│   │   │   ├── Contact.js
│   │   │   └── Footer.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── server.js               # Express server
├── package.json            # Backend dependencies
├── .env                    # Environment variables
└── README.md
```

## 🔌 API Endpoints

### GET /api/visitors
Get the current visitor count
```json
Response: { "count": 123 }
```

### POST /api/visitors/increment
Increment the visitor count
```json
Response: { "count": 124, "message": "Visitor count incremented successfully" }
```

### POST /api/visitors/reset
Reset the visitor count (for testing)
```json
Response: { "message": "Visitor count reset successfully" }
```

### GET /api/health
Check server health
```json
Response: { "status": "Server is running", "timestamp": "2024-02-15T..." }
```

## 🎨 Customization

### Update Personal Information
Edit the component files in `client/src/components/` to update:
- About section
- Experience details
- Projects
- Skills
- Education
- Contact information

### Change Color Scheme
Modify CSS variables in `client/src/App.css`:
```css
:root {
  --netflix-red: #E50914;
  --netflix-black: #141414;
  --netflix-dark: #000000;
  --netflix-gray: #808080;
  --netflix-light-gray: #b3b3b3;
}
```

## 📱 Responsive Design

The portfolio is fully responsive and works seamlessly on:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or MongoDB Atlas connection string is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Verify the `.env` file is properly configured

### Port Already in Use
- Change the PORT in `.env` file
- Kill the process using the port:
  ```bash
  # On Mac/Linux
  lsof -ti:5000 | xargs kill
  
  # On Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### CORS Issues
The backend is already configured with CORS. If you still face issues, check the `server.js` CORS configuration.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Teja Mani Subhash Ch**
- Email: tejamanisubhash.ch@gmail.com
- Phone: +91 9121956692
- Location: Hyderabad, Telangana, India

## 🙏 Acknowledgments

- Design inspiration from Netflix
- Built with modern web technologies
- Icons and fonts from Google Fonts

---

**Enjoy your Netflix-themed portfolio! 🎬🚀**
