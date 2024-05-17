import AbstractView from "./AbstractView.js";

export default class extends AbstractView
{
    constructor(params)
    {
        super(params);
        this.set_title("Home");
        this.set_name("Home");
    }

    async init()
    {
        const skill__categories = document.querySelectorAll(".skill__category");
        const max = 20;
        const scale = 1.1;
        const speed = 1500;
        const axis = "x";
        const glare = true;
        const max_glare = 0.2;
        const reverse = true;

        if (skill__categories !== null)
        {
            if (skill__categories.length == 3)
            {
                VanillaTilt.init(skill__categories[0], {
                    max: max,
                    scale: scale,
                    speed: speed,
                    axis: axis,
                    glare: glare,
                    "max-glare": max_glare,
                    reverse: reverse,
                    startX: 20
                });
                VanillaTilt.init(skill__categories[1], {
                    max: 10,
                    scale: scale,
                    speed: speed,
                    axis: axis,
                    glare: glare,
                    "max-glare": max_glare,
                    reverse: reverse
                });
                VanillaTilt.init(skill__categories[2], {
                    max: max,
                    scale: scale,
                    speed: speed,
                    axis: axis,
                    glare: glare,
                    "max-glare": max_glare,
                    reverse: reverse,
                    startX: -20
                });
            }
            else
            {
                VanillaTilt.init(skill__categories, {
                    max: max,
                    scale: scale,
                    speed: speed,
                    axis: axis,
                    glare: glare,
                    "max-glare": max_glare,
                    reverse: reverse
                });
            }
        }
    }

