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

nav_slide();