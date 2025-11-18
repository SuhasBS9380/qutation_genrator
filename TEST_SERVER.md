# Testing the Server

## Start the Application

Run this command:
```bash
npm start
```

This will start:
- **Server** on `http://localhost:3001`
- **React App** on `http://localhost:5173` or `http://localhost:5174`

## Test the Flow

### 1. Test Server is Running
Open browser and go to:
```
http://localhost:3001/api/quotations
```

You should see: `[]` (empty array if no quotations saved yet)

### 2. Save a Quotation
1. Fill out the quotation form in the React app
2. Click "💾 Save Quotation"
3. Check the `saved_quotations` folder - you should see a JSON file

### 3. Load Saved Quotations
1. Click "📂 Load Saved Quotations" button
2. You should see your saved quotation in the list
3. Click "Load" button
4. The form should populate with the saved data

### 4. Check Browser Console
If nothing shows up:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for any errors (red text)
4. Check Network tab to see if API calls are working

## Common Issues

### Issue: "No saved quotations yet"
**Cause:** Server might not be running or API calls failing

**Fix:**
1. Check if server is running on port 3001
2. Open `http://localhost:3001/api/quotations` in browser
3. Check browser console for CORS errors

### Issue: Server won't start
**Cause:** Port 3001 might be in use

**Fix:**
```bash
# Windows - Kill process on port 3001
netstat -ano | findstr :3001
taskkill /PID <PID_NUMBER> /F

# Then restart
npm start
```

### Issue: Quotations don't persist
**Cause:** This is expected - check the `saved_quotations` folder

**Fix:**
- Quotations are saved to `saved_quotations/` folder
- Each quotation is a separate JSON file
- Files persist between restarts

## Debug Mode

To see detailed logs, check:
1. **Server terminal** - Shows API requests
2. **Browser console** - Shows client-side errors
3. **Network tab** - Shows API call status

## Expected Behavior

✅ Save button creates JSON file in `saved_quotations/`
✅ Load button shows list of saved quotations
✅ Clicking a quotation loads it into the form
✅ Delete button removes the JSON file
