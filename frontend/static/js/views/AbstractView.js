export default class 
{
    constructor(params)
    {
        this.params = params;
    }

    set_title(title)
    {
        document.title = "Portfolio | " + title;
    }

    async generate_html(content) 
    {
        return `<div class="content">` + content + `</div>`;
    }
    
    
    async get_html() 
    {
        return this.generate_html('');
    }
}