    async get_html() 
    {
        return await super.generate_html(`
            <div class="ctn_container">
                <div class="ctn_container__item ${this.page_navigation_handler.add_page_section_link('Welcome')}">
                    <div class="ctn_box flex_center animate" data-animation-type="scroll_fade_in_from_left">
                        <div class="welcome">
                            <div id="${this.gallery_handler.create_gallery(['static/css/resources/images/Profilimages/Profilimage.jpg'])}" class="profilimage animate" data-animation-type="scroll_fade_in_from_right">
                                <img src="" loading="lazy" alt="Profil Image" class="border_circle">
                                <div class="overlay_container" style="width:122%;"></div>
                            </div>
                            <h1>Hi, ich bin <span class="highlight_text">Adrian Helbig</span></h1>
                            <h2>ein <span class="highlight_text">Berliner C++ Softwareentwickler</span></h2>
                            <div class="external_links_wrapper animate" data-animation-type="fade_in">
                                <div class="external_links">
                                    <a target="_blank" href="https://github.com/Dingola">
                                        <img class="icon_git" alt="GitHub">
                                        <p>GitHub</p>
                                    </a>
                                    <a target="_blank" href="https://linkedin.com/in/adrian-helbig-b7b023251">
                                        <img class="icon_linkedin" alt="LinkedIn">
                                        <p>LinkedIn</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ctn_container__item ${this.page_navigation_handler.add_page_section_link('About Me')}">
                    <div class="ctn_box animate" data-animation-type="scroll_fade_in_from_btn">
                        <h1 class="line_accent">&ltÜber mich/&gt</h1>
                        <div class="about_me">
                            <div>
                                <p>
                                mit einem Bachelor-Abschluss in Angewandter Informatik, einer Leidenschaft für die benutzerfreundliche Anwendungsentwicklung und einer 
                                erworbenen dreijährigen Berufserfahrung in diesem Feld. <br><br> Insbesondere spezialisiert habe ich mich
                                auf die Entwicklung von <span class="highlight_text2">C++, Qt/QML-Desktop-Anwendungen</span>. Dies ist jedoch
                                nicht meine ausschließliche Präferenz, wie dieses Portfolio zeigt. <br><br> Viel Spaß beim Erkunden!<br>
                                <div class="layout_0 margin_0"><a href="/career" class="link" data-link>Laufbahn</a><a href="/contact" class="contact_link" data-link>Kontakt</a></div>
                                </p>
                            </div>
                            <div id="${this.gallery_handler.create_gallery(['static/css/resources/images/7.png'])}" class="image_wrapper"> 
                                <img src="static/css/resources/images/7.png">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ctn_container__item ${this.page_navigation_handler.add_page_section_link('My Skills')}">
                    <div class="ctn_box animate" data-animation-type="scroll_fade_in_from_btn">
                        <h1 class="line_accent">&ltMy Skills/&gt</h1>
                        <div class="ctn_box__wrapper">
                            <div style="display: flex;justify-content: space-between;">
                                <p>Übersicht meiner IT-Kenntnisse aus Studium und Berufspraxis:</p>
                                ${await this.generate_skill_legend_html()}
                            </div>
                            ${await this.generate_skill_html()}
                        </div>
                    </div>
                </div>
                <div class="ctn_container__item ${this.page_navigation_handler.add_page_section_link('Projects')}">
                    <div class="ctn_box animate" data-animation-type="scroll_fade_in_from_btn">
                        <h1 class="line_accent">&ltProjects/&gt</h1>
                        <div class="ctn_box__wrapper">
                            ${await this.generate_projects_html()}                       
                        </div>
                    </div>
                </div>
                <div class="ctn_container__item ${this.page_navigation_handler.add_page_section_link('Get In Touch')}">
                    <div class="ctn_box animate" data-animation-type="scroll_fade_in_from_btn">
                        <h1 class="line_accent">&ltGet In Touch/&gt</h1>

                        <div class="get_in_touch">
                            <p class="text_center">Wenn Sie eine Frage haben oder an einer Zusammenarbeit interessiert sind, kontaktieren Sie mich gerne. Ich freue mich darauf, von Ihnen zu hören.</p>
                            <div class="flex_inline_hcenter">
                                <div class="container">
                                    <div class="container__item layout_0">
                                        <a href="/contact" class="contact_link" data-link>Kontakt</a><a href="/career" class="link" data-link>Laufbahn</a>
                                    </div>
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

    async generate_skill_legend_html()
    {
        return `<div class="skill__box skill__box--legend">
                    <p>Beginner</p>
                    <div class="skill__value_box">
                        <div class="skill__value_box_item skill__value_box_item_filled"></div>
                        <div class="skill__value_box_item skill__value_box_item_filled"></div>
                        <div class="skill__value_box_item skill__value_box_item_filled"></div>
                    </div>
                    <p>Expert</p>
                </div>`;
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
                <div class="skill">`;

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
        let result = ``;
        const index_hide_content = 6;

        result = `
            <div class="skill__category">
                <h3 class="underline_accent text_center">${category}</h3>
                <div class="skill__box_container">
                   ${skills.map((skill, index) => {                    
                        return this.generate_skill_HTML(skill, (index >= index_hide_content));;
                    }).join('')}`;
        if (index_hide_content < skills.length)
        {
            result += `
                <div class="button_wrapper">
                    <button class="btn" onclick="app.toggle_hidden_elements(this)">Mehr anzeigen</button>
                </div>`;
        }

        result += `                    
                </div>
            </div>`;
        return result;
    }

    generate_skill_HTML(skill, hidden = false) 
    {
        return `
            <div class="skill__box ${(hidden ? `skill__box hidden` : `skill__value_box`)}">
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
            result += `<div class="projects">`;

            project_array.forEach((project) => {
                result += `	
                    <div class="card project">
                        <div class="card__element" style="flex-basis: 100%">
                            <div id="${this.gallery_handler.create_gallery(project.images)}" class="card__img_wrapper">
                                <img src="" loading="lazy" class="card__img">
                            </div>
                        </div>
                        <div class="card__element project__description">
                            <h2>${project.title}</h2>
                            <p>${project.description}</p>
                        </div>
                        <div class="card__element layout_2">
                            <div>
                            <h3>Tech Stack:</h2>
                            <div class="card__skills">
                                ${this.generate_project_skills_used_html(project.skills_used)}
                            </div>
                            </div>
                            <div class="project__links layout_0">
                                <a class="link" target="_blank" href="${project.github_url}">GitHub</a>
                                <a class="link" target="_blank" href="${project.livedemo_url}">Demo</a>
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
        let index = 0;
        const index_hide_content = 5;

        skills_used.forEach((skill) => {
            result += `
                <div class="${(index >= index_hide_content) ? `skill__box hidden` : `skill__box`}">
                    <p>${skill.subject}</p>
                </div>`;
            index++;
        });

        if (index_hide_content < skills_used.length)
        {
            result += `
                <div class="button_wrapper">
                    <button class="btn" onclick="app.toggle_hidden_elements(this)">Mehr anzeigen</button>
                </div>`;
        }

        return result;
    }
}
