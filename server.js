import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend files if built
app.use(express.static(path.join(__dirname, 'dist')));

// Institutional System Health Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OPERATIONAL',
    system: 'Apex University Central Student Grievance Redressal & Resolution System',
    timestamp: new Date().toISOString(),
    slaWatchdog: 'ACTIVE',
    triageSubsystem: 'ONLINE',
    accreditation: "NAAC 'A++' Accredited"
  });
});

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Apex University Grievance Redressal System</title>
            <style>
              body { font-family: sans-serif; text-align: center; padding: 50px; background: #0f172a; color: white; }
              a { color: #f59e0b; font-weight: bold; }
            </style>
          </head>
          <body>
            <h1>Apex University Redressal API Server Online</h1>
            <p>Please run <code>npm run build</code> or use <code>npm run dev</code> for the live interactive portal.</p>
          </body>
        </html>
      `);
    }
  });
});

app.listen(PORT, () => {
  console.log(`[Apex University SGRMS] Institutional Server running at http://localhost:${PORT}`);
});
