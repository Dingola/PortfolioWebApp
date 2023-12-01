const nav_slide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav__ul');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav__ul--active');
        burger.classList.toggle('burger--toggled');
    });

    const links = document.querySelectorAll('.nav__item');
    
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            links.forEach((link) => {
                link.classList.remove('nav__item--active');
            });

            e.preventDefault();
            link.classList.add('nav__item--active');
            nav.classList.remove('nav__ul--active');
            burger.classList.remove('burger--toggled');
        });
    });
}

// Function to set the navigation height based on the header height.
const set_nav_height = () => {
    const headerHeight = document.querySelector("header").offsetHeight;
    document.querySelector(".nav").style.height = `${headerHeight}px`;
};
  
document.addEventListener("DOMContentLoaded", set_nav_height);

window.addEventListener("resize", set_nav_height);
  
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".nav");

    // Scroll event listener for adjusting background transparency.
    window.addEventListener("scroll", () => {
        const header_height = document.querySelector("header").offsetHeight;
        const scroll_offset = window.scrollY;
        const target_bg_opacity = 0.95;
        const target_box_shadow_opacity = 0.5;
        const current_bg_opacity = Math.min(scroll_offset / (2 * header_height), target_bg_opacity);
        const current_box_shadow_opacity = Math.min(scroll_offset / (2 * header_height), target_box_shadow_opacity);

        nav.style.backgroundColor = `rgba(28, 36, 51, ${current_bg_opacity})`;
        nav.style.boxShadow = `0px 0px 25px 6px rgba(0, 0, 0, ${current_box_shadow_opacity})`;
    });
});

// Function to set the "active" state for the menu item.
export const set_active_nav_link = () => {
    const current_path = window.location.pathname;
    const links = document.querySelectorAll('.nav__item');

    // Iterate through each link and check if its child anchor's data-link attribute matches the current path.
    links.forEach((link) => {
        const anchor = link.querySelector('[data-link]');

        if (anchor.pathname == current_path) {
            link.classList.add('nav__item--active');
        } else {
            link.classList.remove('nav__item--active');
        }
    });
};


nav_slide();
