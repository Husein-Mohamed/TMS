import nodemailer from 'nodemailer';

// Setup nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can replace this with any other email service
    auth: {
        user: process.env.EMAIL_USER,  // Add this to your .env file
        pass: process.env.EMAIL_PASS   // Add this to your .env file
    }
});

export const sendOverdueEmail = (task) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'manager@example.com',  // Change this to the manager's email
        subject: `Task Overdue: ${task.title}`,
        text: `The task '${task.title}' is overdue. Please take action.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Error sending email: ${error}`);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });
};
