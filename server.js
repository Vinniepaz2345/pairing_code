const express = require('express');
const { Client } = require('whatsapp-web.js');
const qrcodeTerminal = require('qrcode-terminal');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// Set up the WhatsApp client
const client = new Client({
    puppeteer: {
        headless: true,
        args: ['--no-sandbox']
    }
});

// Store the session and send the session ID
let sessionId = '';

client.on('qr', (qr) => {
    qrcodeTerminal.generate(qr, { small: true }); // Print QR in terminal (for debugging)
});

// When WhatsApp is ready, send session ID to user
client.on('ready', () => {
    console.log('WhatsApp is ready!');
    sessionId = `session_${Date.now()}`;
    console.log(`Session ID: ${sessionId}`);
});

// Start the WhatsApp client
client.initialize();

// API route to generate pairing code
app.post('/api/generate-pairing', (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        return res.status(400).json({ success: false, message: "Phone number is required." });
    }

    // Send pairing code and session ID after successful pairing
    const pairingCode = '123456'; // You can replace this with the actual QR or pairing code

    // Simulate sending the session ID to WhatsApp number after linking
    client.sendMessage(phoneNumber, `Your session ID is: ${sessionId}`);

    res.json({ success: true, pairingCode });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
