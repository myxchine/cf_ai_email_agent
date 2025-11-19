export const templateEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Email Title</title>
    <style type="text/css">
        /* Reset styles */
        body, table, td, a { 
            -webkit-text-size-adjust: 100%; 
            -ms-text-size-adjust: 100%; 
        }
        table, td { 
            mso-table-lspace: 0pt; 
            mso-table-rspace: 0pt; 
        }
        img { 
            -ms-interpolation-mode: bicubic; 
            border: 0; 
            height: auto; 
            line-height: 100%; 
            outline: none; 
            text-decoration: none; 
            max-width: 100%;
        }
        body { 
            margin: 0 !important; 
            padding: 0 !important; 
            width: 100% !important; 
            background-color: #f4f4f4;
        }

        /* Apple link color fix */
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* Responsive styles */
        @media screen and (max-width: 600px) {
            .wrapper {
                width: 100% !important;
                max-width: 100% !important;
            }
            .mobile-padding {
                padding-left: 10px !important;
                padding-right: 10px !important;
            }
            .mobile-padding-large {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
            .mobile-text {
                font-size: 16px !important;
                line-height: 1.4 !important;
            }
            .mobile-heading {
                font-size: 20px !important;
            }
            .mobile-company {
                font-size: 22px !important;
            }
            .mobile-button {
                width: 100% !important;
                max-width: 280px !important;
            }
        }
    </style>
</head>

<body style="margin: 0 !important; padding: 0 !important; background-color: #f4f4f4;">
    <div style="display: none; font-size: 1px; color: #f4f4f4; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        This is your preview text. Keep it short and sweet!
    </div>

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
            <td style="">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;" class="wrapper">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding: 30px 30px 20px 30px; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; color: #333333;" class="mobile-padding mobile-company">
                            Your Company
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 30px; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #555555;" class="mobile-padding-large mobile-text">
                            
                            <h1 style="font-size: 22px; font-weight: bold; color: #333333; margin: 0 0 15px 0;" class="mobile-heading">
                                This is Your Main Headline
                            </h1>
                            
                            <p style="margin: 0 0 15px 0;">
                                Hi [First Name],
                            </p>
                            <p style="margin: 0 0 15px 0;">
                                This is a paragraph of text. It's clean, simple, and designed to be highly readable. We're using tables for layout to ensure it works everywhere, even in Outlook.
                            </p>
                            <p style="margin: 0;">
                                Feel free to customize this text to fit your needs. You can add more paragraphs, lists, or other elements as required.
                            </p>

                        </td>
                    </tr>
                    
                    <!-- CTA Button -->
                    <tr>
                        <td style="padding: 0 30px 40px 30px;" class="mobile-padding-large">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td align="center" style="border-radius: 5px;" bgcolor="#007bff">
                                                    <a href="https://www.your-link-here.com" target="_blank" style="display: inline-block; padding: 12px 25px; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; color: #ffffff; text-decoration: none; border-radius: 5px;" class="mobile-button">
                                                        Click Here
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px; background-color: #fafafa; border-top: 1px solid #eeeeee;" class="mobile-padding-large">
                            <p style="margin: 0 0 10px 0; font-family: Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #999999;">
                                You are receiving this email because you opted in at our website.
                            </p>
                            <p style="margin: 0 0 10px 0; font-family: Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #999999;">
                                <a href="https://www.your-link-here.com/unsubscribe" target="_blank" style="color: #999999; text-decoration: underline;">Unsubscribe</a>
                                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                                <a href="https://www.your-link-here.com/preferences" target="_blank" style="color: #999999; text-decoration: underline;">Manage Preferences</a>
                            </p>
                            <p style="margin: 0; font-family: Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #999999;">
                                &copy; 2025 Your Company. All rights reserved.<br>
                                123 Main Street, Anytown, USA 12345
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
