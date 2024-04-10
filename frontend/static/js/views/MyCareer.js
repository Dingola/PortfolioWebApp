import AbstractView from "./AbstractView.js";

export default class extends AbstractView
{
    constructor(params)
    {
        super(params);
        this.set_title("MyCareer");
    }

    async get_html() 
    {
        return await super.generate_html(`
            <div class="ctn_container">
                <div class="ctn_container__item">
                    <div class="ctn_box animate" data-animation-type="scroll_fade_in_from_btn">
                        <h1 class="line_accent">&ltMy Career/&gt</h1>
                        <div class="ctn_box__wrapper">
                            ${await this.generate_career_html()}
                        </div>
                    </div>
                </div>
            </div>
        `);
    }

    async fetch_career_stations() 
    {
        try {
            const response = await fetch('/api/career/get_career_stations');

            if (!response.ok) 
            {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error fetching career stations:', error);
            throw error;
        }
    }

    async generate_career_html() 
    {
        let result = '';
        let career_stations = await this.fetch_career_stations();
        let index = 0;

        if ((career_stations != null) && (career_stations.length != 0))
        {
            result += `<div class="timeline border_radius"><div class="timeline__line animate" data-animation-type="timeline_scale_in_from_top"></div>`;

            career_stations.forEach((career_station) => {
                index++;
                
                result += `	
                    <div class="timeline__block ${this.page_navigation_handler.add_page_section_link(career_station.role)}">
                        <div class="timeline__block_point animate" data-animation-type="scroll_scale_in">
                        </div>`;
    
                result += (index % 2 == 0) ? `<div class="timeline__content animate" data-animation-type="scroll_fade_in_from_right">` : `<div class="timeline__content animate" data-animation-type="scroll_fade_in_from_left">`;

                result += `
                            <div class="timeline__content_text">
                                <div class="timline__content_block_point_date">
                                    ${this.generate_date_from_string(career_station.date_begin, career_station.date_end)}
                                    <br>
                                </div>
                                <h3>${career_station.role}</h3>
                                <h4>${career_station.organisation}</h4>
                                <div class="timeline__career_description">
                                    <p>${career_station.description}</p>
                                    ${career_station.description.length > 0 ? 
                                        `<div class="timeline__shortened_content_overlay">
                                            <button class="btn" onclick="app.show_shortened_content(this)">Mehr anzeigen</button>
                                        </div>` : ``
                                    }
                                </div>
                                ${this.generate_qualification_html(career_station.acquired_qualification)}
                            </div>
                            <div class="timeline__content_links">
                                <a class="link extern_icon" target="_blank" href="${career_station.organisation_link}">Webseite</a>
                            </div>
                        </div>
                        <div class="timeline__block_point_date animate" data-animation-type="fade_in">
                            ${this.generate_date_from_string(career_station.date_begin, career_station.date_end)}
                        </div>
                    </div>`;
            });

            result += '</div>';
        }
        else 
        {
            result += '<p>No career stations available.</p>';
        }

        return result;
    }

    generate_date_from_string(begin, end)
    {
        let date_begin = new Date(begin);
        let date_end = new Date(end);
        return `<h3>${(date_begin.getMonth() + 1)}/${date_begin.getFullYear()} - ${(date_end.getMonth() + 1)}/${date_end.getFullYear()}</h3>`;
    }

    generate_qualification_html(qualification)
    {
        let result = '';

        if ((qualification != null) && (qualification != ''))
        {
            result += `<br><h3>Abschluss:</h3><p>${qualification}</p>`;
        }

        return result;
    }
}
