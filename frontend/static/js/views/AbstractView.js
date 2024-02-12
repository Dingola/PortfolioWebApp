'use strict';

import GalleryHandler from "./../components/GalleryHandler.js";

export default class 
{
    gallery_handler = null;

    constructor(params)
    {
        this.params = params;
    }

    set_handler(handler)
    {
        if (handler instanceof GalleryHandler)
        {
            this.gallery_handler = handler;
        }
    }

    set_title(title)
    {
        document.title = "Portfolio | " + title;
    }

    async generate_html(content) 
    {
        return `<div class="content"><div class="transition_spacer"></div>` + content + `</div>`;
    }
    
    
    async get_html() 
    {
        return this.generate_html('');
    }
}
