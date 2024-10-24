// src/sendEmail.js

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'thedailygainzco@gmail.com',
    pass: 'dailygainz#45', // Use an App Password for Gmail (do not use your actual email password)
  },
});

export const sendChallengeEmail = async (email, challenge) => {
  try {
    const mailOptions = {
      from: 'thedailygainzco@gmail.com',
      to: email,
      subject: 'Your Daily Fitness Challenge',
      text: `Today's Challenge: ${challenge}`,
      html: `<strong>Today's Challenge:</strong> ${challenge}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
