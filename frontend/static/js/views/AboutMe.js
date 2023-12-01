import AbstractView from "./AbstractView.js";

export default class extends AbstractView
{
    constructor(params)
    {
        super(params);
        this.set_title("AboutMe");
    }

    async get_html() 
    {
        return await super.generate_html(`
            <div class="">
                <div>
                    <h1>Single Page App</h1>
                    <p>About</p>
                </div>
            </div>
        `);
    }
}
