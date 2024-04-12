'use strict';

import Project from './Project.js';
import Skill from './Skill.js';

export default class ProjectModel
{
    constructor()
    {
        this.projects = [
            new Project(
                'Portfolio Webseite', 
                'Meine Portfolio Web App! Dieses Projekt wurde mit NodeJS und Express erstellt und dient als Plattform für die Präsentation meiner Arbeit und Fähigkeiten.', 
                ['static/css/resources/images/PortfolioProject/PortfolioWebPage-dark.png', 'static/css/resources/images/PortfolioProject/PortfolioWebPage-light.png'],
                'https://github.com/Dingola/PortfolioWebApp', 
                '',
                [new Skill('', 'Express'), new Skill('', 'nodeJS'), new Skill('', 'dotenv'), new Skill('', 'cors'), new Skill('', 'nodemon'), new Skill('', 'body-parser'),
                 new Skill('', 'JavaScript'),  new Skill('', 'CSS'),  new Skill('', 'HTML'),  new Skill('', 'VS Code'),  new Skill('', 'Git')]
            )
        ];
    }

    set_projects(projects)
    {
        if (!Array.isArray(projects) || !projects.every(instance => instance instanceof Project)) 
        {
            throw new Error('Parameter must be an array of Project instances');
        }

        this.projects = projects;
    }

    get_projects()
    {
        return this.projects;
    }
}
