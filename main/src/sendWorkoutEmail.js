const sendWorkoutEmail = async (recipientEmail, workouts) => {
    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: recipientEmail, workouts }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
  
      console.log('Workout email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  
  export default sendWorkoutEmail;