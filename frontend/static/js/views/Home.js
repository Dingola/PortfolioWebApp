import AbstractView from "./AbstractView.js";


export default class extends AbstractView
{
    constructor(params)
    {
        super(params);
        this.set_title("Home");
    }

    async get_html() 
    {
        return await super.generate_html(`
            <div class="ctn_container">
                <div class="ctn_container__item">
                    <div class="profil">
                        <div class="ctn_box">
                            <h1>Welcome, I'm a C++ Software Developer</h1>
                            <p>asdasdas asdasdasd asdasd asdasdas asdasdasd asdasd asdasdas asdasdasd asdasd asdasdas asdasdas asdasdasd asdasd asdasdas asdasdasd asdasd asdasdas asdasdasd asdasd asdasdas asdasdas asdasdasd asdasd asdasdas asdasdasd asdasd asdasdas asdasdasd asdasd asdasdas asdasdas asdasdasd asdasd asdasdas asdasdasd asdasd asdasdas asdasdasd asdasd asdasdas asdasdas asdasdasd asdasd asdasdas asdasdasd asdasd asdasdas asdasdasd asdasd asdasdas
                            </p>
                            <a href="/about" class="neutral_link" data-link>More</a>
                        </div>
                        <div class="profilimage">
                            <div class="flex_center">
                            <img src="static/css/resources/images/Profilimage.jpg" alt="Profilimage" class="border_circle"> 
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ctn_container__item">
                    <div class="ctn_box">
                        <h1 class="line_accent">&ltMy Skills/&gt</h1>
                        <p>Übersicht meiner IT-Kenntnisse aus Studium und Berufspraxis:</p>
                        <div class="ctn_box__inner_box">
                            ${await this.generate_rating_html()}
                        </div>
                    </div>
                </div>
                <div class="ctn_container__item">
                    <div class="ctn_box">
                        <h1 class="line_accent">&ltProjects/&gt</h1>
                        <p></p>
                    </div>
                </div>
                <div class="ctn_container__item">
                    <div class="ctn_box">
                        <h1 class="line_accent">&ltGet In Touch/&gt</h1>
                        <p></p>
                        <a href="/contact" class="contact_link" data-link>Contact</a>
                    </div>
                </div>
            </div>
        `);
    }

    async fetch_ratings() 
    {
        try {
            const response = await fetch('/api/get_ratings');

            if (!response.ok) 
            {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error fetching ratings:', error);
            throw error;
        }
    }

    async generate_rating_html() {
        let result = '';
        let ratings_object = await this.fetch_ratings();

        if (Object.keys(ratings_object).length === 0) 
        {
            result += '<p>No ratings available.</p>';
        } 
        else 
        {
            result += `
                <div class="rating">
                    <div class="rating__category">
                    <div class="rating__box rating__box--legend">
                        <p>Beginner</p>
                        <div class="rating__value_box">
                            <div class="rating__value_box_item rating__value_box_item_filled"></div>
                            <div class="rating__value_box_item rating__value_box_item_filled"></div>
                            <div class="rating__value_box_item rating__value_box_item_filled"></div>
                        </div>
                        <p>Expert</p>
                        </div>
                    </div>`;

            for (const [category, ratings] of Object.entries(ratings_object)) 
            {
                result += this.generate_category_HTML(category, ratings);
            }

            result += '</div>';
        }

        return result;
    }

    generate_category_HTML(category, ratings) {
        return `
            <div class="rating__category">
                <h3 class="underline_accent">${category}</h3>
                <div class="rating__box_container">
                    ${ratings.map((rating) => this.generate_rating_HTML(rating)).join('')}
                </div>
            </div>`;
    }

    generate_rating_HTML(rating) {
        return `
            <div class="rating__box">
                <p>${rating.subject}</p>
                <div class="rating__value_box">
                    ${this.generate_filled_stars(rating.value)}
                    ${this.generate_empty_stars(rating.value)}
                </div>
            </div>`;
    }

    generate_filled_stars(value) {
        return Array.from({ length: value }, () => '<div class="rating__value_box_item rating__value_box_item_filled"></div>').join('');
    }

    generate_empty_stars(value) {
        const empty_stars_count = Math.max(0, value - 3);
        return Array.from({ length: empty_stars_count }, () => '<div class="rating__value_box_item"></div>').join('');
    }
}
