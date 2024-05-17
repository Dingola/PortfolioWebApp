'use strict';

export default class GalleryHandler 
{
    #galleries = null;
    #current_gallery_id = -1;
    #img_element = null;
    #current_lightbox_image_index = -1;

    #lightbox = null;
    #lightbox_img = null;
    #lightbox_current_image_info_box_text = null;
    #close_btn = null;
    #prev_btn = null;
    #next_btn = null;
    #lightbox_visible = false;

    constructor() 
    {
        this.#init_lightbox();
    }

    setup_galleries()
    {
        let gallery_element = null;
        let img_element = null;
        
        if (this.#galleries != null)
        {
            this.#galleries.forEach((value, key) => {
                gallery_element = document.getElementById(key);
                
                if (gallery_element != null)
                {
                    img_element = gallery_element.querySelector('img');

                    if (img_element == null)
                    {
                        img_element = document.createElement('img');
                        gallery_element.appendChild(img_element);
                    }

                    img_element.classList.add('current_img');

                    if (value.images.length > 1) 
                    {
                        this.#create_overlay(key, gallery_element, img_element);
                    }
                    
                    img_element.src = value.images[value.current_image_index];
                    img_element.addEventListener('click', (event) => {
                        this.#current_gallery_id = key;
                        this.#img_element = img_element;
                        this.show_lightbox();
                    });
                }
            });
        }
    }

    create_gallery(images)
    {
        let gallery_key = '';
        let gallery_data = null;
        let current_image_index = 0;

        if (Array.isArray(images))
        {
            if (images.length == 0)
            {
                current_image_index = -1;
            }

            gallery_data = { images: images, current_image_index: current_image_index };

            if (this.#galleries == null)
            {
                gallery_key = '.gallery_0';
                this.#galleries = new Map([[gallery_key, gallery_data]]);
            }
            else
            {
                gallery_key = ('.gallery_' + this.#galleries.size);
                this.#galleries.set(gallery_key, gallery_data);
            }
        }

        return gallery_key;
    }

    show_lightbox()
    {
        this.set_lightbox_visible(true);
        this.#set_current_image();
        this.#update_current_image_info() ;
    }

    close_lightbox()
    {
        this.set_lightbox_visible(false);
    }
    
    set_lightbox_visible(visible)
    {
        this.#lightbox_visible = visible;

        if (visible)
        {
            this.#lightbox.style.display = 'flex';
            this.#lightbox_img.classList.add('appear_anim');
            setTimeout(() => {
                this.#lightbox_img.classList.remove('appear_anim');
            }, 400);
        }
        else
        {
            this.#current_lightbox_image_index = -1;
            this.#lightbox_img.classList.add('disappear_anim');
            this.#lightbox.classList.add('disappear_anim_2');
            
            // setTimeout(() => {
            //     this.#lightbox.style.display = 'none';
            // }, 300);

            setTimeout(() => {
                this.#lightbox.style.display = 'none';
                this.#lightbox.classList.remove('disappear_anim_2');
                this.#lightbox_img.classList.remove('disappear_anim');
            }, 300);
        }
    }

    show_next_image()
    {
        let current_image_data = this.#get_current_gallery_data();
        let current_image_index = this.#get_current_image_index();
        let current_image_index_temp = -1;

        if (current_image_index != -1)
        {
            if (this.#lightbox_visible)
            {
                if (this.#current_lightbox_image_index == -1)
                {
                    this.#current_lightbox_image_index = current_image_index;
                }

                current_image_index_temp = ((this.#current_lightbox_image_index + 1) % current_image_data.images.length);
                this.#current_lightbox_image_index = current_image_index_temp;

                this.#lightbox_img.classList.add('lb_next_image');

                setTimeout(() => {
                    this.#set_current_image();
                    this.#update_current_image_info();
                }, 350);
                
                setTimeout(() => {
                    this.#lightbox_img.classList.remove('lb_next_image');
                }, 700);
            }
            else
            {
                current_image_index_temp = ((current_image_index + 1) % current_image_data.images.length);
                this.#set_current_image_index(current_image_index_temp);

                this.#img_element.classList.add('next_image');

                setTimeout(() => {
                    this.#set_current_image();
                }, 350);

                setTimeout(() => {
                    this.#img_element.classList.remove('next_image');
                }, 700);
            }
        }
    }

    show_prev_image()
    {
        let current_image_data = this.#get_current_gallery_data();
        let current_image_index = this.#get_current_image_index();
        let current_image_index_temp = -1;
        let current_image_count = 0;

        if (current_image_index != -1)
        {
            current_image_count = current_image_data.images.length;

            if (this.#lightbox_visible)
            {
                if (this.#current_lightbox_image_index == -1)
                {
                    this.#current_lightbox_image_index = current_image_index;
                }

                current_image_index_temp = ((this.#current_lightbox_image_index - 1 + current_image_count) % current_image_count);
                this.#current_lightbox_image_index = current_image_index_temp;

                this.#lightbox_img.classList.add('lb_prev_image');

                setTimeout(() => {
                    this.#set_current_image();
                    this.#update_current_image_info();
                }, 350);
                
                setTimeout(() => {
                    this.#lightbox_img.classList.remove('lb_prev_image');
                }, 700);
            }
            else
            {
                current_image_index_temp = ((current_image_index - 1 + current_image_count) % current_image_count);
                this.#set_current_image_index(current_image_index_temp);

                this.#img_element.classList.add('prev_image');

                setTimeout(() => {
                    this.#set_current_image();
                }, 350);

                setTimeout(() => {
                    this.#img_element.classList.remove('prev_image');
                }, 700);
            }
        }
    }

    clear_galleries()
    {
        if (this.#galleries != null)
        {
            this.#galleries.clear();
        }
    }

    #init_lightbox()
    {
        this.#lightbox = document.querySelector('.lightbox');

        if (this.#lightbox == null)
        {
            this.#create_lightbox();
        }

        this.#lightbox = document.querySelector('.lightbox');
        this.#lightbox_current_image_info_box_text = document.querySelector('.lightbox__current_image_info_box_text');
        this.#lightbox_img = document.querySelector('.lightbox_img');
        this.#close_btn = document.querySelector('.close_btn');
        this.#prev_btn = document.querySelector('.prev_btn');
        this.#next_btn = document.querySelector('.next_btn');

        this.#lightbox.addEventListener('click', (event) => {
            if (event.target == event.currentTarget)
            {
                this.close_lightbox()
            }    
        });
        this.#close_btn.addEventListener('click', () => this.close_lightbox());
        this.#prev_btn.addEventListener('click', () => this.show_prev_image());
        this.#next_btn.addEventListener('click', () => this.show_next_image());
    }

    #create_lightbox() 
    {
        let result = `
            <div class="lightbox">
                <div class="lightbox__current_image_info_box"><p class="lightbox__current_image_info_box_text"></p></div>
                <button class="lightbox__btn close_btn">X</button>
                <button class="lightbox__btn prev_btn"><img class="icon" src="static/css/resources/images/icons/ArrowLeft.svg" alt="ArrowLeft Icon"/></button>
                <button class="lightbox__btn next_btn"><img class="icon" src="static/css/resources/images/icons/ArrowRight.svg" alt="ArrowRight Icon"/></button>
                <img class="lightbox_img" alt="Lightbox Image">
            </div>
        `;

        let fragment = document.createRange().createContextualFragment(result);
        document.body.appendChild(fragment);
    }

    #update_current_image_info() 
    {
        let gallery_data = this.#get_current_gallery_data();

        if (gallery_data != null)
        {
            this.#lightbox_current_image_info_box_text.textContent = (this.#current_lightbox_image_index + 1) + ' / ' + gallery_data.images.length;
        }
    }

    #create_overlay(key, gallery_element, img_element)
    {
        let overlay_container = null;
        let coverlay_container_existed = false;
        let overlay_has_btns = false;
        let overlay_btns = null;

        if (gallery_element != null)
        {
            overlay_container = gallery_element.querySelector('.overlay_container');
            coverlay_container_existed = (overlay_container != null);

            if (!coverlay_container_existed)
            {
                overlay_container = document.createElement('div');
                overlay_container.classList.add('overlay_container');
            }
            else
            {
                overlay_btns = overlay_container.querySelectorAll('.overlay_container__btn');
                overlay_has_btns = (overlay_btns.length == 2);
            }


            let overlay_btn = null;

            if (!overlay_has_btns)
            {
                overlay_btn = document.createElement('button');
                overlay_btn.classList.add('overlay_container__btn');

                let image_left_icon = document.createElement('img');
                image_left_icon.classList.add('icon');
                image_left_icon.src = 'static/css/resources/images/icons/ArrowLeft.svg';
                overlay_btn.appendChild(image_left_icon);

                overlay_container.appendChild(overlay_btn);
            }
            else
            {
                overlay_btn = overlay_btns[0];
            }

            overlay_btn.addEventListener('click', (event) => {
                this.#current_gallery_id = key;
                this.#img_element = img_element;
                this.show_prev_image();
            });

            overlay_btn = null;

            if (!overlay_has_btns)
            {
                overlay_btn = document.createElement('button');

                overlay_btn.classList.add('overlay_container__btn');

                let image_right_icon = document.createElement('img');
                image_right_icon.classList.add('icon');
                image_right_icon.src = 'static/css/resources/images/icons/ArrowRight.svg';
                overlay_btn.appendChild(image_right_icon);

                overlay_container.appendChild(overlay_btn);
            }
            else
            {
                overlay_btn = overlay_btns[1];
            }

            overlay_btn.addEventListener('click', (event) => {
                this.#current_gallery_id = key;
                this.#img_element = img_element;
                this.show_next_image();
            });

            if (!coverlay_container_existed)
            {
                gallery_element.appendChild(overlay_container);
            }
        }
    }

    #set_current_image()
    {
        let gallery_data = null;
        let current_image = null;

        if (this.#galleries != null)
        {
            gallery_data = this.#get_current_gallery_data();

            if (this.#lightbox_visible && (gallery_data != null))
            {
                if (this.#current_lightbox_image_index == -1)
                {
                    this.#current_lightbox_image_index = gallery_data.current_image_index;
                }

                if (gallery_data.images.hasOwnProperty(this.#current_lightbox_image_index))
                {
                    current_image = gallery_data.images[this.#current_lightbox_image_index];
                    
                    if (current_image != null)
                    {
                        this.#lightbox_img.src = current_image;
                    }
                }
            }
            else
            {
                if ((gallery_data != null) && gallery_data.images.hasOwnProperty(gallery_data.current_image_index))
                {
                    current_image = gallery_data.images[gallery_data.current_image_index];

                    if ((current_image != null) && (this.#img_element != null))
                    {
                        this.#img_element.src = current_image;
                    }
                }
            }              
        }
    }

    #get_current_gallery_data()
    {
        return this.#galleries.get(this.#current_gallery_id);
    }

    #get_current_image_index()
    {
        let current_image_index = -1;
        let gallery_data = this.#get_current_gallery_data();

        if (gallery_data != null)
        {
            current_image_index = gallery_data.current_image_index;
        }

        return current_image_index;
    }

    #set_current_image_index(index)
    {
        let gallery_data = this.#get_current_gallery_data();

        if (gallery_data != null)
        {
            gallery_data.current_image_index = index;
            this.#galleries.set(this.#current_gallery_id, gallery_data);
        }
    }
}
