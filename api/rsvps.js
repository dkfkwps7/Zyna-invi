// Simple in-memory storage (for production, use a database)
let rsvps = [];
const { checkAdminAuth } = require('./auth');

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        // Return all RSVPs sorted by timestamp (newest first)
        const sortedRsvps = rsvps.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        res.status(200).json(sortedRsvps);
        break;

      case 'POST':
        // Add new RSVP
        const { name, attending } = req.body;
        
        if (!name || !attending) {
          res.status(400).json({ error: 'Name and attending status are required' });
          return;
        }

        const newRSVP = {
          id: Date.now().toString(),
          name: name.trim(),
          attending,
          timestamp: new Date().toISOString()
        };

        rsvps.push(newRSVP);
        res.status(201).json(newRSVP);
        break;

      case 'DELETE':
        // Require admin authentication for delete operations
        if (!checkAdminAuth(req)) {
          res.status(401).json({ error: 'Unauthorized' });
          return;
        }

        // Delete specific RSVP
        const { id } = req.query;
        
        if (!id) {
          res.status(400).json({ error: 'RSVP ID is required' });
          return;
        }

        const initialLength = rsvps.length;
        rsvps = rsvps.filter(rsvp => rsvp.id !== id);
        
        if (rsvps.length === initialLength) {
          res.status(404).json({ error: 'RSVP not found' });
          return;
        }

        res.status(200).json({ message: 'RSVP deleted successfully' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'OPTIONS']);
        res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
