`use strict`;

import config from './../config.js';
import EMail from '../shared/EMail.js';

import nodemailer from 'nodemailer';

export default class EMailService
{
    #transporter = null;

    constructor()
    {
        this.#transporter = nodemailer.createTransport({
            service: config.email_service,
            host: config.email_host,
            port: config.email_port,
            auth: {
                user: config.email_user,
                pass: config.email_pass
            }
        });
    }

    send_email(email)
    {
        return new Promise((resolve, reject) => {
            let result = {
                success: false,
                error_code: -1,
                message: ''
            };
            let options = null;
    
            if (email instanceof EMail) {
                options = {
                    from: {
                        name: email.get_sender_name() + ' <' + email.get_sender_email() + '>',
                        address: config.email_user
                    },
                    to: config.email_user,
                    subject: 'Nachricht von ' + email.get_sender_name(),
                    text: email.get_text()
                };
    
                this.#transporter.sendMail(options, (error, info) => {
                    if (error)
                    {
                        console.error('Fehler beim Senden der E-Mail:', error);
                        result.message = 'Fehler beim Senden der E-Mail: ' + error.message;
                        result.error_code = 1;
                        reject(result);
                    } 
                    else
                    {
                        console.log('E-Mail gesendet:', info.response);
                        result.success = true;
                        result.message = 'E-Mail erfolgreich gesendet';
                        resolve(result);
                    }
                });
            } 
            else
            {
                result.message = 'Ungültiges E-Mail-Objekt';
                result.error_code = 2;
                reject(result);
            }
        });
    }
}
