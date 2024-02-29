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
                            <div class="text">
                                <h1>Hi, ich bin <span class="highlight_text">Adrian Helbig</span></h1>
                                <p>
                                    ein 34-jähriger <span class="highlight_text2">Berliner Softwareentwickler</span> mit einem Bachelor-Abschluss 
                                    in Angewandter Informatik, einer Leidenschaft für die benutzerfreundliche Anwendungsentwicklung und einer 
                                    erworbenen dreijährigen Berufserfahrung in diesem Feld. <br><br> Insbesondere spezialisiert habe ich mich
                                    auf die Entwicklung von <span class="highlight_text2">C++, Qt/QML-Desktop-Anwendungen</span>. Dies ist jedoch
                                    nicht meine ausschließliche Präferenz, wie dieses Portfolio zeigt. <br><br> Viel Spaß beim Erkunden!<br>
                                    <a href="/career" class="link" data-link>Laufbahn</a><a href="/contact" class="contact_link" data-link>Kontakt</a>
                                </p>
                            </div>
                        </div>
                        <div class="profil__right_side_ctn">
                            <div id="${this.gallery_handler.create_gallery(['static/css/resources/images/Profilimages/Profilimage.jpg', 'static/css/resources/images/Profilimages/Profilimage_2.jpg'])}" class="profilimage">
                                <img src="" loading="lazy" alt="Profil Image" class="border_circle">
                                <div class="overlay_container" style="width:122%;"></div>
                            </div>
                            <div class="external_links_wrapper">
                                <div class="external_links">
                                    <a target="_blank" href="https://github.com/Dingola">
                                        <img src="static/css/resources/images/logos/github/github-mark/github-mark.png" alt="GitHub">
                                        <p>GitHub</p>
                                    </a>
                                    <a target="_blank" href="https://linkedin.com/in/adrian-helbig-b7b023251">
                                        <img src="static/css/resources/images/logos/LinkedIn-Logos/LI-In-Bug.png" alt="LinkedIn">
                                        <p>LinkedIn</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ctn_container__item">
                    <div class="ctn_box">
                        <h1 class="line_accent">&ltMy Skills/&gt</h1>
                        <div class="ctn_box__wrapper">
                            <p>Übersicht meiner IT-Kenntnisse aus Studium und Berufspraxis:</p>
                            <div class="ctn_box__inner_box">
                                ${await this.generate_skill_html()}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ctn_container__item">
                    <div class="ctn_box">
                        <h1 class="line_accent">&ltProjects/&gt</h1>
                        <div class="ctn_box__wrapper">
                            ${await this.generate_projects_html()}
                        </div>
                    </div>
                </div>
                <div class="ctn_container__item">
                    <div class="ctn_box">
                        <h1 class="line_accent">&ltGet In Touch/&gt</h1>
                        <div class="ctn_box__wrapper">
                            <div class="ctn_box__inner_box">
                                <div class="section_contact">
                                    <p class="text">Wenn Sie eine Frage haben oder an einer Zusammenarbeit interessiert sind, kontaktieren Sie mich gerne. Ich freue mich darauf, von Ihnen zu hören.</p>
                                    <a href="/contact" class="contact_link" data-link>Kontakt</a>
                                    <p class="text">oder erfahren Sie mehr über mich</p>
                                    <a href="/career" class="link" data-link>Laufbahn</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }

    async fetch_skills() 
    {
        try {
            const response = await fetch('/api/home/get_skills');

            if (!response.ok) 
            {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error fetching skills:', error);
            throw error;
        }
    }

    async fetch_projects() 
    {
        try {
            const response = await fetch('/api/home/get_projects');

            if (!response.ok) 
            {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error fetching skills:', error);
            throw error;
        }
    }

    async generate_skill_html() 
    {
        let result = '';
        let skills_array = await this.fetch_skills();

        if (skills_array.length === 0) 
        {
            result += '<p>No skills available.</p>';
        } 
        else 
        {
            result += `
                <div class="skill">
                    <div class="skill__category">
                        <div class="skill__box skill__box--legend">
                            <p>Beginner</p>
                            <div class="skill__value_box">
                                <div class="skill__value_box_item skill__value_box_item_filled"></div>
                                <div class="skill__value_box_item skill__value_box_item_filled"></div>
                                <div class="skill__value_box_item skill__value_box_item_filled"></div>
                            </div>
                            <p>Expert</p>
                        </div>
                    </div>`;

            const skills_object = this.group_skills_by_category(skills_array);

            for (const [category, skills] of Object.entries(skills_object))
            {
                result += this.generate_skill_category_HTML(category, skills);
            }

            result += '</div>';
        }

        return result;
    }

    group_skills_by_category(skills_array) 
    {
        const skills_object = {};

        skills_array.forEach((skill) => {
            if (!skills_object[skill.category]) 
            {
                skills_object[skill.category] = [];
            }

            skills_object[skill.category].push(skill);
        });

        return skills_object;
    }

    generate_skill_category_HTML(category, skills) 
    {
        return `
            <div class="skill__category">
                <h3 class="underline_accent">${category}</h3>
                <div class="skill__box_container">
                    ${skills.map((skill) => this.generate_skill_HTML(skill)).join('')}
                </div>
            </div>`;
    }

    generate_skill_HTML(skill) 
    {
        return `
            <div class="skill__box">
                <p>${skill.subject}</p>
                <div class="skill__value_box">
                    ${this.generate_filled_stars(skill.rating.value)}
                    ${this.generate_empty_stars(skill.rating.value)}
                </div>
            </div>`;
    }

    generate_filled_stars(value) 
    {
        return Array.from({ length: value }, () => '<div class="skill__value_box_item skill__value_box_item_filled"></div>').join('');
    }

    generate_empty_stars(value) 
    {
        const empty_stars_count = Math.max(0, value - 3);
        return Array.from({ length: empty_stars_count }, () => '<div class="skill__value_box_item"></div>').join('');
    }

    async generate_projects_html() 
    {
        let result = '';
        let project_array = await this.fetch_projects();

        if (project_array.length === 0) 
        {
            result += '<p>No projects available.</p>';
        } 
        else 
        {
            result += `<div class="project_cards">`;

            project_array.forEach((project) => {
                result += `	
                    <div class="card card--width min_height_1 border_radius">
                        <div class="card__container_left">
                            <div id="${this.gallery_handler.create_gallery(project.images)}" class="card__img_wrapper">
                                <img src="" loading="lazy" class="card__img">
                            </div>
                            <div class="card__links">
                                <a class="link extern_icon" target="_blank" href="${project.github_url}">Code</a>
                                <a class="link extern_icon" target="_blank" href="${project.livedemo_url}">Demo</a>
                            </div>
                        </div>
                        <div class="card__container_right">
                            <div class="card__description">
                                <div class="text">
                                    <h2>${project.title}</h2>
                                    <p>${project.description}</p>
                                </div>
                            </div>
                            <div class="card__skills">
                                <h3>Tech Stack:</h2>
                                ${this.generate_project_skills_used_html(project.skills_used)}
                            </div>
                        </div>
                    </div>`
            });

            result += '</div>';
        }

        return result;
    }

    generate_project_skills_used_html(skills_used)
    {
        let result = '';

        skills_used.forEach((skill) => {
            result += `
                <div class="skill__box">
                    <p>${skill.subject}</p>
                </div>
            `;
        });

        return result;
    }
}
