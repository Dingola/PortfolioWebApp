
export default class PageNavigationHandler 
{
    #page_section_link_names = [];
    #page_section_observer = null;
    #toggle_btn = null;
    #page_nav_is_open = true;

    #css_class_page_nav = 'page_nav';
    #css_class_toggle_btn = 'page_nav__toggle_btn';
    #css_class_toggle_btn_icon_active = 'close_icon';
    #css_class_link_list = 'page_nav__list';
    #css_class_anchor_id_part = 'section_anchor';  // e.g. section_anchor_1, section_anchor_2 .. section_anchor_n
    #css_class_link_active = 'page_nav__link--active';

    #css_anim_class_page_nav_open = 'open_page_nav';

    constructor() 
    {
        this.#init();
    }

    add_page_section_link(link_name)
    {
        this.#page_section_link_names.push(link_name)
        return (this.#css_class_anchor_id_part + '_' + this.#page_section_link_names.length);
    }

    update()
    {
        this.#clear_links_container();
        const link_count = this.#create_links();
        let page_nav = document.querySelector('.' + this.#css_class_page_nav);

        if (page_nav != null)
        {
            page_nav.style.display = (link_count > 0 ? 'block' : 'none');
        }
        else
        {
            const error_msg = `${this.constructor.name}: Page-Nav-Container not found. cssClass: "` + this.#css_class_page_nav + `"`;
            console.error(error_msg);
        }
    }

    toggle_page_navigation_visibility() 
    {
        let page_nav = document.querySelector('.' + this.#css_class_page_nav);

        if (page_nav != null)
        {
            page_nav.classList.toggle(this.#css_anim_class_page_nav_open);
        }
    }

    #init()
    {
        let result = `
            <div class="${this.#css_class_page_nav} animate" data-animation-type="fade_in">
                <div class="page_nav__header">
                    <button class="${this.#css_class_toggle_btn} page_nav_open_icon size_before_42"></button>
                </div>
                <div class="page_nav__content">
                    <ul class="${this.#css_class_link_list}">
                    </ul>
                </div>
            </div>
        `;

        let fragment = document.createRange().createContextualFragment(result);
        document.body.appendChild(fragment);

        this.#add_event_listeners();
    }

    #add_event_listeners() 
    {
        this.#toggle_btn = document.querySelector('.' + this.#css_class_toggle_btn);

        if (this.#toggle_btn != null)
        {
            this.#toggle_btn.addEventListener('click', this.#handle_toggle_btn_clicked.bind(this));
        }
    }

    #handle_toggle_btn_clicked()
    {
        this.#toggle_btn.classList.toggle(this.#css_class_toggle_btn_icon_active);
        this.toggle_page_navigation_visibility();
        this.#page_nav_is_open = !this.#page_nav_is_open;
    }

    #create_links()
    {
        const page_nav__list = document.querySelector('.' + this.#css_class_link_list);
        let li_element = null;
        let a_element = null;
        let span_element = null;
        let index = 0;
        let page_section_elements = [];
        let first_section = true;

        if (page_nav__list != null)
        {
            this.#page_section_link_names.forEach((page_section_link_name) => {
                const page_section_element = document.querySelector('.' + this.#css_class_anchor_id_part + '_' + ++index);

                if (page_section_element != null)
                {
                    a_element = document.createElement('a');
                    a_element.href = '#';

                    span_element = document.createElement('span');
                    span_element.textContent = page_section_link_name;
                    a_element.appendChild(span_element);

                    if (first_section)
                    {
                        a_element.addEventListener("click", (event) => {
                            event.preventDefault();
                            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                        });
                        first_section = false;
                    }
                    else
                    {
                        a_element.addEventListener("click", (event) => {
                            event.preventDefault();
                            page_section_element.scrollIntoView({block: "start", behavior: "smooth"});
                        });
                    }
                    
                    li_element = document.createElement('li');
                    li_element.appendChild(a_element);

                    page_nav__list.appendChild(li_element);
                    page_section_elements.push({section_element: page_section_element, link_element: a_element, intersection_ratio: 0 });
                }
            });

            this.#create_page_section_oberserver(page_section_elements);
        }
        else
        {
            const error_msg = `${this.constructor.name}: Link-List-Container not found. cssClass: "` + this.#css_class_link_list + `"`;
            console.error(error_msg);
        }

        return page_section_elements.length;
    }

    #create_page_section_oberserver(page_section_elements)
    {
        this.#page_section_observer = new IntersectionObserver((entries) => {
            entries.forEach(async (entry) => {
                let index = page_section_elements.findIndex(element => element.section_element === entry.target);

                if (index !== -1) 
                {
                    page_section_elements[index].intersection_ratio = entry.intersectionRatio;
                }

                const most_visible_element = page_section_elements.reduce((prev, current) => {
                    return (prev.intersection_ratio >= current.intersection_ratio) ? prev : current;
                });

                page_section_elements.forEach((item) => {
                    item.link_element.classList.remove(this.#css_class_link_active);
                });

                most_visible_element.link_element.classList.add(this.#css_class_link_active);
            })
        }, { threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] });

        page_section_elements.forEach(element => {
            this.#page_section_observer.observe(element.section_element);
        });
    }

    #clear_links_container()
    {
        const page_nav__list = document.querySelector('.' + this.#css_class_link_list);

        if (page_nav__list != null)
        {
            page_nav__list.innerHTML = '';
        }
        else
        {
            const error_msg = `${this.constructor.name}: Page-Nav-Container not found. cssClass: "` + this.#css_class_link_list + `"`;
            console.error(error_msg); 
        }
    }
}
