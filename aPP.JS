const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Webhook için doğrulama token'ı
const VERIFY_TOKEN = 'metin';

// Webhook endpoint'i
app.get('/webhook', (req, res) => {
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Token'ı kontrol et
    if (token === VERIFY_TOKEN) {
        res.send(challenge); // Doğrulama başarılı
    } else {
        res.status(403).send('Unauthorized'); // Yetkisiz erişim
    }
});

// Webhook POST isteği
app.post('/webhook', (req, res) => {
    const data = req.body;
    console.log('Webhook verisi:', data);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Uygulama http://localhost:${port} adresinde çalışıyor.`);
});