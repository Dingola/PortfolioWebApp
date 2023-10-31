import AbstractView from "./AbstractView.js";

export default class extends AbstractView
{
    constructor(params)
    {
        super(params);
        this.set_title("Home");
        this.set_content_html(`
            <div>
                <h1>Single Page App</h1>
                <p>Home</p>
            </div>
        `);
    }
}
