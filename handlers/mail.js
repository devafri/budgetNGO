// const nodemailer = require('nodemailer');
const hbs = require('express-handlebars');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');
const dotenv = require('dotenv').config({});

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

