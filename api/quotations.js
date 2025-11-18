const fs = require('fs');
const path = require('path');

// Vercel serverless function
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Use /tmp directory in Vercel (only persists during function execution)
  const QUOTATIONS_DIR = path.join('/tmp', 'saved_quotations');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(QUOTATIONS_DIR)) {
    fs.mkdirSync(QUOTATIONS_DIR, { recursive: true });
  }

  try {
    // GET - List all quotations
    if (req.method === 'GET') {
      const files = fs.readdirSync(QUOTATIONS_DIR);
      const quotations = files
        .filter(file => file.endsWith('.json'))
        .map(file => {
          const data = fs.readFileSync(path.join(QUOTATIONS_DIR, file), 'utf8');
          return JSON.parse(data);
        });
      return res.status(200).json(quotations);
    }

    // POST - Save quotation
    if (req.method === 'POST') {
      const quotation = req.body;
      const filename = `${quotation.quotationNumber}.json`;
      const filepath = path.join(QUOTATIONS_DIR, filename);
      
      fs.writeFileSync(filepath, JSON.stringify(quotation, null, 2));
      return res.status(200).json({ success: true, message: 'Quotation saved' });
    }

    // DELETE - Delete quotation
    if (req.method === 'DELETE') {
      const quotationNumber = req.query.id || req.url.split('/').pop();
      const filename = `${quotationNumber}.json`;
      const filepath = path.join(QUOTATIONS_DIR, filename);
      
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
        return res.status(200).json({ success: true, message: 'Quotation deleted' });
      } else {
        return res.status(404).json({ error: 'Quotation not found' });
      }
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
