const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({
  origin: 'https://portfolio-7oif.onrender.com',
  methods: 'POST',
  allowedHeaders: 'Content-Type',
}));

 app.post('/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: '587',
      auth: {
        user: 'limimathew00@gmail.com',
        pass: 'xsmtpsib-d5748481f9076a9fdffd797b4a5ffcf39954e1fe88014d84f641eb691e3aa229-bLKRjQfa38UInScG',
      },
    });

    const mailOptions = {
      from: email,
      to: 'limimathew00@gmail.com',
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      
    };
    await transporter.sendMail(mailOptions, function (error, info) {

      if (error) {
        console.error('Error:', error);
      } else {
        console.log('Email sent successfully');
      }
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
 });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
