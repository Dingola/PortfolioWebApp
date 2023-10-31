import AbstractView from "./AbstractView.js";

export default class extends AbstractView
{
    constructor(params)
    {
        super(params);
        this.set_title("Contact");
        this.set_content_html(`
            <div>
                <h1>Single Page App</h1>
                <p>Contact</p>
            </div>
        `);
    }
}
