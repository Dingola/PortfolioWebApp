import AbstractView from "./AbstractView.js";

export default class extends AbstractView 
{
    #input_name;
    #input_email;
    #input_message;
    #name = '';
    #email = '';
    #message = '';

    constructor(params) 
    {
        super(params);
        this.set_title("Contact");
    }

    async get_html() 
    {
        const html = `
            <div class="ctn_container">
                <div class="ctn_container__item">
                    <div class="ctn_box animate" data-animation-type="scroll_fade_in_from_btn">
                        <h1 class="line_accent">&ltContact/&gt</h1>
                        <div class="ctn_box__wrapper">
                            <div class="ctn_box__inner_box">
                                ${this.#generate_contact_form()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return await super.generate_html(html);
    }

    init() 
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
                this.#input_email.value = '';
                this.#input_message.value = '';
                this.#name = '';
                this.#email = '';
                this.#message = '';
                this.#clear_and_hide_errors();
            }
        } catch(error) {
            console.error('Fehler beim Senden der E-Mail:', error);
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

    #generate_contact_form() {
        return `
            <div class="form_wrapper">
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
}
