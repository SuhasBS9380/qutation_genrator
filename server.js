import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Quotations folder in project root
const QUOTATIONS_DIR = path.join(__dirname, 'saved_quotations');

// Create folder if it doesn't exist
if (!fs.existsSync(QUOTATIONS_DIR)) {
  fs.mkdirSync(QUOTATIONS_DIR, { recursive: true });
}

// Get all quotations
app.get('/api/quotations', (req, res) => {
  try {
    const files = fs.readdirSync(QUOTATIONS_DIR);
    const quotations = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const data = fs.readFileSync(path.join(QUOTATIONS_DIR, file), 'utf8');
        return JSON.parse(data);
      });
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load quotations' });
  }
});

// Save quotation
app.post('/api/quotations', (req, res) => {
  try {
    const quotation = req.body;
    const filename = `${quotation.quotationNumber}.json`;
    const filepath = path.join(QUOTATIONS_DIR, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(quotation, null, 2));
    res.json({ success: true, message: 'Quotation saved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save quotation' });
  }
});

// Delete quotation
app.delete('/api/quotations/:quotationNumber', (req, res) => {
  try {
    const filename = `${req.params.quotationNumber}.json`;
    const filepath = path.join(QUOTATIONS_DIR, filename);
    
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      res.json({ success: true, message: 'Quotation deleted' });
    } else {
      res.status(404).json({ error: 'Quotation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quotation' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Quotations saved to: ${QUOTATIONS_DIR}`);
});
