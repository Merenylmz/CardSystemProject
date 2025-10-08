import nodemailer from 'nodemailer';

export async function sendMail({ to, subject, body }: {to: any, subject: any, body: any}) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: body
    };

  await transporter.sendMail(mailOptions);
}
