const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const asyncHandler = require('../middlewares/async')
const SMTPTransport = require('nodemailer/lib/smtp-transport')
const { OAuth2 } = google.auth


const OAuth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI,
)


exports.sendEmail = asyncHandler(async (to, url, txt) => {
    OAuth2Client.setCredentials({
        refresh_token: process.env.REFERESH_TOKEN
    })
    const accessToken = await OAuth2Client.getAccessToken()
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAUTH2',
            user: 'adarshtiwari0395@gmail.com',
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            refreshToken: process.env.REFERESH_TOKEN,
            accessToken: accessToken
        }
    })

    const mailOptions = {
        from: 'SELLALL <adarshtiwari0395@gmail.com>',
        to: to,
        subject: 'Reset Password',
        text: `You are receiving this email because you (or someone else) has requested the reset of a password. Please put the request.`,
        html: `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase;color: blue;">Welcome to SellAll</h2>
        <p>You are receiving this email because you (or someone else) has requested the reset of a password. Please put the request to: \n\n ${url}
        </p>
        
        <a href='${url}' style="background: blue; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
    
        <p>If the button doesn't work for any reason, you can also click on the link below:</p>
    
        <div>'${url}'</div>
        </div>`
    }

    transport.sendMail(mailOptions, (err, info) => {
        if (err) return err;
        return info
    })
})