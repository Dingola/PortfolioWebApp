// Import various views used in the application.
import Home from "./views/Home.js";
import Contact from "./views/Contact.js";
import MyCareer from "./views/MyCareer.js";
import Impressum from "./views/Impressum.js";
import PrivacyPolicy from "./views/PrivacyPolicy.js";

// Import components
import NavigationHandler from "./components/NavigationHandler.js";
import FormGroupsHandler from "./components/FormGroupsHandler.js"
import GalleryHandler from "./components/GalleryHandler.js";

class App 
{
    constructor() 
    {
        // Import various views used in the application.
        this.views = {
            Home,
            MyCareer,
            Contact,
            Impressum,
            PrivacyPolicy
        };

        // Import components
        this.navigation_handler = new NavigationHandler();
        this.form_groups_handler = null;
        this.gallery_handler = new GalleryHandler();

        // Define routes for the application, mapping paths to their associated views.
        this.routes = [
            { path: "/", view: this.views.Home },
            { path: "/career", view: this.views.MyCareer },
            { path: "/contact", view: this.views.Contact },
            { path: "/impressum", view: this.views.Impressum },
            { path: "/privacy_policy", view: this.views.PrivacyPolicy }
        ];

        this.current_path = null;
        this.previous_path = -1;
        this.data_link_clicked = false;

        document.addEventListener('burger_toggled', (event) => {
            this.set_content_blur_enabled(event.detail.is_open);
        });

        // Helper function to convert a path into a regular expression for route matching.
        this.path_to_regex = path => new RegExp(`^${path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)')}$`);

        // Add an event listener to handle changes in the browser's history (e.g., back/forward buttons).
        window.addEventListener("popstate", this.router.bind(this));

        document.body.addEventListener("click", this.handle_click_event.bind(this));
        window.addEventListener('resize', this.handle_resize.bind(this));

        let local_storage = localStorage.getItem('theme'),
        theme_to_set = local_storage;

        if (!local_storage)
        {
            theme_to_set = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        document.documentElement.setAttribute('data-theme', theme_to_set);
        this.navigation_handler.adjust_main_nav_background();  /* header_container_bg_color opacity set to 0 */

        this.router();
    }

    handle_resize()
    {
        this.set_content_blur_enabled(this.navigation_handler.is_burger_menu_open() && this.navigation_handler.is_burger_visible());
    }

    compare_paths(previous_path, current_path) 
    {
        var result = -1;
        const previous_index = this.routes.findIndex(route => route.path === previous_path);
        const current_index = this.routes.findIndex(route => route.path === current_path);

        if (previous_index < current_index) 
        {
            result = 0;
        } 
        else if (previous_index > current_index) 
        {
            result = 1;
        } 
        else if (previous_index == current_index && !(previous_index === -1 || current_index === -1))
        {
            result = 2;
        }

        return result;
    }

    async router() 
    {
        // Generate a list of potential matches for the current routes.
        const potential_matches = this.routes.map(route => ({
            route,
            result: location.pathname.match(this.path_to_regex(route.path))
        }));

        const match_index = potential_matches.findIndex(potential_match => potential_match.result !== null);
        const match = match_index !== -1 ? potential_matches[match_index] : { route: this.routes[0], result: [location.pathname] };
   
        const view = new match.route.view(this.get_params(match));
        this.gallery_handler.clear_galleries();
        view.set_handler(this.gallery_handler);
        const view_html = await view.get_html();
        this.current_path = match.route.path;
        await this.switch_page_and_update(view_html);
        this.previous_path = match.route.path;
    }

    async switch_page_and_update(page_html_content)
    {
        const app = document.querySelector(".app");       
        const page_left = document.querySelector(".app__page_left");
        const page_right = document.querySelector(".app__page_right");
        var direction = this.compare_paths(this.previous_path, this.current_path);
        var current_scroll_y_pos = window.scrollY;


        var transition_spacer = null;
        var offset = window.scrollY;
        console.debug("scrollY", offset);
        
        if (this.previous_path == -1)
        {
            page_left.innerHTML = page_html_content;
        }
        else 
        {
            if (direction == 0) // left to right
            {   
                page_right.innerHTML = page_html_content;

                if (this.data_link_clicked)
                {
                    transition_spacer = page_right.querySelector('.transition_spacer');
                    transition_spacer.style.height = offset + 'px';
                    transition_spacer.style.display = "block";
                }

                app.classList.add("app__page_transition");
                app.style.transform = "translateX(-50%)";
            }
            else if (direction == 1) // right to left
            {                
                app.style = "left: -100%;";
                page_right.innerHTML = page_left.innerHTML;
                page_left.innerHTML = page_html_content;

                if (this.data_link_clicked)
                {
                    transition_spacer = page_left.querySelector('.transition_spacer');
                    transition_spacer.style.height = offset + 'px';
                    transition_spacer.style.display = "block";
                }

                app.classList.add("app__page_transition");
                app.style.transform = "translateX(50%)";
            }
        }

        this.navigation_handler.update_active_link();
        this.set_content_blur_enabled(this.navigation_handler.is_burger_menu_open());

        app.addEventListener('click', (event) => {
            if (app.contains(event.target) && this.navigation_handler.is_burger_visible() && this.navigation_handler.is_burger_menu_open()) 
            {
                this.navigation_handler.toggle_burger_menu();
            }
        });

        setTimeout(() => {
            app.classList.remove("app__page_transition");
            app.style = "left: 0%;";
            app.style.transform = "translateX(0%)";
            page_left.innerHTML = page_html_content;

            if (transition_spacer != null)
            {
                transition_spacer.style.height = '0px';
                transition_spacer.style.display = "none";
                window.scrollTo(0, 0);
            }

            if (this.previous_path != -1 && direction != -1)
            {
                if (direction == 0)
                {
                    page_left.innerHTML = page_html_content;
                    page_right.innerHTML = "";
                }
                else if (direction == 1)
                {
                    page_left.innerHTML = page_html_content;
                    page_right.innerHTML = "";
                }
            }

            this.data_link_clicked = false;
            this.gallery_handler.setup_galleries();

            if (!this.form_groups_handler)
            {
                this.form_groups_handler = new FormGroupsHandler();
            }
        }, 450); // Die Zeit sollte der Transition-Zeit in der CSS-Datei entsprechen
    }

    get_params(match) 
    {
        const values = match.result.slice(1);
        const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

        return keys.reduce((params, key, i) => 
        {
            params[key] = values[i];
            return params;
        }, {});
    }

    handle_click_event(event) 
    {
        if (event.target.matches("[theme-switch"))
        {
            this.switch_theme();
        }
        else if (event.target.matches("[data-link]")) 
        {
            this.data_link_clicked = true;
            event.preventDefault();
            this.navigate_to(event.target.href);
        }
    }

    navigate_to(url)
    {
        history.pushState(null, null, url);
        this.router();
    }

    set_content_blur_enabled(enabled)
    {
        const content = document.querySelector('.content');
        content.classList.toggle('blur', enabled);
    }

    switch_theme() {
        const root_elem = document.documentElement;
        let data_theme = root_elem.getAttribute('data-theme'),
            new_theme;

        new_theme = (data_theme === 'light') ? 'dark' : 'light';

        root_elem.setAttribute('data-theme', new_theme);
        localStorage.setItem('theme', new_theme);
        this.navigation_handler.adjust_main_nav_background();
    }
}

// Instantiate the App class when the DOM is ready.
document.addEventListener("DOMContentLoaded", () => 
{
    const app = new App();
});
