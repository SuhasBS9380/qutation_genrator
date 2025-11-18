# Deployment Guide

## 🚀 Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier works fine)

### Step-by-Step Deployment

#### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

#### 2. Deploy on Vercel

**Option A: Using Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the settings
5. Click "Deploy"

**Option B: Using Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel
```

#### 3. Configuration
Vercel will automatically:
- Build your React app with `npm run build`
- Deploy serverless functions from the `/api` folder
- Serve the static files from `/dist`

### ⚠️ Important Notes

**Storage Limitation on Vercel:**
- Vercel serverless functions use `/tmp` directory
- Files in `/tmp` are **temporary** and will be deleted after function execution
- **Quotations will NOT persist** between deployments or function restarts

### 🔄 Alternative: Use a Database

For persistent storage on Vercel, you need to use a database. Here are recommended options:

#### Option 1: Vercel KV (Redis)
- Built-in Vercel service
- Simple key-value storage
- Free tier available

#### Option 2: MongoDB Atlas
- Free tier available
- Document database (perfect for JSON)
- Easy to set up

#### Option 3: Supabase
- Free PostgreSQL database
- Real-time capabilities
- Easy authentication

Would you like me to implement one of these database solutions?

---

## 💻 Local Development

### Running Both Server and App

**Option 1: Single Command**
```bash
npm start
```
This runs both the server and React app simultaneously using `concurrently`.

**Option 2: Separate Terminals**

Terminal 1 (Server):
```bash
npm run server
```

Terminal 2 (React App):
```bash
npm run dev
```

**Option 3: Windows Batch File**
```bash
START.bat
```
Double-click this file to start both in separate windows.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
construction-quotation-generator/
├── api/                      # Vercel serverless functions
│   └── quotations.js        # API endpoint for quotations
├── src/                     # React application source
│   ├── components/
│   ├── utils/
│   └── ...
├── public/                  # Static assets
├── dist/                    # Production build (generated)
├── saved_quotations/        # Local development storage
├── server.js               # Local development server
├── vercel.json             # Vercel configuration
└── package.json            # Dependencies and scripts
```

---

## 🔧 Environment Variables

For production, you can set environment variables in Vercel:

1. Go to your project in Vercel Dashboard
2. Settings → Environment Variables
3. Add variables as needed

Example:
```
API_URL=https://your-api.vercel.app/api
```

---

## 🐛 Troubleshooting

### Issue: API calls fail in production
- Check that `/api` routes are working
- Verify CORS settings in `api/quotations.js`
- Check browser console for errors

### Issue: Quotations not persisting
- This is expected on Vercel without a database
- Implement a database solution (see alternatives above)

### Issue: Build fails
- Run `npm run build` locally to test
- Check for TypeScript errors
- Verify all dependencies are in `package.json`

---

## 📝 Next Steps

1. ✅ Deploy to Vercel
2. ⚠️ Implement database for persistent storage
3. 🔒 Add authentication (optional)
4. 📧 Add email functionality (optional)
5. 🎨 Custom domain (optional)
