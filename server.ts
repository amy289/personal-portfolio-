import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Amyy's private email address - protected on server side and NEVER exposed to client browser UI
const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || 'amyyb871@gmail.com';

interface StoredMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  deliveredToEmail: boolean;
}

const inMemoryMessages: StoredMessage[] = [];

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // API endpoint for receiving contact submissions
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: 'Name, email, and message are required fields.',
        });
      }

      // Basic email regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Please enter a valid email address.',
        });
      }

      const emailSubject = subject?.trim()
        ? `[Portfolio Contact] ${subject.trim()} - From ${name}`
        : `[Portfolio Contact] New message from ${name}`;

      let emailDelivered = false;

      // Send directly to Amyy's email via FormSubmit server-to-server relay
      try {
        const relayResponse = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name,
            email, // Sender's email (Reply-To in Amyy's Gmail)
            phone: phone || 'Not provided',
            _subject: emailSubject,
            message,
            _template: 'table',
            _captcha: 'false',
          }),
        });

        if (relayResponse.ok) {
          emailDelivered = true;
        } else {
          console.warn('FormSubmit relay returned status:', relayResponse.status);
        }
      } catch (err: any) {
        console.error('Failed to forward email to FormSubmit:', err);
      }

      // Record message in store
      const storedMessage: StoredMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name,
        email,
        phone: phone || '',
        subject: subject || 'Portfolio Inquiry',
        message,
        date: new Date().toISOString(),
        deliveredToEmail: emailDelivered,
      };

      inMemoryMessages.unshift(storedMessage);
      if (inMemoryMessages.length > 100) inMemoryMessages.pop();

      return res.status(200).json({
        success: true,
        message: 'Your message has been sent directly to Amyy.',
        emailDelivered,
        messageId: storedMessage.id,
      });
    } catch (error: any) {
      console.error('Error handling /api/contact:', error);
      return res.status(500).json({
        success: false,
        error: 'An unexpected server error occurred while sending your message.',
      });
    }
  });

  // API endpoint for fetching messages (for Amyy's in-app inbox)
  app.get('/api/contact/messages', (_req, res) => {
    res.json({
      success: true,
      messages: inMemoryMessages,
    });
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
  });

  // Vite middleware in dev or static files in production
  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
