import AbstractView from "./AbstractView.js";

export default class extends AbstractView
{
    constructor(params)
    {
        super(params);
        this.set_title("MyCareer");
    }

    async get_html() 
    {
        return await super.generate_html(`
            <div class="ctn_container">
                <div class="ctn_container__item">
                    <div class="ctn_box">
                        <h1 class="line_accent">&ltMy Career/&gt</h1>
                    </div>
                </div>
            </div>
        `);
    }
}
