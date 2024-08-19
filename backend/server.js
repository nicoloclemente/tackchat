//creo il server Express
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { Translate } from '@google-cloud/translate/build/src/v2/index.js';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

import connectToMongoDB from "./db/connectToMongoDB.js";
import {app, server} from "./socket/socket.js";
import * as path from "node:path";


const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();



dotenv.config();

// Google Cloud key
const translate = new Translate({ key: process.env.GOOGLE_TRANSLATE_API_KEY });

app.use(cors());
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req. body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// to serve static file
// we go into dirname, that is the root, after we go into frontend
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// with this we are able to run the frontend
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.post('/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;

    try {
        console.log(`Richiesta di traduzione ricevuta: testo="${text}", lingua di destinazione="${targetLanguage}"`);

        // Perform the translation
        const [translation] = await translate.translate(text, targetLanguage);

        if (!translation || translation.length === 0) {
            console.log('La traduzione è vuota o non riuscita.');
            res.status(500).json({ error: 'La traduzione non è riuscita o è vuota.' });
            return;
        }

        console.log(`Traduzione effettuata: ${translation}`);
        res.json({ translatedText: translation });
    } catch (error) {
        console.error('Errore durante la traduzione:', error.message);
        res.status(500).json({ error: 'Errore durante la traduzione.', details: error.message });
    }
});

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port: ${PORT}`);
});

