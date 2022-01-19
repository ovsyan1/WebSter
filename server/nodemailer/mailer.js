const nodemailer = require('nodemailer');
const { NODEMAILER } = require('../config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NODEMAILER.EMAIL,
        pass: NODEMAILER.PASSWORD
    }
})

function mail(email, tokenResetPassword) {
    const PORT = 'http://localhost:5000'
    const mailOptions = {
        from: NODEMAILER.EMAIL,
        to: email,
        subject: 'Message was sent across node.js',
        html: `
        <h1>Did you forgot the password?</h1>
        <p>If not, then ignore this list</p>
        <p>Otherwise, click on the link below:</p>
        <p>${PORT}/api/auth/change/${tokenResetPassword}</p> 
        <hr />
        <a href="${PORT}/api/auth/login">Main Page</a>`
    }
    return mailOptions
}
module.exports = (email, tokenResetPassword) => {
    transporter.sendMail(mail(email, tokenResetPassword), (err) => {
        if (err) {
            console.log('Error with nodemailer');
        }
    })
}


/* <p><a href="${PORT}/api/auth/change/${tokenResetPassword}">Recovery access</a></p> */