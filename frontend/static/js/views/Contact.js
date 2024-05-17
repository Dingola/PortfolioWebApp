import AbstractView from "./AbstractView.js";

export default class extends AbstractView 
{
    #input_name;
    #input_email;
    #input_message;
    #name = '';
    #email = '';
    #message = '';
    #send_result_message = '';

    constructor(params) 
    {
        super(params);
        this.set_title("Contact");
        this.set_name("Contact");
    }

    async get_html() 
    {
        const html = `
            <div class="ctn_container">
                <div class="ctn_container__item">
                    <div class="ctn_box animate" data-animation-type="scroll_fade_in_from_btn">
                        <h1 class="line_accent">&ltContact/&gt</h1>
                        <div class="container">
                            <div class="container__item">
                                ${this.#generate_contact_form()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return await super.generate_html(html);
    }

    async init() 
    {
        const contact_form = document.querySelector('#contact_form');
    
        if (contact_form) 
        {
            contact_form.addEventListener('submit', this.#handle_submit.bind(this));
        }

        this.#input_name = document.querySelector('[name="name"]');
        this.#input_name.value = this.#name;
        this.#input_name.addEventListener("input", (event) => {
            this.#name = event.target.value;
        });

        this.#input_email = document.querySelector('[name="email"]');
        this.#input_email.value = this.#email;
        this.#input_email.addEventListener("input", (event) => {
            this.#email = event.target.value;
        });

        this.#input_message = document.querySelector('[name="message"]');
        this.#input_message.value = this.#message;
        this.#input_message.addEventListener("input", (event) => {
            this.#message = event.target.value;
        });
    }

    async clear()
    {
        await this.hide_contact_form_result();
    }
    
    async #handle_submit(event) 
    {
        event.preventDefault();
    
        const contact_form = event.target;
        const form_data = new FormData(contact_form);
        const form_data_object = Object.fromEntries(form_data);

        try {
            const response = await fetch('/api/contact/send_email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form_data_object)
            });
    
            if (!response.ok) 
            {
                const result = await response.json();
                this.#handle_errors(result.errors);
            } 
            else 
            {
                this.#input_name.value = '';
                this.#input_name.dispatchEvent(new Event('input', { bubbles: true }));
                this.#input_email.value = '';
                this.#input_email.dispatchEvent(new Event('input', { bubbles: true }));
                this.#input_message.value = '';
                this.#input_message.dispatchEvent(new Event('input', { bubbles: true }));

                this.#clear_and_hide_errors();
                await this.toggle_contact_form_result_visiblity();
            }
        } catch(error) {
            console.error('Fehler beim Senden der E-Mail:', error);
            this.#set_send_result_message(`Die Nachricht konnte leider nicht verschickt werden.
            Bitte versuchen Sie es später erneut oder kontaktieren Sie mich alternativ über einen meiner Social Links.`);
            await this.toggle_contact_form_result_visiblity();
            throw error;
        }
    }
    
    #handle_errors(errors) {
        const error_fields = ['name', 'email', 'message'];
    
        error_fields.forEach(field => {
            const error_container = document.querySelector(`#error_${field}`);
            this.#clear_and_hide_container(error_container);
            const error = errors.find(e => e.field === field);

            if (error) 
            {
                error_container.style.display = 'block';
                this.#display_error_message(error.message, error_container);
            }
        });
    }

    #clear_and_hide_errors()
    {
        const error_fields = ['name', 'email', 'message'];
    
        error_fields.forEach(field => {
            const error_container = document.querySelector(`#error_${field}`);
            this.#clear_and_hide_container(error_container);
        });
    }

    #display_error_message(message, container) 
    {
        const error_message = document.createElement('p');
        error_message.textContent = message;
        container.appendChild(error_message);
    }

    #clear_and_hide_container(container)
    {
        container.style.display = 'none';
        container.innerHTML = '';
    }

    #generate_contact_form() 
    {
        return `
            <div class="form_wrapper">
                ${this.#generate_contact_form_result()}
                <form id="contact_form" class="form" action="/api/contact/send_email" method="post">
                    <div class="form__group animate" data-animation-type="scroll_fade_in_from_right">
                        <label>Ihr Name *</label>
                        <div class="input_wrapper"><input name="name" class="form__control" label="Your Name" placeholder="" type="text" value=""></div>
                    </div>
                    <div id="error_name" class="form__error"></div>
                    <div class="form__group animate" data-animation-type="scroll_fade_in_from_left">
                        <label>Ihre E-Mail Adresse *</p></label>
                        <div class="input_wrapper"><input name="email" class="form__control" label="Your E-Mail" placeholder="" type="text" value=""></div>
                    </div>
                    <div id="error_email" class="form__error"></div>
                    <div class="form__group animate" data-animation-type="scroll_fade_in_from_right">
                        <label>Ihre Nachricht *</label>
                        <textarea name="message" class="form__control" label="Your Message" placeholder="" rows="5" spellcheck="false"></textarea>
                    </div>
                    <div id="error_message" class="form__error"></div>
                    <div class="form__footer animate" data-animation-type="fade_in">
                        <p class="form__info_text">Ihre Daten werden nur zur Bearbeitung Ihrer Anfrage gespeichert. Alle Details finden Sie in der <a href="/privacy_policy" data-link>Datenschutzerklärung</a>.</p>
                        <div class="form__controls">
                            <button class="btn" value="submit">Absenden</button>
                        </div>
                    </div>
                </form>
            </div>`;
    }

    #generate_contact_form_result()
    {
        const name = this.get_name();

        return `
            <div class="contact_form_result hidden contact_form_result_anim_reverse">
                <div class="contact_form_result__header">
                    <button class="btn_2 close2_icon size_after_42" onclick="app.get_instance('${name}').toggle_contact_form_result_visiblity()"></button>
                </div>
                <div class="contact_form_result__content">
                    <p class="contact_form_result__message">Vielen Dank! Ihre Nachricht wurde erfolgreich übermittelt.</p>
                    <div id="contact_form_result_icon" class="hook_icon size_after_42"></div>
                    <a class="link" href="/" data-link="">Zur Startseite</a>
                </div>
            </div>
        `;
    }

    #set_send_result_message(message = "")
    {
        const contact_form_result = document.querySelector('.contact_form_result');
        const message_element = contact_form_result.querySelector('.contact_form_result__message');
        message_element.textContent = message || "Vielen Dank! Ihre Nachricht wurde erfolgreich übermittelt.";

        const icon_element = contact_form_result.querySelector('#contact_form_result_icon');

        if (message) 
        {
            icon_element.classList.replace('hook_icon', 'error_icon');
        }
        else 
        {
            icon_element.classList.replace('error_icon', 'hook_icon');
        }
    }
    
    async toggle_contact_form_result_visiblity(message = "") 
    {
        return new Promise((resolve, reject) => {
            const contact_form_result = document.querySelector('.contact_form_result');

            if (contact_form_result.classList.contains('hidden')) 
            {
                contact_form_result.classList.remove('hidden');
                contact_form_result.classList.remove('contact_form_result_anim_reverse');
                contact_form_result.classList.add('contact_form_result_anim');
            } 
            else 
            {
                contact_form_result.classList.remove('contact_form_result_anim');
                contact_form_result.classList.add('contact_form_result_anim_reverse');

                setTimeout(() => {
                    contact_form_result.classList.add('hidden');
                }, 200);

                setTimeout(() => {
                    resolve();
                }, 500);
            }
        });
    }

    async hide_contact_form_result()
    {
        return new Promise((resolve, reject) => {
            const contact_form_result = document.querySelector('.contact_form_result');

            if (!contact_form_result.classList.contains('hidden'))
            {
                contact_form_result.classList.remove('contact_form_result_anim');
                contact_form_result.classList.add('contact_form_result_anim_reverse');

                setTimeout(() => {
                    contact_form_result.classList.add('hidden');
                }, 200);

                setTimeout(() => {
                    resolve();
                }, 500);
            }
            else
            {
                resolve();
            }   
        });
    }
}
