require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Define Contact Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    email: { type: String, required: true },
    
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

// Route to handle form submissions
app.post('/contact', async (req, res) => {
    try {
        console.log("Received Data:", req.body); // Debugging log
        const { name, message, email } = req.body;

        // Ensure all fields are present
        if (!name || !message || !email ) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newContact = new Contact({ name, message, email});
        await newContact.save();
        res.status(201).json({ message: "Message saved successfully" });
    } catch (error) {
        console.error("Error saving message:", error);
        res.status(500).json({ error: "Error saving message" });
    }
});

app.get("/contact", async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json({ contacts }); // Return an object with a 'contacts' key
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ error: "Error fetching contacts" });
    }
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));