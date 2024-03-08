import AbstractView from "./AbstractView.js";

export default class extends AbstractView 
{
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
                                <div class="form_wrapper">
                                    <form class="form">
                                        <div class="form__group animate" data-animation-type="scroll_fade_in_from_right">
                                            <label>Your Name *</label>
                                            <div class="input_wrapper"><input class="form__control" label="Your Name" placeholder="" type="text" value=""></div>
                                        </div>
                                        <div class="form__group animate" data-animation-type="scroll_fade_in_from_left">
                                            <label>Your E-Mail *</label>
                                            <div class="input_wrapper"><input class="form__control" autocomplete="email" pattern="^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,20})$" label="Your E-Mail" placeholder="" type="text" value=""></div>
                                        </div>
                                        <div class="form__group animate" data-animation-type="scroll_fade_in_from_right">
                                            <label>Your Message *</label>
                                            <textarea class="form__control" label="Your Message" placeholder="" rows="5" spellcheck="false"></textarea>
                                        </div>
                                        <div class="form__footer animate" data-animation-type="fade_in">
                                            <p class="form__info_text">Ihre Daten werden nur zur Bearbeitung Ihrer Anfrage gespeichert. Alle Details finden Sie in der <a href="/privacy_policy" data-link>Datenschutzerklärung</a>.</p>
                                            <div class="form__controls">
                                                <button class="btn" type="submit">Send Message</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        `;

        return await super.generate_html(html);
    }
}
