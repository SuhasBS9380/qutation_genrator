# Quotation Storage System

## How It Works

The application saves quotations as **JSON files** in a local folder inside the project:

📁 **Location:** `construction-quotation-generator/saved_quotations/`

Each quotation is saved as a separate JSON file named: `[QUOTATION_NUMBER].json`

## Setup Instructions

### 1. Start the Server
Open a terminal in the project folder and run:
```bash
npm start
```

The server will start on `http://localhost:3001` and create the `saved_quotations` folder automatically.

### 2. Start the React App
In another terminal, navigate to the project folder and run:
```bash
npm run dev
```

The app will open in your browser (usually `http://localhost:5173`)

## Benefits

✅ **Local Storage** - All quotations saved in project folder
✅ **JSON Format** - Easy to read, edit, and backup
✅ **No Downloads** - Files stay in one place
✅ **Simple** - Minimal server, no database needed

## Managing Your Quotations

### Saving
1. Fill out the quotation form
2. Click "Save Quotation"
3. The quotation is saved to `saved_quotations/[QUOTATION_NUMBER].json`

### Loading
- Use the "Saved Quotations" section to view all saved quotations
- Click on any quotation to load it back into the form

### Viewing Files
- Open the `saved_quotations` folder to see all your JSON files
- Each file is named after the quotation number (e.g., `Q-2024-001.json`)

### Backing Up
- Simply copy the entire `saved_quotations` folder to backup all quotations
- You can move this folder to cloud storage, USB drive, etc.

## File Format

Each JSON file contains the complete quotation data:
```json
{
  "quotationNumber": "Q-2024-001",
  "date": "2024-01-15",
  "clientName": "John Doe",
  "clientEmail": "john@example.com",
  "services": [...],
  "gstPercentage": 18,
  "savedAt": "2024-01-15T10:30:00.000Z",
  "id": "Q-2024-001"
}
```

## Tips

- Keep the server running while using the app
- The `saved_quotations` folder is excluded from git (in .gitignore)
- Back up the `saved_quotations` folder regularly
- You can manually edit JSON files if needed
