// Import components
import ColorConverter from "./ColorConverter.js";

export default class NavigationHandler 
{
    constructor() 
    {
        this.burger_toggled = false;
        this.#setup_event_listeners();
        this.#update_height();
    }

    #setup_event_listeners() 
    {
        document.body.addEventListener('click', this.handle_click_event.bind(this));
        window.addEventListener('scroll', this.handle_scroll_event.bind(this));
        window.addEventListener('resize', this.#update_height.bind(this));
    }

    is_burger_menu_open()
    {
        return this.burger_toggled;
    }

    is_burger_visible()
    {
        const burger = document.querySelector('.burger');
        const styles = window.getComputedStyle(burger);
        return styles.getPropertyValue('display') === 'block';
    }

    handle_scroll_event()
    {
        this.adjust_main_nav_background();

        const scroll_to_top_btn = document.querySelector('.scroll_to_top_btn');

        if (window.scrollY > 0)
        {
            setTimeout(function() {
                scroll_to_top_btn.style.display = "block";
                scroll_to_top_btn.offsetHeight;
                scroll_to_top_btn.style.opacity = 1;
            }, 50);
        } 
        else
        {
            setTimeout(function() {
                scroll_to_top_btn.style.opacity = 0;
                scroll_to_top_btn.offsetHeight;
            }, 50);

            setTimeout(function() {
                scroll_to_top_btn.style.display = "none";
            }, 300);
        }

        setTimeout(function() {
            const scroll_percent = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
            document.documentElement.style.setProperty('--scroll-progress', scroll_percent + '%');
        }, 100);
    }

    handle_click_event(event)
    {
        this.handle_burger_toggle(event);
        this.handle_scroll_to_top_btn_clicked(event);
    }

    handle_scroll_to_top_btn_clicked(event)
    {
        const btn = document.querySelector('.scroll_to_top_btn');

        if (event.target === btn)
        {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
        }
    }

    handle_burger_toggle(event) 
    {
        const burger = document.querySelector('.burger');

        if (event.target === burger) 
        {
            this.toggle_burger_menu();
        }
        else
        {
            if (this.is_burger_visible())
            {
                const links = document.querySelectorAll('.nav__item a');
                links.forEach((link) => {
                    if (event.target === link)
                    {
                        this.toggle_burger_menu();
                    }
                });
            }
        }
    }

    toggle_burger_menu()
    {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav__ul');
        nav.classList.add('nav__ul--animating');
        nav.classList.toggle('nav__ul--active');
        setTimeout(() => {
            nav.classList.remove('nav__ul--animating');
        }, 500);
        burger.classList.toggle('burger--toggled');
        this.burger_toggled = nav.classList.contains('nav__ul--active');
        const burger_event = new CustomEvent('burger_toggled', { detail: { is_open: this.burger_toggled } });
        document.dispatchEvent(burger_event);
    }

    #update_height()
    {
        const header_height = document.querySelector("header").offsetHeight;
        document.querySelector(".nav").style.height = `${header_height}px`;
    }

    adjust_main_nav_background() 
    {
        const header_height = document.querySelector("header").offsetHeight;
        const scroll_offset = window.scrollY;
        const target_bg_opacity = 0.90;
        const target_box_shadow_opacity = 0.7;
        const current_bg_opacity = Math.min(scroll_offset / (1 * header_height), target_bg_opacity);
        const current_box_shadow_opacity = Math.min(scroll_offset / (1 * header_height), target_box_shadow_opacity);

        const header_container = document.querySelector(".header_container");
        // heade_container.style.backgroundColor = `rgba(236, 236, 236, ${current_bg_opacity})`;

        const root_styles = getComputedStyle(document.documentElement);
        const header_bg_color = root_styles.getPropertyValue('--header-bg-color');

        // const current_header_container_bg_color = header_container.backgroundColor;

        // if (typeof current_header_container_bg_color !== "undefined")
        // {
            const rgba_values = ColorConverter.hex_to_rgb(header_bg_color);
            // const currentOpacity = parseFloat(rgba_values[3]);

            // const rgba_values = ColorConverter.hex_to_rgb(header_bg_color);
            // const current_opacity = parseFloat(rgba_values[3]);
            const new_opacity = Math.min(scroll_offset / (1 * header_height), target_bg_opacity);
            header_container.style.backgroundColor = `rgba(${rgba_values[0]}, ${rgba_values[1]}, ${rgba_values[2]}, ${new_opacity})`;
            // header_container.style.boxShadow = `0px 0px 3px 2px rgba(0, 0, 0, ${current_box_shadow_opacity})`;
        // }

    }

    update_active_link()
    {
        const current_path = window.location.pathname;
        const links = document.querySelectorAll('.nav__item');

        links.forEach((link) => 
        {
            const anchor = link.querySelector('[data-link]');

            if (anchor.pathname === current_path) 
            {
                link.classList.add('nav__item--active');
            } 
            else 
            {
                link.classList.remove('nav__item--active');
            }
        });
    }


}
