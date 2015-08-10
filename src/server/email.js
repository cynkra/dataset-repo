import nodemailer from 'nodemailer';
import config from '../config/config.server';

const transporter = nodemailer.createTransport(config.email.auth);

export default transporter;
