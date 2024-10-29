export const generateWelcomeEmail = (verificationUrl: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your email</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #024e52;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      padding: 20px 0;
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #024e52;
    }
    .content {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 30px;
      margin: 20px 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .button {
      display: inline-block;
      background-color: #024e52;
      color: #ffffff;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 500;
      margin: 20px 0;
    }
    .button:hover {
      background-color: #013639;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #666;
      padding: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Estate Sanctuary</div>
    </div>
    <div class="content">
      <h1>Welcome to Estate Sanctuary!</h1>
      <p>Thank you for your interest in staying updated with our property management platform. To complete your subscription and start receiving notifications, please verify your email address.</p>
      <div style="text-align: center;">
        <a href="${verificationUrl}" class="button">Verify Email Address</a>
      </div>
      <p>This verification link will expire in 24 hours. If you didn't request this verification, please ignore this email.</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Estate Sanctuary. All rights reserved.</p>
      <p>This email was sent to verify your subscription to our notification service.</p>
    </div>
  </div>
</body>
</html>
`; 