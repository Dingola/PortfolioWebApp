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
import PageNavigationHandler from "./components/PageNavigationHandler.js";

class App 
{
    #current_route = null;

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
        this.page_navigation_handler = new PageNavigationHandler();
        this.form_groups_handler = null;
        
        // Define routes for the application, mapping paths to their associated views.
        this.routes = [
            { path: "/", view: this.views.Home, instance: null },
            { path: "/career", view: this.views.MyCareer, instance: null },
            { path: "/contact", view: this.views.Contact, instance: null },
            { path: "/impressum", view: this.views.Impressum, instance: null },
            { path: "/privacy_policy", view: this.views.PrivacyPolicy, instance: null }
        ];

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

        let theme_to_set = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme_to_set);
        this.navigation_handler.adjust_main_nav_background();  /* header_container_bg_color opacity set to 0 */

        this.router();
    }

    handle_resize()
    {
        this.set_content_blur_enabled(this.navigation_handler.is_burger_menu_open() && this.navigation_handler.is_burger_visible());
    }

    #compare_paths(previous_path, current_path)
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
   
        let view = null;
        let view_html = null;
        let never_loaded_before = (this.routes[match_index].instance == null);

        if (never_loaded_before)
        {
            view = new match.route.view(this.get_params(match));
            view.set_handler(new GalleryHandler());
            view.set_handler(this.page_navigation_handler)
            view_html = await view.get_html();
            this.routes[match_index].instance = view;
        }
        else
        {
            view = this.routes[match_index].instance;
            view_html = await view.get_last_loaded_html();
        }

        this.#current_route = this.routes[match_index];
        await this.switch_page_and_update(view_html);
        view.get_gallery_handler().setup_galleries();
        this.page_navigation_handler.update();
        this.previous_path = match.route.path;
        view.init();
    }

    async switch_page_and_update(page_html_content)
    {
        return new Promise((resolve, reject) => {
            const app = document.querySelector(".app");       
            const page_left = document.querySelector(".app__page_left");
            const page_right = document.querySelector(".app__page_right");
            var direction = this.#compare_paths(this.previous_path, this.#current_route.path);
            const is_left_to_right = (direction === 0);
            var transition_spacer = null;
            var offset = window.scrollY;
            
            if (this.previous_path == -1)
            {
                page_left.innerHTML = page_html_content;
            }
            else 
            {
                if (this.previous_path !== -1 && direction !== -1) 
                {
                    if (is_left_to_right) 
                    {
                        page_right.innerHTML = page_html_content;
                    } 
                    else 
                    {
                        app.style.left = "-100%";
                        page_right.innerHTML = page_left.innerHTML;
                        page_left.innerHTML = page_html_content;
                    }
                
                    if (this.data_link_clicked) 
                    {
                        const targetPage = is_left_to_right ? page_right : page_left;
                        const transition_spacer = targetPage.querySelector('.transition_spacer');
                        transition_spacer.style.height = offset + 'px';
                        transition_spacer.style.display = "block";
                    }
                
                    app.classList.add("app__page_transition");
                    app.style.transform = (is_left_to_right ? "translateX(-50%)" : "translateX(50%)");
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
                    page_left.innerHTML = page_html_content;
                    page_right.innerHTML = "";
                }

                this.data_link_clicked = false;
                this.init_scroll_animation_observer();

                if (!this.form_groups_handler)
                {
                    this.form_groups_handler = new FormGroupsHandler();
                }

                resolve("");
            }, 450);
        });
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
        const elements = document.querySelectorAll('.animate')
        let animation_attribute = null;

        elements.forEach((element) => {
            animation_attribute = element.getAttribute('data-animation-type');
            
            if (element.classList.contains(animation_attribute))
            {
                element.classList.remove('animate');
                element.classList.remove(animation_attribute);
            }
        })

        const page_left = document.querySelector(".app__page_left");

        if ((page_left != null) && (this.#current_route.instance != null))
        {
            this.#current_route.instance.set_last_loaded_html(page_left.innerHTML);
        }

        history.pushState(null, null, url);
        this.router();
    }

    set_content_blur_enabled(enabled)
    {
        const content = document.querySelector('.content');
        content.classList.toggle('blur', enabled);
    }

    switch_theme() 
    {
        const root_elem = document.documentElement;
        let data_theme = root_elem.getAttribute('data-theme'),
            new_theme;

        new_theme = (data_theme === 'light') ? 'dark' : 'light';

        root_elem.setAttribute('data-theme', new_theme);
        this.navigation_handler.adjust_main_nav_background();
    }

    init_scroll_animation_observer() 
    {
        const elements = document.querySelectorAll('.animate');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(async (entry) => {
                const data_animation_type = entry.target.getAttribute('data-animation-type');
                const intersection_ratio = entry.intersectionRatio;
            
                if ((data_animation_type === 'scroll_scale_in') && (intersection_ratio >= 0.7))
                {
                    const scale_duration = (entry.target.classList.contains('profilimage') ? 100 : 0);
                    await this.set_data_animation_type(entry, data_animation_type, scale_duration);
                } 
                else if (data_animation_type === 'header_fade_in_from_top') 
                {
                    const fade_duration = (window.scrollY >= (window.innerHeight / 3) || ((this.#current_route.path !== '/') ? 0 : 400));
                    await this.set_data_animation_type(entry, data_animation_type, fade_duration);
                } 
                else if ((data_animation_type === 'timeline_scale_in_from_top') || 
                           (data_animation_type === 'scroll_fade_in_from_btn' && (intersection_ratio >= 0.1)))
                {
                    await this.set_data_animation_type(entry, data_animation_type);
                }
                else if (intersection_ratio >= 0.3) 
                {
                    const animation_duration = data_animation_type === ('fade_in' ? 700 : 0);
                    await this.set_data_animation_type(entry, data_animation_type, animation_duration);
                }
            })
         }, { threshold: [0.0, 0.1, 0.3, 0.7, 1] });

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    sleep(milliseconds) 
    {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    async set_data_animation_type(entry, data_animation_type, timeout = 0)
    {
        await this.sleep(timeout);
        entry.target.classList.add(data_animation_type);
    }

    show_shortened_content(button)
    {
        const overlay_element = button?.parentElement;
        const content_element = overlay_element?.parentElement;
        
        if (content_element) 
        {
            content_element.style.maxHeight = "none";
            overlay_element.style.display = "none";
        }
    }

    toggle_hidden_elements(button) 
    {
        const parent_element = button?.parentElement?.parentElement;
        const hidden_elements = parent_element?.querySelectorAll(show_elements ? '.hidden' : '.visible') || [];
    
        hidden_elements.forEach(hidden_element => {
            hidden_element.classList.toggle('hidden');
            hidden_element.classList.toggle('visible');
        });
    
        button.textContent = hidden_elements.length ? 'Mehr anzeigen' : 'Weniger anzeigen';
    }
}

window.app = null;

// Instantiate the App class when the DOM is ready.
document.addEventListener("DOMContentLoaded", () => 
{
    window.app = new App();
});
