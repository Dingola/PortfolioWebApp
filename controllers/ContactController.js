'use strict';

import EMailService from '../services/EMailService.js';
import EMail from '../shared/EMail.js';

const contact_form_error = {
    field: '',
    error_code: 0,
    message: ''
};

export default class ContactController 
{
    #email_service;

    constructor() 
    {
        this.#email_service = new EMailService();
    }

    async send_email(req, res) 
    {
        const name = req.body.name.trim();
        const email = req.body.email.trim();
        const message = req.body.message.trim();
    
        const validation_result = this.#validate_contact_form_entries(name, email, message);
    
        if (validation_result.length === 0) {
            try {
                const send_result = await this.#email_service.send_email(new EMail(email, name, '', '', message));
                console.log('success: ' + send_result.success + ' message: ' + send_result.message);
                
                if (send_result.success)
                {
                    res.status(200).json({ message: 'success', errors: [] });
                } 
                else
                {
                    res.status(500).json({ message: 'failed', errors: [{
                            ...contact_form_error,
                            field: '',
                            error_code: -1,
                            message: send_result.message
                        }] 
                    });
                }
            } catch (error) {
                console.error('Fehler beim Senden der E-Mail:', error);
                res.status(500).json({ message: 'failed', errors: [{
                        ...contact_form_error,
                        field: '',
                        error_code: -1,
                        message: 'Fehler beim Senden der E-Mail: ' + error.message
                    }] 
                });
            }
        } 
        else 
        {
            res.status(400).json({ message: 'failed', errors: validation_result });
        }
    }

    #validate_contact_form_entries(name, email, message)
    {
        const validation_data = { name: name, email: email, message: message };

        const validation_methods = [
            this.#validate_name,
            this.#validate_email,
            this.#validate_message
        ];
    
        return validation_methods.map(validation_method => validation_method.call(this, validation_data))
                                  .filter(result => result.error_code !== 0);
    }

    #validate_name(data)
    {
        let error = {
            ...contact_form_error
        };
        const { name } = data;
        
        if (!name || name.length === 0)
        {
            error = {
                field: 'name',
                error_code: 1,
                message: 'Bitte geben Sie Ihren Namen an.'
            };
        }
        else if (name.length < 2)
        {
            error = {
                field: 'name',
                error_code: 2,
                message: 'Der Name muss mindestens 2 Zeichen lang sein.'
            };
        }

        return error;
    }

    #validate_email(data)
    {
        let error = {
            ...contact_form_error
        };
        const { email } = data;

        if (!email || email.length === 0)
        {
            error = {
                field: 'email',
                error_code: 1,
                message: 'Bitte geben Sie Ihre E-Mail-Adresse an.'
            };
        }
        else
        {
            const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email_regex.test(email)) 
            {
                error = {
                    field: 'email',
                    error_code: 2,
                    message: 'Ungültige E-Mail-Adresse.'
                };
            }
        }

        return error;
    }

    #validate_message(data)
    {
        let error = {
            ...contact_form_error
        };
        const { message } = data;

        if (!message || message.length === 0)
        {
            error = {
                field: 'message',
                error_code: 1,
                message: 'Die Nachricht ist ein Pflichtfeld.'
            };
        } 
        else if (message.split(' ').length < 3)
        {
            error = {
                field: 'message',
                error_code: 2,
                message: 'Die Nachricht muss mindestens 3 Wörter enthalten.'
            };
        }

        return error;
    }
}
