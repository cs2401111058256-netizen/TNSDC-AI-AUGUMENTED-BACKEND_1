const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI();

// Helper function to clean and parse JSON from Gemini response
const parseAIJson = (textResponse) => {
    try {
        let cleaned = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleaned);
    } catch (e) {
        return textResponse;
    }
};

// 1. AI Summary Route
router.post('/summary', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ success: false, message: "Text is required for summary." });
        }

        const response = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: `Summarize the following study material. 
            You MUST return ONLY a valid JSON object with a key "summary" containing the structured summary points.
            \n\nText:\n${text}`
        });

        res.status(200).json({
            success: true,
            message: "AI Summary generated successfully!",
            summary: parseAIJson(response.text)
        });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ success: false, message: "Failed to generate AI summary", error: error.message });
    }
});

// 2. AI Flashcards Route
router.post('/flashcards', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ success: false, message: "Text is required for flashcards." });
        }

        const response = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: `Create study flashcards based on the following text. 
            You MUST return ONLY a valid JSON array of objects. 
            Each object must have exactly two keys: "question" and "answer".
            \n\nText:\n${text}`
        });

        res.status(200).json({
            success: true,
            message: "AI Flashcards generated successfully!",
            flashcards: parseAIJson(response.text)
        });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ success: false, message: "Failed to generate AI flashcards", error: error.message });
    }
});

// 3. AI Quiz Route
router.post('/quiz', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ success: false, message: "Text is required for quiz." });
        }

        const response = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: `Create a multiple-choice quiz based on the following text. 
            You MUST return ONLY a valid JSON array of objects. 
            Each object must have keys: "question", "options" (an array of 4 strings), and "correctAnswer".
            \n\nText:\n${text}`
        });

        res.status(200).json({
            success: true,
            message: "AI Quiz generated successfully!",
            quiz: parseAIJson(response.text)
        });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ success: false, message: "Failed to generate AI quiz", error: error.message });
    }
});

// 4. AI Study Plan Route
router.post('/study-plan', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ success: false, message: "Text is required for study plan." });
        }

        const response = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: `Create a structured day-by-day study plan based on the following text. 
            You MUST return ONLY a valid JSON array of objects. 
            Each object must have exactly three keys: "day", "topic", and "tasks" (an array of strings).
            \n\nText:\n${text}`
        });

        res.status(200).json({
            success: true,
            message: "AI Study Plan generated successfully!",
            studyPlan: parseAIJson(response.text)
        });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ success: false, message: "Failed to generate AI study plan", error: error.message });
    }
});

module.exports = router;