import AbstractView from "./AbstractView.js";

export default class extends AbstractView 
{
    constructor(params) 
    {
        super(params);
        this.set_title("Impressum");
        this.set_name("Impressum");
    }

    async get_html()
     {
        const html = `
            <div class="ctn_container">
                <div class="ctn_container__item">
                    <div class="ctn_box animate" data-animation-type="scroll_fade_in_from_btn">
                        <h1 class="line_accent">&ltImpressum/&gt</h1>
                        <div class="ctn_box__inner_box impressum">
                            <div class="text">
                                <h3>Angaben gemäß § 5 TMG</h3>
                                <br>
                                <h2>Herausgeber und Autor:</h2>
                                <p>
                                Adrian Helbig<br>
                                Buschrosensteig 9<br>
                                12347 Berlin
                                <p>
                                <br>
                                <h2>Kontakt:</h2>
                                <p>E-Mail: email@AdrianHelbig.de</p>
                                <a href="/contact" class="link" data-link>Kontaktformular</a>
                                <br><br>
                                <h2>Datenschutz:</h2>
                                <p>Die Datenschutzerklärung finden Sie <a href="/privacy_policy" data-link>hier</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return await super.generate_html(html);
    }
}
