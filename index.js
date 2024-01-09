const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// CORS middleware
app.use(cors({
  origin: 'https://portfolio-7oif.onrender.com',
  methods: 'POST',
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 204,
}));

// Route to handle preflight OPTIONS requests
app.options('/send-email', cors()); // Use cors() here to handle preflight requests

app.post('/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: '587',
      auth: {
        user: 'limimathew00@gmail.com',
        pass: 'xsmtpsib-d5748481f9076a9fdffd797b4a5ffcf39954e1fe88014d84f641eb691e3aa229-I40BwHrUFySVLOnA',
      },
    });

    const mailOptions = {
      from: email,
      to: 'limimathew00@gmail.com',
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    };

    // Send email using promises
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);

    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
