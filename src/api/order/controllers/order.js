'use strict';

/**
 * order router
 */

const { createCoreController } = require('@strapi/strapi').factories;
const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')

const createTransporter = () => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_SERVER ?? '',
        port: 465,
        secure: true,
        logger: true, 
        secureConnection: false,
        auth: {
            user: process.env.SENDER_EMAIL,
            pass:  process.env.SENDER_PASSWORD
            }
        });
    return transporter;
}

const createMailOptions = (recipientEmail, subject, template, context, attachments) => {
    
    return {
        from: process.env.SENDER_EMAIL,
        template,
        to: recipientEmail,
        subject,
        context,
        attachments: [...(attachments ?? [])]
    }
}

const createHandleBarsOptions = () => {
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./src/helpers/emailtemplates/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./src/helpers/emailtemplates/'),
    };

    return handlebarOptions;
}


module.exports = createCoreController('api::order.order', ({strapi})=> ({
    async sendFormMail (ctx) {
        const body = ctx.request.body;

        const transporter = createTransporter();
        const context = {

        }
        const mailOptions = createMailOptions(body.email, 'Prosba o uzupelnienie formularza', 'formEmail', context, []);
        const handlebarsOptions = createHandleBarsOptions();
        transporter.use('compile', hbs(handlebarsOptions))
        const info = await transporter.sendMail(mailOptions);
        console.log(info.response, info.rejected, info.accepted);
    },

    async sendGreetingMail (ctx) {
        const body = ctx.request.body;

        const transporter = createTransporter();
        const context = {

        }
        const mailOptions = createMailOptions(body.email, 'Podziekowanie za zakup', 'greetingEmail', context, []);
        const handlebarsOptions = createHandleBarsOptions();
        transporter.use('compile', hbs(handlebarsOptions))
        const info = await transporter.sendMail(mailOptions);
        console.log(info.response, info.rejected, info.accepted);
    },

    async sendSheduleNotificationMail (ctx) {
        const body = ctx.request.body;
        const transporter = createTransporter();
        const context = {

        }
        const mailOptions = createMailOptions(body.email, `Appointment sheduled! ${body.titleTheme}`, '', context, []);
        const info = await transporter.sendMail(mailOptions);
        console.log(info.response, info.rejected, info.accepted);
    },

    async sendBoughtNotificationMail (ctx) {
        const body = ctx.request.body;
        const transporter = createTransporter();
        const context = {

        }
        const mailOptions = createMailOptions(body.email, `Bought products: ${body.bought}`, '', context, []);
        const info = await transporter.sendMail(mailOptions);
        console.log(info.response, info.rejected, info.accepted);
    }
}));
