export default class NavigationHandler 
{
    constructor() 
    {
        this.burger_toggled = false;
        this.setup_event_listeners();
        this.update_height();
    }

    setup_event_listeners() 
    {
        document.body.addEventListener('click', this.handle_burger_toggle.bind(this));
        window.addEventListener('scroll', this.adjust_background.bind(this));
        window.addEventListener('resize', this.update_height.bind(this));
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

    update_height()
    {
        const header_height = document.querySelector("header").offsetHeight;
        document.querySelector(".nav").style.height = `${header_height}px`;
    }

    adjust_background() 
    {
        const header_height = document.querySelector("header").offsetHeight;
        const scroll_offset = window.scrollY;
        const target_bg_opacity = 0.95;
        const target_box_shadow_opacity = 0.5;
        const current_bg_opacity = Math.min(scroll_offset / (2 * header_height), target_bg_opacity);
        const current_box_shadow_opacity = Math.min(scroll_offset / (2 * header_height), target_box_shadow_opacity);

        const nav = document.querySelector(".nav");
        nav.style.backgroundColor = `rgba(28, 36, 51, ${current_bg_opacity})`;
        nav.style.boxShadow = `0px 0px 25px 6px rgba(0, 0, 0, ${current_box_shadow_opacity})`;
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
