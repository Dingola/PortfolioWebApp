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
        return await super.generate_html(`
            <div class="">
                <div>
                    <h1>Single Page App</h1>
                    <p>Contact</p>
                </div>
            </div>
        `);
    }
}
