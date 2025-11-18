# Quick Start Guide

## 🏃 Run Locally (Development)

### Single Command (Recommended)
```bash
npm start
```
This starts both the server (port 3001) and React app (port 5173).

### Or Run Separately
```bash
# Terminal 1
npm run server

# Terminal 2  
npm run dev
```

---

## 🚀 Deploy to Vercel

### Quick Deploy
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repo
5. Click "Deploy"

Done! Your app will be live in ~2 minutes.

### Using CLI
```bash
npm install -g vercel
vercel login
vercel
```

---

## ⚠️ Important: Storage on Vercel

**Quotations will NOT persist on Vercel** because serverless functions use temporary storage.

### Solutions:
1. **Use localStorage only** (browser-based, no server needed)
2. **Add a database** (MongoDB, Supabase, Vercel KV)
3. **Deploy elsewhere** (Heroku, Railway, DigitalOcean)

See `DEPLOYMENT.md` for detailed instructions.

---

## 📦 What's Included

✅ React + TypeScript + Vite
✅ PDF generation with jsPDF
✅ Local file storage (development)
✅ Vercel-ready serverless API
✅ Professional quotation templates
✅ GST calculations
✅ Save/Load functionality

---

## 🔗 Useful Links

- **Full Deployment Guide**: See `DEPLOYMENT.md`
- **Storage Info**: See `QUOTATION_STORAGE.md`
- **Vercel Docs**: https://vercel.com/docs
