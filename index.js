const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 808;

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: "xander26@ethereal.email",
        pass: "7uvY657zZrWsK7CQkA",
    },
});

app.use(express.json());
app.use(cors());

// Register route
app.post("/register", async (req, res) => {
    try {
        // Extract registration data from request body
        const { email, name, sub, message } = req.body;

        // Validate registration data
        if (!email || !name || !sub || !message) {
            return res.status(400).json({
                success: false,
                message: "Registration data is incomplete"
            });
        }

        // Perform registration logic (e.g., store data in database)
        // For demo purposes, we're assuming registration is successful

        // Send email
        const info = await transporter.sendMail({
            from: `"${name}" "xander26@ethereal.email"`, // sender address
            to: email, // list of receivers
            subject: sub, // Subject line
            text: message, // plain text body
            html: `<b>${message}</b>`, // html body
        });

        console.log("Message sent: %s", info.messageId);

        // Respond with success message
        res.status(201).json({
            success: true,
            message: "Registration successful and email sent",
            data: req.body,
            emailInfo: info
        });
    } catch (error) {
        console.error("Error processing registration:", error);
        res.status(500).json({
            success: false,
            message: "Failed to process registration or send email",
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log("your server started on:", PORT);
});
