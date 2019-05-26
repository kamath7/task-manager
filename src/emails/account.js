const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to: email,
        from: 'adithyakamath96@gmail.com',
        subject: 'Thanks for joining!',
        text: `Hello ${name}! Enjoy your time here! `,
        html: '<strong>I am legend</strong>'
    })
};
const sendCancellationMail = (email,name)=>{
    sgMail.send({
        to: email,
        from: 'adithyakamath96@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Hello ${name}!We're sorry we couldn't live to your expectations. Suggestions welcome! `
    })
};

module.exports = {
    sendWelcomeEmail,
    sendCancellationMail
};