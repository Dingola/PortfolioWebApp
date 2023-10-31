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

    set_content_html(content_html)
    {
        this.content_html = `<div class="content">` + content_html + `</div>`;
    }
    
    async get_html()
    {
        return this.content_html;
    }
}
