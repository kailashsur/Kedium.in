import dotenv from 'dotenv';
dotenv.config();

export const otpTemplate = (otp: string, fullname? : string, verifyLinkPath? : string) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Account</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            background-color: #4CAF50;
            color: #ffffff;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #4CAF50;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            color: #777777;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Verify Your Account</h1>
        </div>
        <div class="content">
            <p>Hello, ${fullname}</p>
            <p>Thank you for registering with Patranee. To complete your registration, please use the following OTP:</p>
            <p class="otp">${otp}</p>

            ${verifyLinkPath ? `<p>Or you can verify your account by clicking the following link:</p>

            <a href="${process.env.CLIENT_URL}${verifyLinkPath}" style="background-color: #4CAF50; color: #ffffff; padding: 10px 20px; border-radius: 4px; text-decoration: none;">Verify Account</a>

            <p>${process.env.CLIENT_URL}${verifyLinkPath}</p>` : ''}
            
            <p>This OTP is valid for 10 minutes. Please do not share this OTP with anyone.</p>
            <p>If you did not request this, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>&copy; 2023 Patranee. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
}