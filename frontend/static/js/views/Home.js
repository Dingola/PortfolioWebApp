import AbstractView from "./AbstractView.js";

export default class extends AbstractView
{
    constructor(params)
    {
        super(params);
        this.set_title("Home");
        this.set_content_html(`
            <div class="home">
                <div class="home__text">
                    <h1>Welcome, I'm a C++ Software Developer</h1>
                    <p>Text..</p>
                </div>
                <div class="home__profilimage">
                    <div class="flex_center">
                    <img src="static/css/resources/images/Profilimage.jpg" alt="Profilimage" class="border_circle"> 
                    </div>
                </div>
                <div class="home__external_links">
                    <a target="_blank" href="https://github.com/Dingola">
                        <img src="static/css/resources/images/logos/github/github-mark/github-mark-white.png" alt="GitHub">
                        <p>GitHub</p>
                    </a>
                    <a target="_blank" href="https://linkedin.com/in/adrian-helbig-b7b023251">
                        <img src="static/css/resources/images/logos/LinkedIn-Logos/LI-In-Bug.png" alt="LinkedIn">
                        <p>LinkedIn</p>
                    </a>
                </div>
            </div>
        `);
    }
}
