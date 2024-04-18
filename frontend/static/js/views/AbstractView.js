'use strict';

import PageNavigationHandler from "../components/PageNavigationHandler.js";
import GalleryHandler from "./../components/GalleryHandler.js";

export default class 
{
    gallery_handler = null;
    page_navigation_handler = null;
    last_loaded_html = null;

    constructor(params)
    {
        this.params = params;
    }

    init() {}

    set_handler(handler)
    {
        if (handler instanceof GalleryHandler)
        {
            this.gallery_handler = handler;
        }
        else if (handler instanceof PageNavigationHandler)
        {
            this.page_navigation_handler = handler
        }
    }

    get_gallery_handler()
    {
        return this.gallery_handler;
    }

    get_page_navigation_handler()
    {
        return this.page_navigation_handler;
    }

    set_title(title)
    {
        document.title = "Portfolio | " + title;
    }

    async generate_html(content) 
    {
        this.last_loaded_html = `<div class="content"><div class="transition_spacer"></div>` + content + `</div>`;
        return this.last_loaded_html;
    }
    
    async get_html() 
    {
        return this.generate_html('');
    }

    set_last_loaded_html(html)
    {
        this.last_loaded_html = html;
    }

    get_last_loaded_html()
    {
        return this.last_loaded_html;
    }
}
