import AbstractView from "./AbstractView.js";

export default class extends AbstractView 
{
    constructor(params) 
    {
        super(params);
        this.set_title("Impressum");
    }

    async get_html()
     {
        const html = `
            <div class="ctn_container">
                <div class="ctn_container__item">
                    <div class="ctn_box">
                        <h1 class="line_accent">&ltImpressum/&gt</h1>
                        <div class="ctn_box__wrapper">
                        </div>
                    </div>
                </div>
            </div>
        `;

        return await super.generate_html(html);
    }
}
