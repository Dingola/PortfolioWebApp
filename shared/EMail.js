`use strict`;

export default class EMail
{
    #sender_email;
    #sender_name;
    #to;
    #subject;
    #text;

    constructor(sender_email, sender_name, to, subject, text = '')
    {
        this.#sender_email = sender_email;
        this.#sender_name = sender_name;
        this.#to = to;
        this.#subject = subject;
        this.#text = text;
    }

    get_sender_email()
    {
        return this.#sender_email;
    }

    get_sender_name()
    {
        return this.#sender_name;
    }

    get_to()
    {
        return this.#to;
    }

    get_subject()
    {
        return this.#subject;
    }

    get_text()
    {
        return this.#text;
    }
}
