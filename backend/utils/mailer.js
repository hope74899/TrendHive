const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    pool: true,
    timeout: 10000, // 10 seconds
    logger: false, // Enable logger in non-production
    debug: process.env.NODE_ENV !== 'production',  // Enable debugging in non-production
});

// Function to send OTP email
const sendOTPEmail = async (recipientEmail, otp) => {
    const mailOptions = {
        from: `TrendHive <${process.env.EMAIL_USER || 'noreply@trendhive.com'}>`,
        to: recipientEmail,
        subject: "Your OTP for TrendHive Account Verification",
        text: `Your OTP code is ${otp}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 10px;">
                <div style="background-color: #f7f7f7; padding: 30px; border-radius: 8px;">
                    <h2 style="color: #333; text-align: center;">Verify Your Email</h2>
                    <p style="color: #555; font-size: 16px; text-align: center;">
                        Dear User, <br/>
                        Thank you for registering with <strong>TrendHive</strong>! To complete your account setup, please use the following One-Time Password (OTP) to verify your email address.
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <code style="font-size: 22px; font-weight: bold; color: #ffffff; background-color: #4caf50; padding: 10px 20px; border-radius: 4px;">
                            ${otp}
                        </code>
                    </div>
                    <p style="color: #555; font-size: 16px; text-align: center;">
                        This OTP is valid for 10 minutes. If you didn't request this email, please ignore it.
                    </p>
                    <p style="text-align: center; color: #999; font-size: 14px; padding-top: 10px;">
                        Need help? Contact our support team at <a href="mailto:support@TrendHive.com" style="color: #4caf50;">support@trendhive.com</a>
                    </p>
                </div>
                <div style="text-align: center; margin-top: 30px; color: #777; font-size: 12px;">
                    © 2024 TrendHive. All rights reserved.
                </div>
            </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error.message, error.response);
        throw new Error('Failed to send OTP email.');
    }
};
const sendCouponEmail = async (recipientEmail, couponCode) => {
    const mailOptions = {
        from: `TrendHive <${process.env.EMAIL_USER || 'noreply@trendhive.com'}>`,
        to: recipientEmail,
        subject: "Thanks for Joining Our Newsletter! Here’s Your Exclusive Coupon",
        text: `Welcome to the TrendHive newsletter! As a subscriber, enjoy your exclusive 20% discount with this code: ${couponCode}. Apply it at checkout and start saving today!`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 10px;">
                <div style="background-color: #f7f7f7; padding: 30px; border-radius: 8px;">
                    <h2 style="color: #333; text-align: center;">Thank You for Subscribing!</h2>
                    <p style="color: #555; font-size: 16px; text-align: center;">
                        Welcome to the TrendHive family! We’re thrilled to have you on board. As a token of appreciation, here’s an exclusive coupon just for you.
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <span style="font-size: 22px; font-weight: bold; color: #ffffff; background-color: #ff5722; padding: 10px 20px; border-radius: 4px;">
                            ${couponCode}
                        </span>
                    </div>
                    <p style="color: #555; font-size: 16px; text-align: center;">
                        Use this code at checkout to get <strong>20% off</strong> your next purchase. It’s our way of saying thank you for joining us. Act fast—this offer won’t last long!
                    </p>
                    <p style="color: #555; font-size: 14px; text-align: center;">
                        Have questions or need help? Reach out to us anytime at <a href="mailto:support@trendhive.com" style="color: #ff5722;">support@trendhive.com</a>.
                    </p>
                </div>
                <div style="text-align: center; margin-top: 30px; color: #777; font-size: 12px;">
                    © 2024 TrendHive. All rights reserved. You’re receiving this email because you subscribed to our newsletter.
                </div>
            </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Newsletter coupon email sent: ', info.response);
        return info;
    } catch (error) {
        console.error('Error sending coupon email:', error.message, error.response);
        throw new Error('Failed to send coupon email.');
    }
};

module.exports = { sendOTPEmail, sendCouponEmail };
